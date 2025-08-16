import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { exec } from 'child_process';
import { envKeys, EnvSchema } from 'src/config';
import { promisify } from 'util';

const execAsync = promisify(exec);

/**
 * Сервис для управления миграциями базы данных
 *
 * Обрабатывает создание, применение и управление миграциями схемы БД.
 * Предоставляет программный интерфейс для работы с Prisma Migrate.
 *
 * @description
 * Этот сервис инкапсулирует команды Prisma CLI для работы с миграциями.
 * Позволяет выполнять операции с миграциями программно,
 * что полезно для автоматизации и CI/CD процессов.
 *
 * @example
 * // Использование в сервисе
 * constructor(private migrations: MigrationsService) {}
 *
 * @example
 * // Создание новой миграции
 * await this.migrations.generateMigration('add_user_profile');
 *
 * @example
 * // Применение миграций в продакшене
 * await this.migrations.applyMigrations();
 *
 * @example
 * // Проверка статуса миграций
 * const status = await this.migrations.getMigrationStatus();
 * console.log(status);
 */
@Injectable()
export class MigrationsService {
  private readonly logger = new Logger(MigrationsService.name);

  constructor(private readonly configService: ConfigService<EnvSchema>) {}

  /**
   * Generate a new migration
   */
  async generateMigration(name: string): Promise<string> {
    try {
      const { stdout } = await execAsync(
        `npx prisma migrate dev --name ${name}`
      );
      this.logger.log(`✅ Migration generated: ${name}`);
      return stdout;
    } catch (error) {
      this.logger.error(`❌ Failed to generate migration: ${name}`, error);
      throw error;
    }
  }

  /**
   * Apply pending migrations
   */
  async applyMigrations(): Promise<string> {
    try {
      const { stdout } = await execAsync('npx prisma migrate deploy');
      this.logger.log('✅ Migrations applied successfully');
      return stdout;
    } catch (error) {
      this.logger.error('❌ Failed to apply migrations', error);
      throw error;
    }
  }

  /**
   * Reset database (development only)
   */
  async resetDatabase(): Promise<string> {
    const nodeEnv = this.configService.get(envKeys.NODE_ENV) as string;
    if (nodeEnv === 'production') {
      throw new Error('Cannot reset database in production');
    }

    try {
      const { stdout } = await execAsync('npx prisma migrate reset --force');
      this.logger.log('✅ Database reset successfully');
      return stdout;
    } catch (error) {
      this.logger.error('❌ Failed to reset database', error);
      throw error;
    }
  }

  /**
   * Get migration status
   */
  async getMigrationStatus(): Promise<string> {
    try {
      const { stdout } = await execAsync('npx prisma migrate status');
      return stdout;
    } catch (error) {
      this.logger.error('❌ Failed to get migration status', error);
      throw error;
    }
  }

  /**
   * Generate Prisma client
   */
  async generateClient(): Promise<string> {
    try {
      const { stdout } = await execAsync('npx prisma generate');
      this.logger.log('✅ Prisma client generated successfully');
      return stdout;
    } catch (error) {
      this.logger.error('❌ Failed to generate Prisma client', error);
      throw error;
    }
  }

  /**
   * Push schema changes directly (development only)
   */
  async pushSchema(): Promise<string> {
    const nodeEnv = this.configService.get(envKeys.NODE_ENV) as string;
    if (nodeEnv === 'production') {
      throw new Error('Cannot push schema in production');
    }

    try {
      const { stdout } = await execAsync('npx prisma db push');
      this.logger.log('✅ Schema pushed successfully');
      return stdout;
    } catch (error) {
      this.logger.error('❌ Failed to push schema', error);
      throw error;
    }
  }
}
