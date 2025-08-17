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
 * Swagger декораторы документации для эндпоинтов наборов
 *
 * Предоставляет предустановленные Swagger декораторы для:
 * - Создания наборов
 * - Получения наборов
 * - Обновления наборов
 * - Удаления наборов
 * - Управления карточками в наборах
 *
 * @example
 * // Использование в контроллере
 * @SetSwaggerDocs.create()
 * @Post()
 * create(@Body() dto: CreateSetDto) {
 *   return this.setService.create(dto);
 * }
 */
export const SetSwaggerDocs = {
  create: () =>
    applyDecorators(
      ApiOperation({ summary: 'Создать новый набор' }),
      ApiOkResponse({
        description: 'Набор успешно создан',
        type: Set,
      }),
      ApiUnauthorizedResponse({ description: 'Не авторизован' }),
      ApiForbiddenResponse({ description: 'Недостаточно прав' }),
      ApiBadRequestResponse({ description: 'Неверные данные' }),
      ApiBearerAuth()
    ),

  findAll: () =>
    applyDecorators(
      ApiOperation({ summary: 'Получить все наборы' }),
      ApiOkResponse({
        description: 'Список наборов',
        type: [Set],
      })
    ),

  findOne: () =>
    applyDecorators(
      ApiOperation({ summary: 'Получить набор по ID' }),
      ApiOkResponse({
        description: 'Набор найден',
        type: Set,
      }),
      ApiNotFoundResponse({ description: 'Набор не найден' })
    ),

  update: () =>
    applyDecorators(
      ApiOperation({ summary: 'Обновить набор' }),
      ApiOkResponse({
        description: 'Набор успешно обновлен',
        type: Set,
      }),
      ApiUnauthorizedResponse({ description: 'Не авторизован' }),
      ApiForbiddenResponse({ description: 'Недостаточно прав' }),
      ApiNotFoundResponse({ description: 'Набор не найден' }),
      ApiBadRequestResponse({ description: 'Неверные данные' }),
      ApiBearerAuth()
    ),

  remove: () =>
    applyDecorators(
      ApiOperation({ summary: 'Удалить набор' }),
      ApiOkResponse({ description: 'Набор успешно удален' }),
      ApiUnauthorizedResponse({ description: 'Не авторизован' }),
      ApiForbiddenResponse({ description: 'Недостаточно прав' }),
      ApiNotFoundResponse({ description: 'Набор не найден' }),
      ApiBearerAuth()
    ),

  addCardToSet: () =>
    applyDecorators(
      ApiOperation({ summary: 'Добавить карточку в набор' }),
      ApiOkResponse({
        description: 'Карточка успешно добавлена в набор',
      }),
      ApiUnauthorizedResponse({ description: 'Не авторизован' }),
      ApiForbiddenResponse({ description: 'Недостаточно прав' }),
      ApiNotFoundResponse({ description: 'Набор или карточка не найдены' }),
      ApiBearerAuth()
    ),

  removeCardFromSet: () =>
    applyDecorators(
      ApiOperation({ summary: 'Удалить карточку из набора' }),
      ApiOkResponse({
        description: 'Карточка успешно удалена из набора',
      }),
      ApiUnauthorizedResponse({ description: 'Не авторизован' }),
      ApiForbiddenResponse({ description: 'Недостаточно прав' }),
      ApiNotFoundResponse({ description: 'Набор не найден' }),
      ApiBearerAuth()
    ),
};
