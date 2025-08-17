import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { envKeys, EnvSchema } from 'src/config';
import { PrismaService } from '../prisma/prisma.service';
import { languagesData } from './constants/languages.constants';

/**
 * Сервис для заполнения базы данных начальными данными
 *
 * Обрабатывает заполнение БД начальными данными.
 * Предоставляет методы для инициализации приложения.
 *
 * @description
 * Этот сервис отвечает за заполнение БД необходимыми данными при первом запуске.
 * Включает базовые языки и другие необходимые данные.
 *
 * @example
 * // Использование в сервисе
 * constructor(private seed: SeedService) {}
 *
 * @example
 * // Заполнение языками
 * await this.seed.seedLanguages();
 *
 * @example
 * // Заполнение всех начальных данных
 * await this.seed.seedInitialData();
 *
 * @example
 * // Очистка всех данных (только для разработки)
 * await this.seed.clearAllData();
 */
@Injectable()
export class SeedService {
  private readonly logger = new Logger(SeedService.name);

  // ID существующего админа
  private readonly ADMIN_ID = 'cmefhefgg0000p4xvds3jc5rt';

  constructor(
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService<EnvSchema>
  ) {}

  /**
   * Заполнение языков
   */
  async seedLanguages(): Promise<void> {
    try {
      this.logger.log('🌍 Начинаем заполнение языков...');

      for (const languageData of languagesData) {
        const existingLanguage = await this.prisma.language.findUnique({
          where: { code: languageData.code },
        });

        if (existingLanguage) {
          this.logger.log(`✅ Язык ${languageData.name} уже существует`);
          continue;
        }

        await this.prisma.language.create({
          data: {
            code: languageData.code,
            name: languageData.name,
            isEnabled: languageData.isActive,
          },
        });

        this.logger.log(`✅ Язык ${languageData.name} добавлен`);
      }

      this.logger.log('🎉 Заполнение языков завершено');
    } catch (error) {
      this.logger.error('❌ Ошибка при заполнении языков:', error);
      throw error;
    }
  }

  /**
   * Заполнение всех начальных данных
   */
  async seedInitialData(): Promise<void> {
    try {
      this.logger.log('🚀 Начинаем заполнение начальных данных...');

      // Заполняем языки
      await this.seedLanguages();

      this.logger.log('🎉 Заполнение начальных данных завершено');
    } catch (error) {
      this.logger.error('❌ Ошибка при заполнении начальных данных:', error);
      throw error;
    }
  }

  /**
   * Проверка существования админа
   */
  async checkAdminExists(): Promise<boolean> {
    try {
      const admin = await this.prisma.user.findUnique({
        where: { id: this.ADMIN_ID },
      });
      return !!admin;
    } catch (error) {
      this.logger.error('❌ Ошибка при проверке админа:', error);
      return false;
    }
  }

  /**
   * Получение ID админа
   */
  getAdminId(): string {
    return this.ADMIN_ID;
  }

  /**
   * Очистка всех данных (только для разработки)
   */
  async clearAllData(): Promise<void> {
    const nodeEnv = this.configService.get(envKeys.NODE_ENV) as string;
    if (nodeEnv === 'production') {
      throw new Error('Cannot clear data in production');
    }

    try {
      this.logger.log('🧹 Начинаем очистку всех данных...');

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
        this.prisma.definition.deleteMany(),
        this.prisma.example.deleteMany(),
        this.prisma.grammarRule.deleteMany(),
        this.prisma.tag.deleteMany(),
        this.prisma.language.deleteMany(),
        // НЕ удаляем пользователей, чтобы сохранить админа
      ]);

      this.logger.log('✅ Все данные очищены успешно');
    } catch (error) {
      this.logger.error('❌ Ошибка при очистке данных:', error);
      throw error;
    }
  }

  /**
   * Получение статистики заполнения
   */
  async getSeedingStats(): Promise<{
    languages: number;
    adminExists: boolean;
  }> {
    try {
      const [languagesCount, adminExists] = await Promise.all([
        this.prisma.language.count(),
        this.checkAdminExists(),
      ]);

      return {
        languages: languagesCount,
        adminExists,
      };
    } catch (error) {
      this.logger.error('❌ Ошибка при получении статистики:', error);
      throw error;
    }
  }
}
