import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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
    private readonly contentAnalyzer: ContentAnalyzerService,
    private readonly difficultyCalculator: DifficultyCalculatorService
  ) {}

  async create(createCardDto: CreateCardDto, userId?: string): Promise<Card> {
    const slug = generateSlug(createCardDto.term);

    // Получаем язык по умолчанию (английский) если не указан
    let languageId = createCardDto.languageId;
    if (!languageId) {
      const defaultLanguage = await this.prisma.language.findFirst({
        where: { code: 'en' },
        select: { id: true },
      });
      languageId = defaultLanguage?.id;
    }

    // Проверяем, существует ли уже карточка с таким slug, partOfSpeech и languageId
    const existingCard = await this.prisma.card.findFirst({
      where: {
        slug,
        partOfSpeech: createCardDto.partOfSpeech,
        languageId,
      },
    });

    if (existingCard) {
      throw new ConflictException(
        `Карточка со словом "${createCardDto.term}" уже существует`
      );
    }

    // Подготавливаем данные для создания карточки
    const cardData: CreateCardDto & {
      slug: string;
      userId?: string;
      isGlobal: boolean;
      contentType?: ContentType;
      contentStatus?: ContentStatus;
    } = {
      ...createCardDto,
      slug,
      userId,
      languageId,
      isGlobal: createCardDto.isGlobal ?? true,
    };

    // Определяем тип контента и статус
    cardData.contentType ??= this.contentAnalyzer.determineContentType();
    cardData.contentStatus ??= this.contentAnalyzer.determineContentStatus();

    // Получаем транскрипцию только для отдельных слов
    if (
      !cardData.transcription &&
      this.contentAnalyzer.isSingleWord(createCardDto.term)
    ) {
      try {
        const transcriptionResult =
          await this.dictionaryService.getTranscription(createCardDto.term);

        if (transcriptionResult?.transcription) {
          cardData.transcription = transcriptionResult.transcription;
        }
      } catch (error) {
        // Логируем ошибку, но продолжаем создание карточки
        console.warn(
          `⚠️ Не удалось получить транскрипцию для слова "${createCardDto.term}":`,
          error
        );
      }
    }

    // Рассчитываем сложность если не указана
    cardData.difficulty ??= this.difficultyCalculator.calculateDifficulty(
      createCardDto.term,
      createCardDto.partOfSpeech
    );

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
      term?: {
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
      where.term = {
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

    if (updateCardDto.term && updateCardDto.term !== existingCard.term) {
      updateData.slug = generateSlug(updateCardDto.term);
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
   * Поиск карточек по термину для автокомплита
   */
  async findManyByTerm(term: string, limit = 10): Promise<Partial<Card>[]> {
    if (!term || term.length < 2) {
      return [];
    }

    return this.prisma.card.findMany({
      where: {
        term: {
          contains: term,
          mode: 'insensitive',
        },
        isGlobal: true, // Только глобальные карточки
      },
      take: limit,
      orderBy: [
        { term: 'asc' }, // Сортировка по алфавиту
        { createdAt: 'desc' }, // Новые карточки первыми
      ],
      select: {
        id: true,
        term: true,
        translate: true,
        definition: true,
        example: true,
        transcription: true,
        slug: true,
        partOfSpeech: true,
        difficulty: true,
        level: true,
        language: {
          select: {
            id: true,
            name: true,
            code: true,
          },
        },
        imageUrl: true,
        audioUrl: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }
}
