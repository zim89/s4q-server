import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { spawn } from 'child_process';
import { envKeys, EnvSchema } from 'src/config';

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
   * Безопасное выполнение команды через spawn
   */
  private async executeCommand(
    command: string,
    args: string[],
    cwd?: string
  ): Promise<string> {
    return new Promise((resolve, reject) => {
      const child = spawn(command, args, {
        cwd,
        stdio: 'pipe',
        shell: false, // Безопасно - не используем shell
      });

      let stdout = '';
      let stderr = '';

      child.stdout?.on('data', (data: Buffer) => {
        stdout += data.toString();
      });

      child.stderr?.on('data', (data: Buffer) => {
        stderr += data.toString();
      });

      child.on('close', code => {
        if (code === 0) {
          resolve(stdout);
        } else {
          reject(new Error(`Command failed with code ${code}: ${stderr}`));
        }
      });

      child.on('error', error => {
        reject(error);
      });
    });
  }

  /**
   * Generate a new migration
   */
  async generateMigration(name: string): Promise<string> {
    try {
      const stdout = await this.executeCommand('npx', [
        'prisma',
        'migrate',
        'dev',
        '--name',
        name,
      ]);
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
      const stdout = await this.executeCommand('npx', [
        'prisma',
        'migrate',
        'deploy',
      ]);
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
      const stdout = await this.executeCommand('npx', [
        'prisma',
        'migrate',
        'reset',
        '--force',
      ]);
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
      const stdout = await this.executeCommand('npx', [
        'prisma',
        'migrate',
        'status',
      ]);
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
      const stdout = await this.executeCommand('npx', ['prisma', 'generate']);
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
      const stdout = await this.executeCommand('npx', ['prisma', 'db', 'push']);
      this.logger.log('✅ Schema pushed successfully');
      return stdout;
    } catch (error) {
      this.logger.error('❌ Failed to push schema', error);
      throw error;
    }
  }
}
