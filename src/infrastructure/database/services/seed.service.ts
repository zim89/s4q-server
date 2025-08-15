import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EnvKeys, EnvSchema } from 'src/config';
import { PrismaService } from '../prisma/prisma.service';

/**
 * Сервис для заполнения базы данных начальными данными
 *
 * Обрабатывает заполнение БД начальными данными и тестовыми данными.
 * Предоставляет методы для инициализации приложения.
 *
 * @description
 * Этот сервис отвечает за заполнение БД необходимыми данными при первом запуске.
 * Включает базовые языки, грамматические правила, формы глаголов,
 * теги и базовые наборы карточек.
 *
 * @example
 * // Использование в сервисе
 * constructor(private seed: SeedService) {}
 *
 * @example
 * // Заполнение начальными данными
 * await this.seed.seedInitialData();
 *
 * @example
 * // Заполнение только тестовыми данными
 * await this.seed.seedTestData();
 *
 * @example
 * // Очистка всех данных (только для разработки)
 * await this.seed.clearAllData();
 */
@Injectable()
export class SeedService {
  private readonly logger = new Logger(SeedService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService<EnvSchema>
  ) {}

  /**
   * Seed initial data
   */
  seedInitialData(): Promise<void> {
    this.logger.log('Seed service initialized - implement seeding logic here');
    return Promise.resolve();
  }

  /**
   * Seed test data (development only)
   */
  seedTestData(): Promise<void> {
    this.logger.log('Test data seeding - implement test data logic here');
    return Promise.resolve();
  }

  /**
   * Clear all data (development only)
   */
  async clearAllData(): Promise<void> {
    const nodeEnv = this.configService.get(EnvKeys.NODE_ENV) as string;
    if (nodeEnv === 'production') {
      throw new Error('Cannot clear data in production');
    }

    try {
      await this.prisma.$transaction([
        this.prisma.auditLog.deleteMany(),
        this.prisma.progress.deleteMany(),
        this.prisma.userCard.deleteMany(),
        this.prisma.userSet.deleteMany(),
        this.prisma.achievement.deleteMany(),
        this.prisma.session.deleteMany(),
        this.prisma.card.deleteMany(),
        this.prisma.set.deleteMany(),
        this.prisma.folder.deleteMany(),
        this.prisma.user.deleteMany(),
        this.prisma.definition.deleteMany(),
        this.prisma.example.deleteMany(),
        this.prisma.grammarRule.deleteMany(),
        this.prisma.tag.deleteMany(),
        this.prisma.language.deleteMany(),
      ]);

      this.logger.log('✅ All data cleared successfully');
    } catch (error) {
      this.logger.error('❌ Failed to clear data', error);
      throw error;
    }
  }
}
