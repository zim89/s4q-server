import { Injectable, NotFoundException } from '@nestjs/common';
import {
  Card,
  CardDifficulty,
  ContentStatus,
  ContentType,
  PartOfSpeech,
} from '@prisma/client';
import { PrismaService } from 'src/infrastructure/database';
import { DictionaryService } from 'src/integrations/dictionary';
import { cardSortFields, sortOrders } from 'src/shared/constants/sort';
import {
  ContentAnalyzerService,
  DifficultyCalculatorService,
} from 'src/shared/services';
import { PaginatedResponse } from 'src/shared/types';
import { generateSlug } from 'src/shared/utils';
import { CardQueryDto, CreateCardDto, UpdateCardDto } from './dto';

@Injectable()
export class CardService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly dictionaryService: DictionaryService,
    private readonly difficultyCalculator: DifficultyCalculatorService,
    private readonly contentAnalyzer: ContentAnalyzerService
  ) {}

  async create(createCardDto: CreateCardDto, userId?: string): Promise<Card> {
    const slug = generateSlug(createCardDto.wordOrPhrase);

    // Подготавливаем данные для создания карточки
    const cardData: CreateCardDto & {
      slug: string;
      userId?: string;
      isGlobal: boolean;
      contentType?: ContentType;
      contentStatus?: ContentStatus;
      sourceProvider?: string;
      sourceId?: string;
    } = {
      ...createCardDto,
      slug,
      userId,
      isGlobal: createCardDto.isGlobal ?? true,
    };

    // Определяем тип контента и статус
    cardData.contentType ??= this.contentAnalyzer.determineContentType();
    cardData.contentStatus ??= this.contentAnalyzer.determineContentStatus();

    // Определяем часть речи если не указана
    cardData.partOfSpeech ??= this.contentAnalyzer.determinePartOfSpeech(
      createCardDto.wordOrPhrase
    );

    // Получаем информацию о языке для определения sourceProvider
    let languageCode: string | undefined;
    if (createCardDto.languageId) {
      const language = await this.prisma.language.findUnique({
        where: { id: createCardDto.languageId },
        select: { code: true },
      });
      languageCode = language?.code;
    }

    // Устанавливаем sourceProvider и sourceId
    cardData.sourceProvider = 'dictionary-api';
    cardData.sourceId = createCardDto.wordOrPhrase;

    // Если нужно получить данные из словаря
    if (
      this.contentAnalyzer.shouldFetchFromDictionary(
        createCardDto.wordOrPhrase,
        languageCode
      )
    ) {
      try {
        const wordInfo = await this.dictionaryService.getWordInfo(
          createCardDto.wordOrPhrase
        );

        if (wordInfo) {
          // Заполняем недостающие поля данными из словаря
          if (!cardData.transcription && wordInfo.transcription) {
            cardData.transcription = wordInfo.transcription;
          }

          if (!cardData.partOfSpeech && wordInfo.partOfSpeech) {
            cardData.partOfSpeech = this.mapPartOfSpeech(wordInfo.partOfSpeech);
          }

          if (!cardData.audioUrl && wordInfo.audioUrl) {
            cardData.audioUrl = wordInfo.audioUrl;
          }
        }
      } catch (error) {
        // Логируем ошибку, но продолжаем создание карточки
        console.warn(
          `Не удалось получить данные из словаря для слова "${createCardDto.wordOrPhrase}":`,
          error
        );
      }
    }

    // Рассчитываем сложность
    if (!cardData.difficulty) {
      if (this.contentAnalyzer.isPhrasalVerb(createCardDto.wordOrPhrase)) {
        cardData.difficulty = CardDifficulty.MEDIUM;
      } else if (
        this.contentAnalyzer.isPhrase(createCardDto.wordOrPhrase) ||
        this.contentAnalyzer.isSentence(createCardDto.wordOrPhrase) ||
        this.contentAnalyzer.isIdiom(createCardDto.wordOrPhrase)
      ) {
        const phraseDifficulty = this.contentAnalyzer.calculatePhraseDifficulty(
          createCardDto.wordOrPhrase
        );
        cardData.difficulty = phraseDifficulty as CardDifficulty;
      } else {
        cardData.difficulty = this.difficultyCalculator.calculateDifficulty(
          createCardDto.wordOrPhrase
        );
      }
    }

    return this.prisma.card.create({
      data: cardData,
    });
  }

  async findAll(queryDto: CardQueryDto): Promise<PaginatedResponse<Card>> {
    const {
      page = 1,
      limit = 10,
      difficulty,
      partOfSpeech,
      search,
      sort = cardSortFields.createdAt,
      order = sortOrders.desc,
    } = queryDto;

    const skip = (page - 1) * limit;

    // Строим условия фильтрации
    const where: {
      difficulty?: CardDifficulty;
      partOfSpeech?: PartOfSpeech;
      wordOrPhrase?: {
        contains: string;
        mode: 'insensitive';
      };
    } = {};

    if (difficulty) {
      where.difficulty = difficulty;
    }

    if (partOfSpeech) {
      where.partOfSpeech = partOfSpeech;
    }

    if (search) {
      where.wordOrPhrase = {
        contains: search,
        mode: 'insensitive',
      };
    }

    const [items, total] = await Promise.all([
      this.prisma.card.findMany({
        where,
        skip,
        take: limit,
        orderBy: { [sort]: order },
      }),
      this.prisma.card.count({ where }),
    ]);

    const totalPages = Math.ceil(total / limit);
    const hasNext = page < totalPages;
    const hasPrev = page > 1;

    return {
      data: items,
      pagination: {
        total,
        page,
        limit,
        totalPages,
        hasNext,
        hasPrev,
      },
    };
  }

  async findOne(id: string): Promise<Card> {
    const card = await this.prisma.card.findUnique({
      where: { id },
    });

    if (!card) {
      throw new NotFoundException(`Карточка с ID ${id} не найдена`);
    }

    return card;
  }

  async update(id: string, updateCardDto: UpdateCardDto): Promise<Card> {
    const existingCard = await this.prisma.card.findUnique({
      where: { id },
    });

    if (!existingCard) {
      throw new NotFoundException(`Карточка с ID ${id} не найдена`);
    }

    const updateData: Partial<UpdateCardDto> & { slug?: string } = {
      ...updateCardDto,
    };

    if (
      updateCardDto.wordOrPhrase &&
      updateCardDto.wordOrPhrase !== existingCard.wordOrPhrase
    ) {
      updateData.slug = generateSlug(updateCardDto.wordOrPhrase);
    }

    return this.prisma.card.update({
      where: { id },
      data: updateData,
    });
  }

  async remove(id: string): Promise<void> {
    const existingCard = await this.prisma.card.findUnique({
      where: { id },
    });

    if (!existingCard) {
      throw new NotFoundException(`Карточка с ID ${id} не найдена`);
    }

    await this.prisma.card.delete({
      where: { id },
    });
  }

  /**
   * Преобразует часть речи из словаря в enum Prisma
   */
  private mapPartOfSpeech(
    dictionaryPartOfSpeech: string
  ): PartOfSpeech | undefined {
    const mapping: Record<string, PartOfSpeech> = {
      noun: PartOfSpeech.NOUN,
      verb: PartOfSpeech.VERB,
      adjective: PartOfSpeech.ADJECTIVE,
      adverb: PartOfSpeech.ADVERB,
      pronoun: PartOfSpeech.PRONOUN,
      preposition: PartOfSpeech.PREPOSITION,
      conjunction: PartOfSpeech.CONJUNCTION,
      interjection: PartOfSpeech.INTERJECTION,
      article: PartOfSpeech.ARTICLE,
      particle: PartOfSpeech.PARTICLE,
      phrase: PartOfSpeech.PHRASE,
    };

    return mapping[dictionaryPartOfSpeech.toLowerCase()];
  }
}
