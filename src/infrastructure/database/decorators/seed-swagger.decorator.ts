import { applyDecorators } from '@nestjs/common';
import {
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';

/**
 * Swagger documentation decorators for database seeding endpoints
 *
 * Provides pre-configured Swagger decorators for:
 * - Language seeding
 * - Initial data seeding
 * - Data clearing
 * - Seeding statistics
 * - Admin ID retrieval
 *
 * @example
 * // Use in controller
 * @SeedSwaggerDocs.seedLanguages()
 * @Post('languages')
 * seedLanguages() {
 *   return this.seedService.seedLanguages();
 * }
 */
export const SeedSwaggerDocs = {
  seedLanguages: () =>
    applyDecorators(
      ApiOperation({
        summary: 'Заполнить языки',
        description: 'Заполняет базу данных поддерживаемыми языками',
      }),
      ApiOkResponse({
        description: 'Языки успешно заполнены',
      }),
      ApiForbiddenResponse({
        description: 'Доступ запрещен (только для администраторов)',
      })
    ),

  seedInitialData: () =>
    applyDecorators(
      ApiOperation({
        summary: 'Заполнить все начальные данные',
        description:
          'Заполняет базу данных всеми необходимыми начальными данными',
      }),
      ApiOkResponse({
        description: 'Начальные данные успешно заполнены',
      }),
      ApiForbiddenResponse({
        description: 'Доступ запрещен (только для администраторов)',
      })
    ),

  clearAllData: () =>
    applyDecorators(
      ApiOperation({
        summary: 'Очистить все данные',
        description: 'Очищает все данные из базы (только для разработки)',
      }),
      ApiOkResponse({
        description: 'Данные успешно очищены',
      }),
      ApiForbiddenResponse({
        description: 'Доступ запрещен (только для администраторов)',
      })
    ),

  getSeedingStats: () =>
    applyDecorators(
      ApiOperation({
        summary: 'Получить статистику сидинга',
        description: 'Возвращает статистику заполнения данных',
      }),
      ApiOkResponse({
        description: 'Статистика получена',
      }),
      ApiForbiddenResponse({
        description: 'Доступ запрещен (только для администраторов)',
      })
    ),

  getAdminId: () =>
    applyDecorators(
      ApiOperation({
        summary: 'Получить ID админа',
        description: 'Возвращает ID существующего администратора',
      }),
      ApiOkResponse({
        description: 'ID админа получен',
      }),
      ApiForbiddenResponse({
        description: 'Доступ запрещен (только для администраторов)',
      })
    ),
};
