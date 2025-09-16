import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  Card,
  ContentStatus,
  LanguageLevel,
  Prisma,
  Set,
} from '@prisma/client';
import { PrismaService } from 'src/infrastructure/database';
import { setSortFields, sortOrders } from 'src/shared/constants/sort';
import { PaginatedResponse } from 'src/shared/types';
import { generateSlug } from 'src/shared/utils';
import { CreateCardDto } from '../card/dto/create-card.dto';
import { CreateSetDto, SetQueryDto, UpdateSetDto } from './dto';

@Injectable()
export class SetService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Создать новый набор с карточками
   */
  async create(
    createSetDto: CreateSetDto,
    userId?: string
  ): Promise<Set & { cards: Card[] }> {
    return this.prisma.$transaction(async tx => {
      // 1. Создать сета
      const set = await tx.set.create({
        data: {
          name: createSetDto.name,
          description: createSetDto.description,
          level: createSetDto.level,
          isBase: createSetDto.isBase ?? false,
          isPublic: createSetDto.isPublic ?? true, // По умолчанию публичный
          userId,
          slug: generateSlug(createSetDto.name),
          contentStatus: ContentStatus.PUBLISHED,
        },
      });

      // 2. Обработать карточки
      const cardIds: string[] = [];

      for (const cardData of createSetDto.cards) {
        let cardId: string;

        if (cardData.existingCardId) {
          // Использовать существующую карточку
          const existingCard = await tx.card.findUnique({
            where: { id: cardData.existingCardId },
          });

          if (!existingCard) {
            throw new NotFoundException(
              `Карточка с ID ${cardData.existingCardId} не найдена`
            );
          }

          cardId = cardData.existingCardId;
        } else if (cardData.newCard) {
          // Создать новую карточку
          const newCard = await this.createCardInTransaction(
            tx,
            cardData.newCard,
            userId
          );
          cardId = newCard.id;
        } else {
          throw new BadRequestException(
            'Не указана ни существующая карточка, ни данные новой карточки'
          );
        }

        cardIds.push(cardId);
      }

      // 3. Связать карточки с сета
      await tx.set.update({
        where: { id: set.id },
        data: {
          cards: {
            connect: cardIds.map(id => ({ id })),
          },
        },
      });

      // 4. Получить сета с карточками
      const setWithCards = await tx.set.findUnique({
        where: { id: set.id },
        include: { cards: true },
      });

      if (!setWithCards) {
        throw new NotFoundException(`Набор с ID ${set.id} не найден`);
      }

      return setWithCards;
    });
  }

  /**
   * Вспомогательный метод для создания карточки в транзакции
   */
  private async createCardInTransaction(
    tx: Prisma.TransactionClient,
    cardData: CreateCardDto,
    userId?: string
  ): Promise<Card> {
    const slug = generateSlug(cardData.term);

    // Проверка на дубликат
    const existingCard = await tx.card.findFirst({
      where: {
        slug,
        partOfSpeech: cardData.partOfSpeech,
        languageId: cardData.languageId,
      },
    });

    if (existingCard) {
      // Если карточка уже существует, вернуть существующую
      return existingCard;
    }

    // Создать новую карточку
    return tx.card.create({
      data: {
        ...cardData,
        userId,
        slug,
        isGlobal: true,
        contentStatus: ContentStatus.PUBLISHED,
      },
    });
  }

  /**
   * Получить все наборы с пагинацией и фильтрами
   */
  async findAll(queryDto: SetQueryDto): Promise<PaginatedResponse<Set>> {
    const {
      page = 1,
      limit = 10,
      level,
      search,
      sort = setSortFields.createdAt,
      order = sortOrders.desc,
    } = queryDto;
    const skip = (page - 1) * limit;

    // Строим условия фильтрации
    const where: {
      level?: LanguageLevel;
      name?: { contains: string; mode: 'insensitive' };
    } = {};

    if (level) {
      where.level = level;
    }

    if (search) {
      where.name = {
        contains: search,
        mode: 'insensitive',
      };
    }

    const [items, total] = await Promise.all([
      this.prisma.set.findMany({
        where,
        skip,
        take: limit,
        orderBy: { [sort]: order },
      }),
      this.prisma.set.count({ where }),
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

  async findOne(id: string): Promise<Set> {
    const set = await this.prisma.set.findUnique({
      where: { id },
    });

    if (!set) {
      throw new NotFoundException(`Набор с ID ${id} не найден`);
    }

    return set;
  }

  async update(id: string, updateSetDto: UpdateSetDto): Promise<Set> {
    const existingSet = await this.prisma.set.findUnique({
      where: { id },
    });

    if (!existingSet) {
      throw new NotFoundException(`Набор с ID ${id} не найден`);
    }

    const { cards: _cards, ...setUpdateData } = updateSetDto;
    const updateData: Partial<Omit<UpdateSetDto, 'cards'>> & { slug?: string } =
      {
        ...setUpdateData,
      };

    // Если изменилось название, обновляем slug
    if (updateSetDto.name && updateSetDto.name !== existingSet.name) {
      updateData.slug = generateSlug(updateSetDto.name);
    }

    return this.prisma.set.update({
      where: { id },
      data: updateData,
    });
  }

  async remove(id: string): Promise<void> {
    const existingSet = await this.prisma.set.findUnique({
      where: { id },
    });

    if (!existingSet) {
      throw new NotFoundException(`Набор с ID ${id} не найден`);
    }

    await this.prisma.set.delete({
      where: { id },
    });
  }

  async addCardToSet(setId: string, cardId: string): Promise<void> {
    const set = await this.prisma.set.findUnique({
      where: { id: setId },
    });

    if (!set) {
      throw new NotFoundException(`Набор с ID ${setId} не найден`);
    }

    const card = await this.prisma.card.findUnique({
      where: { id: cardId },
    });

    if (!card) {
      throw new NotFoundException(`Карточка с ID ${cardId} не найдена`);
    }

    await this.prisma.set.update({
      where: { id: setId },
      data: {
        cards: {
          connect: { id: cardId },
        },
      },
    });
  }

  async removeCardFromSet(setId: string, cardId: string): Promise<void> {
    const set = await this.prisma.set.findUnique({
      where: { id: setId },
    });

    if (!set) {
      throw new NotFoundException(`Набор с ID ${setId} не найден`);
    }

    await this.prisma.set.update({
      where: { id: setId },
      data: {
        cards: {
          disconnect: { id: cardId },
        },
      },
    });
  }
}
