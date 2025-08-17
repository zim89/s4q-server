import { applyDecorators } from '@nestjs/common';
import {
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';

/**
 * Swagger documentation decorators for database migrations endpoints
 *
 * Provides pre-configured Swagger decorators for:
 * - Migration generation
 * - Migration application
 * - Database reset
 * - Migration status
 * - Client generation
 * - Schema push
 *
 * @example
 * // Use in controller
 * @MigrationsSwaggerDocs.generateMigration()
 * @Post('generate')
 * generateMigration(@Body() dto: CreateMigrationDto) {
 *   return this.migrationsService.generateMigration(dto.name);
 * }
 */
export const MigrationsSwaggerDocs = {
  generateMigration: () =>
    applyDecorators(
      ApiOperation({
        summary: 'Создать новую миграцию',
        description:
          'Создает новую миграцию на основе изменений в схеме Prisma',
      }),
      ApiOkResponse({
        description: 'Миграция успешно создана',
      }),
      ApiForbiddenResponse({
        description: 'Доступ запрещен (только для администраторов)',
      })
    ),

  applyMigrations: () =>
    applyDecorators(
      ApiOperation({
        summary: 'Применить миграции',
        description: 'Применяет все ожидающие миграции к базе данных',
      }),
      ApiOkResponse({
        description: 'Миграции успешно применены',
      }),
      ApiForbiddenResponse({
        description: 'Доступ запрещен (только для администраторов)',
      })
    ),

  resetDatabase: () =>
    applyDecorators(
      ApiOperation({
        summary: 'Сбросить базу данных',
        description: 'Сбрасывает базу данных (только для разработки)',
      }),
      ApiOkResponse({
        description: 'База данных успешно сброшена',
      }),
      ApiForbiddenResponse({
        description: 'Доступ запрещен (только для администраторов)',
      })
    ),

  getMigrationStatus: () =>
    applyDecorators(
      ApiOperation({
        summary: 'Получить статус миграций',
        description: 'Возвращает текущий статус миграций базы данных',
      }),
      ApiOkResponse({
        description: 'Статус миграций получен',
      }),
      ApiForbiddenResponse({
        description: 'Доступ запрещен (только для администраторов)',
      })
    ),

  generateClient: () =>
    applyDecorators(
      ApiOperation({
        summary: 'Сгенерировать Prisma клиент',
        description: 'Генерирует Prisma клиент на основе текущей схемы',
      }),
      ApiOkResponse({
        description: 'Prisma клиент успешно сгенерирован',
      }),
      ApiForbiddenResponse({
        description: 'Доступ запрещен (только для администраторов)',
      })
    ),

  pushSchema: () =>
    applyDecorators(
      ApiOperation({
        summary: 'Применить схему напрямую',
        description:
          'Применяет изменения схемы напрямую (только для разработки)',
      }),
      ApiOkResponse({
        description: 'Схема успешно применена',
      }),
      ApiForbiddenResponse({
        description: 'Доступ запрещен (только для администраторов)',
      })
    ),
};
