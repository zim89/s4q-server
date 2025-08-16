/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/require-await */
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EnvSchema } from 'src/config';
import { PrismaService } from '../prisma';

/**
 * Сервис для высокоуровневых операций с базой данных
 *
 * Предоставляет методы для проверки здоровья БД, обслуживания,
 * и утилитарных операций, которые выходят за рамки базовых CRUD операций.
 *
 * @description
 * Этот сервис предназначен для административных и мониторинговых задач.
 * Он не заменяет PrismaService для обычных операций с данными,
 * а дополняет его функциональностью для управления БД.
 *
 * @example
 * // Использование в сервисе
 * constructor(private database: DatabaseService) {}
 *
 * @example
 * // Проверка здоровья БД
 * const health = await this.database.healthCheck();
 * if (health.status === 'error') {
 *   // Обработка ошибки
 * }
 *
 * @example
 * // Получение статистики
 * const stats = await this.database.getStats();
 * console.log(`Пользователей: ${stats.users}`);
 *
 * @example
 * // Очистка устаревших данных
 * const cleanedSessions = await this.database.cleanupExpiredSessions();
 * console.log(`Очищено сессий: ${cleanedSessions}`);
 */
@Injectable()
export class DatabaseService {
  private readonly logger = new Logger(DatabaseService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService<EnvSchema>
  ) {}

  /**
   * Проверка здоровья соединения с базой данных
   *
   * Выполняет простой SQL запрос для проверки доступности БД.
   * Используется для мониторинга и health checks.
   *
   * @returns Объект с статусом проверки и сообщением об ошибке
   *
   * @example
   * // Проверка в health check endpoint
   * const health = await this.database.healthCheck();
   * if (health.status === 'ok') {
   *   return { status: 'healthy' };
   * } else {
   *   return { status: 'unhealthy', error: health.message };
   * }
   */
  async healthCheck(): Promise<{ status: 'ok' | 'error'; message?: string }> {
    try {
      await this.prisma.$queryRaw`SELECT 1`;
      return { status: 'ok' };
    } catch (error) {
      this.logger.error('Database health check failed', error);
      return {
        status: 'error',
        message: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  /**
   * Получение статистики базы данных
   *
   * Подсчитывает количество записей в основных таблицах.
   * Используется для мониторинга и аналитики.
   *
   * @returns Объект с количеством записей по таблицам
   *
   * @example
   * // Получение статистики для dashboard
   * const stats = await this.database.getStats();
   * console.log(`Всего пользователей: ${stats.users}`);
   * console.log(`Всего карточек: ${stats.cards}`);
   */
  async getStats() {
    const stats = await this.prisma.$transaction([
      this.prisma.user.count(),
      this.prisma.card.count(),
      this.prisma.set.count(),
      this.prisma.userSet.count(),
    ]);

    return {
      users: stats[0],
      cards: stats[1],
      sets: stats[2],
      userSets: stats[3],
    };
  }

  /**
   * Очистка устаревших сессий
   *
   * Удаляет сессии, которые истекли или деактивированы.
   * Используется для регулярного обслуживания БД.
   *
   * @returns Количество удаленных сессий
   *
   * @example
   * // Запуск очистки по расписанию
   * const cleanedCount = await this.database.cleanupExpiredSessions();
   * this.logger.log(`Очищено ${cleanedCount} устаревших сессий`);
   */
  async cleanupExpiredSessions(): Promise<number> {
    const result = await this.prisma.session.deleteMany({
      where: {
        OR: [{ expiresAt: { lt: new Date() } }, { isActive: false }],
      },
    });

    this.logger.log(`Cleaned up ${result.count} expired sessions`);
    return result.count;
  }

  /**
   * Clean up old audit logs
   */
  async cleanupOldAuditLogs(daysToKeep = 90): Promise<number> {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - daysToKeep);

    const result = await this.prisma.auditLog.deleteMany({
      where: {
        createdAt: { lt: cutoffDate },
      },
    });

    this.logger.log(`Cleaned up ${result.count} old audit logs`);
    return result.count;
  }

  /**
   * Optimize database performance
   */
  async optimizeDatabase(): Promise<void> {
    try {
      // Analyze tables for better query planning
      await this.prisma.$executeRaw`ANALYZE`;
      this.logger.log('Database optimization completed');
    } catch (error) {
      this.logger.error('Database optimization failed', error);
      throw error;
    }
  }

  /**
   * Get slow queries (if logging is enabled)
   */
  async getSlowQueries(thresholdMs = 1000): Promise<unknown[]> {
    // This would require additional setup with query logging
    // For now, return empty array
    this.logger.warn('Slow query logging not implemented');
    return [];
  }

  /**
   * Backup database (conceptual - would need actual backup implementation)
   */
  async createBackup(): Promise<string> {
    // This would integrate with your backup solution
    // For now, just log the intent
    this.logger.log('Database backup requested');
    return 'backup_' + new Date().toISOString();
  }

  /**
   * Restore database from backup (conceptual)
   */
  async restoreFromBackup(backupId: string): Promise<void> {
    this.logger.log(`Database restore from backup ${backupId} requested`);
    // Implementation would depend on your backup solution
  }
}
