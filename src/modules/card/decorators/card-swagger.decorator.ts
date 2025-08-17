import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

/**
 * Swagger декораторы документации для эндпоинтов карточек
 *
 * Предоставляет предустановленные Swagger декораторы для:
 * - Создания карточек
 * - Получения карточек
 * - Обновления карточек
 * - Удаления карточек
 *
 * @example
 * // Использование в контроллере
 * @CardSwaggerDocs.create()
 * @Post()
 * create(@Body() dto: CreateCardDto) {
 *   return this.cardService.create(dto);
 * }
 */
export const CardSwaggerDocs = {
  create: () =>
    applyDecorators(
      ApiOperation({ summary: 'Создать новую карточку' }),
      ApiOkResponse({
        description: 'Карточка успешно создана',
      }),
      ApiUnauthorizedResponse({ description: 'Не авторизован' }),
      ApiForbiddenResponse({ description: 'Недостаточно прав' }),
      ApiBadRequestResponse({ description: 'Неверные данные' }),
      ApiBearerAuth()
    ),

  findAll: () =>
    applyDecorators(
      ApiOperation({ summary: 'Получить все карточки' }),
      ApiOkResponse({
        description: 'Список карточек',
      })
    ),

  findOne: () =>
    applyDecorators(
      ApiOperation({ summary: 'Получить карточку по ID' }),
      ApiOkResponse({
        description: 'Карточка найдена',
      }),
      ApiNotFoundResponse({ description: 'Карточка не найдена' })
    ),

  update: () =>
    applyDecorators(
      ApiOperation({ summary: 'Обновить карточку' }),
      ApiOkResponse({
        description: 'Карточка успешно обновлена',
      }),
      ApiUnauthorizedResponse({ description: 'Не авторизован' }),
      ApiForbiddenResponse({ description: 'Недостаточно прав' }),
      ApiNotFoundResponse({ description: 'Карточка не найдена' }),
      ApiBadRequestResponse({ description: 'Неверные данные' }),
      ApiBearerAuth()
    ),

  remove: () =>
    applyDecorators(
      ApiOperation({ summary: 'Удалить карточку' }),
      ApiOkResponse({ description: 'Карточка успешно удалена' }),
      ApiUnauthorizedResponse({ description: 'Не авторизован' }),
      ApiForbiddenResponse({ description: 'Недостаточно прав' }),
      ApiNotFoundResponse({ description: 'Карточка не найдена' }),
      ApiBearerAuth()
    ),
};
