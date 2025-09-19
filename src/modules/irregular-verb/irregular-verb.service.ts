import { Injectable } from '@nestjs/common';
import { LanguageLevel, Prisma, VerbType } from '@prisma/client';
import { PrismaService } from 'src/infrastructure/database';

export interface CreateIrregularVerbData {
  infinitive: string;
  pastSimple: string;
  pastParticiple: string;
  translation: string;
  level?: LanguageLevel;
  transcription?: string;
}

@Injectable()
export class IrregularVerbService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Создать или найти существующий неправильный глагол
   *
   * @param data - данные для создания неправильного глагола
   * @returns существующий или новый IrregularVerb
   */
  async createOrFindIrregularVerb(
    data: CreateIrregularVerbData
  ): Promise<Prisma.IrregularVerbGetPayload<Record<string, never>>> {
    // 1. Проверить существование по infinitive
    const existing = await this.prisma.irregularVerb.findUnique({
      where: { infinitive: data.infinitive },
    });

    if (existing) {
      return existing;
    }

    // 2. Создать новый неправильный глагол
    return this.prisma.irregularVerb.create({
      data: {
        infinitive: data.infinitive,
        pastSimple: data.pastSimple,
        pastParticiple: data.pastParticiple,
        translation: data.translation,
        verbType: VerbType.IRREGULAR,
        level: data.level ?? LanguageLevel.A1,
        transcription: data.transcription,
        frequency: 5, // средняя частота использования
        difficulty: 5, // средняя сложность запоминания
      },
    });
  }

  /**
   * Создать или найти существующий неправильный глагол в транзакции
   *
   * @param tx - транзакция Prisma
   * @param data - данные для создания неправильного глагола
   * @returns существующий или новый IrregularVerb
   */
  async createOrFindIrregularVerbInTransaction(
    tx: Prisma.TransactionClient,
    data: CreateIrregularVerbData
  ): Promise<Prisma.IrregularVerbGetPayload<Record<string, never>>> {
    // 1. Проверить существование по infinitive
    const existing = await tx.irregularVerb.findUnique({
      where: { infinitive: data.infinitive },
    });

    if (existing) {
      return existing;
    }

    // 2. Создать новый неправильный глагол
    return tx.irregularVerb.create({
      data: {
        infinitive: data.infinitive,
        pastSimple: data.pastSimple,
        pastParticiple: data.pastParticiple,
        translation: data.translation,
        verbType: VerbType.IRREGULAR,
        level: data.level ?? LanguageLevel.A1,
        transcription: data.transcription,
        frequency: 5, // средняя частота использования
        difficulty: 5, // средняя сложность запоминания
      },
    });
  }

  /**
   * Найти неправильный глагол по инфинитиву
   *
   * @param infinitive - инфинитив глагола
   * @returns IrregularVerb или null
   */
  async findByInfinitive(infinitive: string) {
    return this.prisma.irregularVerb.findUnique({
      where: { infinitive },
    });
  }

  /**
   * Получить все неправильные глаголы с пагинацией
   *
   * @param page - номер страницы
   * @param limit - количество на странице
   * @param level - уровень сложности (опционально)
   * @returns список неправильных глаголов
   */
  async findAll(page = 1, limit = 10, level?: LanguageLevel) {
    const skip = (page - 1) * limit;
    const where = level ? { level } : {};

    const [items, total] = await Promise.all([
      this.prisma.irregularVerb.findMany({
        where,
        skip,
        take: limit,
        orderBy: { infinitive: 'asc' },
      }),
      this.prisma.irregularVerb.count({ where }),
    ]);

    return {
      data: items,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
        hasNext: page < Math.ceil(total / limit),
        hasPrev: page > 1,
      },
    };
  }

  /**
   * Поиск неправильных глаголов по инфинитиву
   *
   * @param term - поисковый термин
   * @param limit - максимальное количество результатов
   * @returns список найденных глаголов
   */
  async searchByTerm(term: string, limit = 5) {
    if (!term || term.length < 2) {
      return [];
    }

    return await this.prisma.irregularVerb.findMany({
      where: {
        infinitive: {
          contains: term,
          mode: 'insensitive',
        },
      },
      select: {
        id: true,
        infinitive: true,
        pastSimple: true,
        pastParticiple: true,
        translation: true,
      },
      take: limit,
      orderBy: { infinitive: 'asc' },
    });
  }
}
