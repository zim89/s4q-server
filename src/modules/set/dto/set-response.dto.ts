import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ContentStatus, LanguageLevel } from '@prisma/client';
import { SetSwaggerSchemas } from '../schemas/set-swagger.schemas';

/**
 * DTO для ответа с данными набора
 *
 * Используется в Swagger документации для описания структуры ответов API.
 * Содержит все поля модели Set с подробными описаниями.
 *
 * @example
 * ```typescript
 * const setResponse: SetResponseDto = {
 *   id: 'cmfier0t20000p4hnsruuys01',
 *   createdAt: '2025-01-13T15:15:11.702Z',
 *   updatedAt: '2025-01-13T15:15:11.702Z',
 *   name: 'Базовые английские слова',
 *   slug: 'basic-english-words',
 *   description: 'Набор базовых английских слов для начинающих',
 *   isBase: false,
 *   isPublic: true,
 *   userId: 'cmfier0t20000p4hnsruuys02',
 *   languageId: 'cmfier0t20000p4hnsruuys03',
 *   level: LanguageLevel.A1,
 *   contentStatus: ContentStatus.PUBLISHED
 * };
 * ```
 */
export class SetResponseDto {
  @ApiProperty(SetSwaggerSchemas.id)
  id!: string;

  @ApiProperty(SetSwaggerSchemas.createdAt)
  createdAt!: Date;

  @ApiProperty(SetSwaggerSchemas.updatedAt)
  updatedAt!: Date;

  @ApiProperty(SetSwaggerSchemas.name)
  name!: string;

  @ApiProperty(SetSwaggerSchemas.slug)
  slug!: string;

  @ApiPropertyOptional(SetSwaggerSchemas.description)
  description?: string;

  @ApiProperty(SetSwaggerSchemas.isBase)
  isBase!: boolean;

  @ApiProperty(SetSwaggerSchemas.isPublic)
  isPublic!: boolean;

  @ApiPropertyOptional(SetSwaggerSchemas.userId)
  userId?: string;

  @ApiPropertyOptional(SetSwaggerSchemas.languageId)
  languageId?: string;

  @ApiPropertyOptional(SetSwaggerSchemas.level)
  level?: LanguageLevel;

  @ApiPropertyOptional(SetSwaggerSchemas.contentStatus)
  contentStatus?: ContentStatus;

  @ApiPropertyOptional(SetSwaggerSchemas.originalSetId)
  originalSetId?: string;
}
