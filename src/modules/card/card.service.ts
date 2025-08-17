import { Injectable, NotFoundException } from '@nestjs/common';
import { Card, CardDifficulty, PartOfSpeech } from '@prisma/client';
import { PrismaService } from 'src/infrastructure/database';
import { cardSortFields, sortOrders } from 'src/shared/constants/sort';
import { PaginatedResponse } from 'src/shared/types';
import { generateSlug } from 'src/shared/utils';
import { CardQueryDto, CreateCardDto, UpdateCardDto } from './dto';

@Injectable()
export class CardService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createCardDto: CreateCardDto, userId?: string): Promise<Card> {
    const slug = generateSlug(createCardDto.wordOrPhrase);

    return this.prisma.card.create({
      data: {
        ...createCardDto,
        slug,
        userId,
        isGlobal: createCardDto.isGlobal ?? true,
      },
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
}
