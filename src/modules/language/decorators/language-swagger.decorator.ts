import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiConflictResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

export const LanguageSwaggerDocs = {
  create: () =>
    applyDecorators(
      ApiOperation({
        summary: 'Создать новый язык',
        description:
          'Создает новый язык в системе. Доступно только администраторам.',
      }),
      ApiBody({
        description: 'Данные для создания языка',
        type: 'object',
      }),
      ApiResponse({
        status: 201,
        description: 'Язык успешно создан',
        schema: {
          type: 'object',
          properties: {
            id: { type: 'string', example: 'clx1234567890' },
            name: { type: 'string', example: 'English' },
            code: { type: 'string', example: 'en' },
            isEnabled: { type: 'boolean', example: true },
            createdAt: { type: 'string', format: 'date-time' },
          },
        },
      }),
      ApiBadRequestResponse({ description: 'Некорректные данные' }),
      ApiConflictResponse({ description: 'Язык с таким кодом уже существует' }),
      ApiUnauthorizedResponse({ description: 'Не авторизован' }),
      ApiForbiddenResponse({ description: 'Недостаточно прав' })
    ),

  findAll: () =>
    applyDecorators(
      ApiOperation({
        summary: 'Получить список языков',
        description:
          'Возвращает список активных языков с возможностью фильтрации.',
      }),
      ApiQuery({
        name: 'isEnabled',
        required: false,
        description: 'Фильтр по активности языка',
        type: 'boolean',
        example: true,
      }),
      ApiQuery({
        name: 'search',
        required: false,
        description: 'Поиск по названию или коду языка',
        type: 'string',
        example: 'english',
      }),
      ApiResponse({
        status: 200,
        description: 'Список языков успешно получен',
        schema: {
          type: 'object',
          properties: {
            data: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  id: { type: 'string', example: 'clx1234567890' },
                  name: { type: 'string', example: 'English' },
                  code: { type: 'string', example: 'en' },
                  isEnabled: { type: 'boolean', example: true },
                  createdAt: { type: 'string', format: 'date-time' },
                },
              },
            },
            pagination: {
              type: 'object',
              properties: {
                total: { type: 'number', example: 10 },
                page: { type: 'number', example: 1 },
                limit: { type: 'number', example: 10 },
                totalPages: { type: 'number', example: 1 },
                hasNext: { type: 'boolean', example: false },
                hasPrev: { type: 'boolean', example: false },
              },
            },
          },
        },
      })
    ),

  findOneById: () =>
    applyDecorators(
      ApiOperation({
        summary: 'Получить язык по ID',
        description:
          'Возвращает язык по его идентификатору. Показывает только активные языки.',
      }),
      ApiParam({
        name: 'id',
        description: 'Идентификатор языка',
        type: 'string',
        example: 'clx1234567890',
      }),
      ApiResponse({
        status: 200,
        description: 'Язык найден',
        schema: {
          type: 'object',
          properties: {
            id: { type: 'string', example: 'clx1234567890' },
            name: { type: 'string', example: 'English' },
            code: { type: 'string', example: 'en' },
            isEnabled: { type: 'boolean', example: true },
            createdAt: { type: 'string', format: 'date-time' },
          },
        },
      }),
      ApiNotFoundResponse({ description: 'Язык не найден или отключен' })
    ),

  findOneByCode: () =>
    applyDecorators(
      ApiOperation({
        summary: 'Получить язык по коду',
        description:
          'Возвращает язык по его коду ISO 639-1. Показывает только активные языки.',
      }),
      ApiParam({
        name: 'code',
        description: 'Код языка по ISO 639-1',
        type: 'string',
        example: 'en',
      }),
      ApiResponse({
        status: 200,
        description: 'Язык найден',
        schema: {
          type: 'object',
          properties: {
            id: { type: 'string', example: 'clx1234567890' },
            name: { type: 'string', example: 'English' },
            code: { type: 'string', example: 'en' },
            isEnabled: { type: 'boolean', example: true },
            createdAt: { type: 'string', format: 'date-time' },
          },
        },
      }),
      ApiNotFoundResponse({ description: 'Язык не найден или отключен' })
    ),

  update: () =>
    applyDecorators(
      ApiOperation({
        summary: 'Обновить язык',
        description: 'Обновляет данные языка. Доступно только администраторам.',
      }),
      ApiParam({
        name: 'id',
        description: 'Идентификатор языка',
        type: 'string',
        example: 'clx1234567890',
      }),
      ApiBody({
        description: 'Данные для обновления языка',
        type: 'object',
      }),
      ApiResponse({
        status: 200,
        description: 'Язык успешно обновлен',
        schema: {
          type: 'object',
          properties: {
            id: { type: 'string', example: 'clx1234567890' },
            name: { type: 'string', example: 'English' },
            code: { type: 'string', example: 'en' },
            isEnabled: { type: 'boolean', example: true },
            createdAt: { type: 'string', format: 'date-time' },
          },
        },
      }),
      ApiBadRequestResponse({ description: 'Некорректные данные' }),
      ApiNotFoundResponse({ description: 'Язык не найден' }),
      ApiConflictResponse({ description: 'Язык с таким кодом уже существует' }),
      ApiUnauthorizedResponse({ description: 'Не авторизован' }),
      ApiForbiddenResponse({ description: 'Недостаточно прав' })
    ),

  remove: () =>
    applyDecorators(
      ApiOperation({
        summary: 'Удалить язык',
        description:
          'Удаляет язык из системы. Доступно только администраторам. Нельзя удалить язык, который используется в карточках или наборах.',
      }),
      ApiParam({
        name: 'id',
        description: 'Идентификатор языка',
        type: 'string',
        example: 'clx1234567890',
      }),
      ApiResponse({
        status: 200,
        description: 'Язык успешно удален',
      }),
      ApiNotFoundResponse({ description: 'Язык не найден' }),
      ApiConflictResponse({
        description:
          'Нельзя удалить язык, который используется в карточках или наборах',
      }),
      ApiUnauthorizedResponse({ description: 'Не авторизован' }),
      ApiForbiddenResponse({ description: 'Недостаточно прав' })
    ),
};
