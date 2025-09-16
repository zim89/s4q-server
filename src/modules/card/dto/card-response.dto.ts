import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  CardDifficulty,
  ContentStatus,
  ContentType,
  LanguageLevel,
  PartOfSpeech,
  VerbType,
} from '@prisma/client';
import { CardSwaggerSchemas } from '../schemas/card-swagger.schema';

/**
 * DTO для ответа с данными карточки
 *
 * Используется в Swagger документации для описания структуры ответов API.
 * Содержит все поля модели Card с подробными описаниями.
 *
 * @example
 * ```typescript
 * const cardResponse: CardResponseDto = {
 *   id: 'cmfier0t20000p4hnsruuys01',
 *   createdAt: '2025-01-13T15:15:11.702Z',
 *   updatedAt: '2025-01-13T15:15:11.702Z',
 *   term: 'beautiful',
 *   slug: 'beautiful',
 *   translate: 'красивый',
 *   definition: 'Pleasing to the senses or mind aesthetically',
 *   example: 'The sunset is beautiful.<br>The beautiful garden is full of flowers.',
 *   partOfSpeech: PartOfSpeech.ADJECTIVE,
 *   transcription: 'ˈbjuːtɪfəl',
 *   isGlobal: true,
 *   difficulty: CardDifficulty.EASY,
 *   contentType: ContentType.TEXT,
 *   contentStatus: ContentStatus.PUBLISHED
 * };
 * ```
 */
export class CardResponseDto {
  // === Базовые поля ===
  @ApiProperty(CardSwaggerSchemas.id)
  id!: string;

  @ApiProperty(CardSwaggerSchemas.createdAt)
  createdAt!: Date;

  @ApiProperty(CardSwaggerSchemas.updatedAt)
  updatedAt!: Date;

  // === Основные поля ===
  @ApiProperty(CardSwaggerSchemas.term)
  term!: string;

  @ApiProperty(CardSwaggerSchemas.slug)
  slug!: string;

  @ApiPropertyOptional(CardSwaggerSchemas.translate)
  translate?: string;

  @ApiPropertyOptional(CardSwaggerSchemas.definition)
  definition?: string;

  @ApiPropertyOptional(CardSwaggerSchemas.example)
  example?: string;

  @ApiPropertyOptional(CardSwaggerSchemas.partOfSpeech)
  partOfSpeech?: PartOfSpeech;

  @ApiPropertyOptional(CardSwaggerSchemas.transcription)
  transcription?: string;

  @ApiPropertyOptional(CardSwaggerSchemas.imageUrl)
  imageUrl?: string;

  @ApiPropertyOptional(CardSwaggerSchemas.audioUrl)
  audioUrl?: string;

  @ApiProperty(CardSwaggerSchemas.isGlobal)
  isGlobal!: boolean;

  @ApiPropertyOptional(CardSwaggerSchemas.grammaticalGender)
  grammaticalGender?: string;

  @ApiPropertyOptional(CardSwaggerSchemas.difficulty)
  difficulty?: CardDifficulty;

  @ApiPropertyOptional(CardSwaggerSchemas.contentType)
  contentType?: ContentType;

  @ApiPropertyOptional(CardSwaggerSchemas.contentStatus)
  contentStatus?: ContentStatus;

  @ApiPropertyOptional(CardSwaggerSchemas.userId)
  userId?: string;

  @ApiPropertyOptional(CardSwaggerSchemas.languageId)
  languageId?: string;

  @ApiPropertyOptional(CardSwaggerSchemas.level)
  level?: LanguageLevel;

  @ApiPropertyOptional(CardSwaggerSchemas.ruleId)
  ruleId?: string;

  @ApiPropertyOptional(CardSwaggerSchemas.verbType)
  verbType?: VerbType;

  @ApiPropertyOptional(CardSwaggerSchemas.irregularVerbId)
  irregularVerbId?: string;

  @ApiPropertyOptional(CardSwaggerSchemas.sourceProvider)
  sourceProvider?: string;

  @ApiPropertyOptional(CardSwaggerSchemas.sourceId)
  sourceId?: string;

  @ApiProperty(CardSwaggerSchemas.studyCount)
  studyCount!: number;

  @ApiProperty(CardSwaggerSchemas.viewCount)
  viewCount!: number;

  @ApiPropertyOptional(CardSwaggerSchemas.lastUsedAt)
  lastUsedAt?: Date;
}
