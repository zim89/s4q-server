import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LanguageLevel } from '@prisma/client';
import { IrregularVerbService } from './irregular-verb.service';

@ApiTags('Irregular Verbs')
@Controller('irregular-verbs')
export class IrregularVerbController {
  constructor(private readonly irregularVerbService: IrregularVerbService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Получить список неправильных глаголов',
    description:
      'Возвращает пагинированный список неправильных глаголов с возможностью фильтрации по уровню',
  })
  @ApiQuery({
    name: 'page',
    required: false,
    type: Number,
    description: 'Номер страницы (по умолчанию 1)',
    example: 1,
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    description: 'Количество элементов на странице (по умолчанию 10)',
    example: 10,
  })
  @ApiQuery({
    name: 'level',
    required: false,
    enum: LanguageLevel,
    description: 'Фильтр по уровню сложности',
    example: LanguageLevel.A1,
  })
  @ApiResponse({
    status: 200,
    description: 'Список неправильных глаголов получен успешно',
    schema: {
      type: 'object',
      properties: {
        data: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'string', example: 'uuid' },
              infinitive: { type: 'string', example: 'go' },
              pastSimple: { type: 'string', example: 'went' },
              pastParticiple: { type: 'string', example: 'gone' },
              translation: { type: 'string', example: 'идти' },
              level: { type: 'string', enum: Object.values(LanguageLevel) },
              transcription: { type: 'string', example: '/ɡoʊ/' },
              frequency: { type: 'number', example: 8 },
              difficulty: { type: 'number', example: 6 },
              createdAt: { type: 'string', format: 'date-time' },
              updatedAt: { type: 'string', format: 'date-time' },
            },
          },
        },
        pagination: {
          type: 'object',
          properties: {
            total: { type: 'number', example: 50 },
            page: { type: 'number', example: 1 },
            limit: { type: 'number', example: 10 },
            totalPages: { type: 'number', example: 5 },
            hasNext: { type: 'boolean', example: true },
            hasPrev: { type: 'boolean', example: false },
          },
        },
      },
    },
  })
  async findAll(
    @Query('page', new ValidationPipe({ transform: true })) page = 1,
    @Query('limit', new ValidationPipe({ transform: true })) limit = 10,
    @Query('level') level?: LanguageLevel
  ) {
    return this.irregularVerbService.findAll(page, limit, level);
  }

  @Get('search')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Поиск неправильных глаголов',
    description: 'Поиск неправильных глаголов по инфинитиву для автокомплита',
  })
  @ApiQuery({
    name: 'term',
    required: true,
    type: String,
    description: 'Поисковый термин (инфинитив глагола)',
    example: 'go',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    description: 'Максимальное количество результатов',
    example: 5,
  })
  @ApiResponse({
    status: 200,
    description: 'Результаты поиска',
    schema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'string', example: 'uuid' },
          infinitive: { type: 'string', example: 'go' },
          pastSimple: { type: 'string', example: 'went' },
          pastParticiple: { type: 'string', example: 'gone' },
          translation: { type: 'string', example: 'идти' },
        },
      },
    },
  })
  async searchByTerm(
    @Query('term') term: string,
    @Query('limit', new ValidationPipe({ transform: true })) limit = 5
  ) {
    try {
      return await this.irregularVerbService.searchByTerm(term, limit);
    } catch (_error) {
      return [];
    }
  }
}
