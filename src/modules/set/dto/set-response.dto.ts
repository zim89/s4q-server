import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ContentStatus, LanguageLevel } from '@prisma/client';

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
  @ApiProperty({
    description: 'Уникальный идентификатор набора',
    example: 'cmfier0t20000p4hnsruuys01',
  })
  id!: string;

  @ApiProperty({
    description: 'Дата и время создания набора',
    example: '2025-01-13T15:15:11.702Z',
  })
  createdAt!: Date;

  @ApiProperty({
    description: 'Дата и время последнего обновления набора',
    example: '2025-01-13T15:15:11.702Z',
  })
  updatedAt!: Date;

  @ApiProperty({
    description: 'Название набора',
    example: 'Базовые английские слова',
  })
  name!: string;

  @ApiProperty({
    description: 'URL-дружественный идентификатор',
    example: 'basic-english-words',
  })
  slug!: string;

  @ApiPropertyOptional({
    description: 'Описание набора',
    example: 'Набор базовых английских слов для начинающих',
  })
  description?: string;

  @ApiProperty({
    description: 'Базовый набор (системный)',
    example: false,
  })
  isBase!: boolean;

  @ApiProperty({
    description: 'Публичный набор (доступен всем)',
    example: true,
  })
  isPublic!: boolean;

  @ApiPropertyOptional({
    description: 'ID пользователя, создавшего набор',
    example: 'cmfier0t20000p4hnsruuys02',
  })
  userId?: string;

  @ApiPropertyOptional({
    description: 'ID языка набора',
    example: 'cmfier0t20000p4hnsruuys03',
  })
  languageId?: string;

  @ApiPropertyOptional({
    description: 'Уровень сложности набора',
    enum: LanguageLevel,
    example: LanguageLevel.A1,
  })
  level?: LanguageLevel;

  @ApiPropertyOptional({
    description: 'Статус контента набора',
    enum: ContentStatus,
    example: ContentStatus.PUBLISHED,
  })
  contentStatus?: ContentStatus;

  @ApiPropertyOptional({
    description: 'ID оригинального набора (для форков)',
    example: 'cmfier0t20000p4hnsruuys04',
  })
  originalSetId?: string;
}
