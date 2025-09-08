import { Injectable, NotFoundException } from '@nestjs/common';
import { LanguageLevel, Set, SetType } from '@prisma/client';
import { PrismaService } from 'src/infrastructure/database';
import { setSortFields, sortOrders } from 'src/shared/constants/sort';
import { PaginatedResponse } from 'src/shared/types';
import { generateSlug } from 'src/shared/utils';
import { CreateSetDto, SetQueryDto, UpdateSetDto } from './dto';

@Injectable()
export class SetService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Создать новый набор
   */
  async create(createSetDto: CreateSetDto, userId?: string): Promise<Set> {
    const slug = generateSlug(createSetDto.name);

    return this.prisma.set.create({
      data: {
        ...createSetDto,
        slug,
        userId,
        type: createSetDto.type ?? 'LANGUAGE',
        isBase: createSetDto.isBase ?? false,
        isPublic: createSetDto.isPublic ?? false,
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
      type,
      level,
      search,
      sort = setSortFields.createdAt,
      order = sortOrders.desc,
    } = queryDto;
    const skip = (page - 1) * limit;

    // Строим условия фильтрации
    const where: {
      type?: SetType;
      level?: LanguageLevel;
      name?: { contains: string; mode: 'insensitive' };
    } = {};

    if (type) {
      where.type = type;
    }

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

    const updateData: Partial<UpdateSetDto> & { slug?: string } = {
      ...updateSetDto,
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
