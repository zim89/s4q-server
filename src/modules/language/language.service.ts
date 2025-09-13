import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Language } from '@prisma/client';
import { PrismaService } from 'src/infrastructure/database';
import { PaginatedResponse } from 'src/shared/types';
import { CreateLanguageDto, LanguageQueryDto, UpdateLanguageDto } from './dto';

@Injectable()
export class LanguageService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createLanguageDto: CreateLanguageDto): Promise<Language> {
    // Проверяем, существует ли уже язык с таким кодом
    const existingLanguage = await this.prisma.language.findUnique({
      where: { code: createLanguageDto.code },
    });

    if (existingLanguage) {
      throw new ConflictException(
        `Язык с кодом "${createLanguageDto.code}" уже существует`
      );
    }

    return this.prisma.language.create({
      data: createLanguageDto,
    });
  }

  async findMany(
    queryDto: LanguageQueryDto
  ): Promise<PaginatedResponse<Language>> {
    const { isEnabled, search } = queryDto;

    // Строим условия фильтрации
    const where: {
      isEnabled?: boolean;
      OR?: Array<
        | {
            name: { contains: string; mode: 'insensitive' };
          }
        | {
            code: { contains: string; mode: 'insensitive' };
          }
      >;
    } = {};

    // Фильтр по активности - показываем только активные языки
    if (isEnabled !== undefined) {
      where.isEnabled = isEnabled;
    } else {
      // По умолчанию показываем только активные языки
      where.isEnabled = true;
    }

    // Поиск по названию или коду
    if (search) {
      where.OR = [
        {
          name: {
            contains: search,
            mode: 'insensitive',
          },
        },
        {
          code: {
            contains: search,
            mode: 'insensitive',
          },
        },
      ];
    }

    const [items, total] = await Promise.all([
      this.prisma.language.findMany({
        where,
        orderBy: { name: 'asc' },
      }),
      this.prisma.language.count({ where }),
    ]);

    return {
      data: items,
      pagination: {
        total,
        page: 1,
        limit: total,
        totalPages: 1,
        hasNext: false,
        hasPrev: false,
      },
    };
  }

  async findOneById(id: string): Promise<Language> {
    const language = await this.prisma.language.findUnique({
      where: { id, isEnabled: true },
    });

    if (!language) {
      throw new NotFoundException(`Язык с ID ${id} не найден или отключен`);
    }

    return language;
  }

  async findOneByCode(code: string): Promise<Language> {
    const language = await this.prisma.language.findUnique({
      where: { code, isEnabled: true },
    });

    if (!language) {
      throw new NotFoundException(
        `Язык с кодом "${code}" не найден или отключен`
      );
    }

    return language;
  }

  async update(
    id: string,
    updateLanguageDto: UpdateLanguageDto
  ): Promise<Language> {
    const existingLanguage = await this.prisma.language.findUnique({
      where: { id },
    });

    if (!existingLanguage) {
      throw new NotFoundException(`Язык с ID ${id} не найден`);
    }

    // Проверяем, не существует ли уже язык с таким кодом (если код изменяется)
    if (
      updateLanguageDto.code &&
      updateLanguageDto.code !== existingLanguage.code
    ) {
      const existingByCode = await this.prisma.language.findUnique({
        where: { code: updateLanguageDto.code },
      });

      if (existingByCode) {
        throw new ConflictException(
          `Язык с кодом "${updateLanguageDto.code}" уже существует`
        );
      }
    }

    return this.prisma.language.update({
      where: { id },
      data: updateLanguageDto,
    });
  }

  async remove(id: string): Promise<void> {
    const existingLanguage = await this.prisma.language.findUnique({
      where: { id },
    });

    if (!existingLanguage) {
      throw new NotFoundException(`Язык с ID ${id} не найден`);
    }

    // Проверяем, не используется ли язык в карточках или наборах
    const [cardsCount, setsCount] = await Promise.all([
      this.prisma.card.count({ where: { languageId: id } }),
      this.prisma.set.count({ where: { languageId: id } }),
    ]);

    if (cardsCount > 0 || setsCount > 0) {
      throw new ConflictException(
        `Нельзя удалить язык, который используется в ${cardsCount} карточках и ${setsCount} наборах`
      );
    }

    await this.prisma.language.delete({
      where: { id },
    });
  }
}
