import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  CardDifficulty,
  ContentStatus,
  ContentType,
  PartOfSpeech,
} from '@prisma/client';
import { IsBoolean, IsEnum, IsOptional, IsString } from 'class-validator';

/**
 * DTO для создания новой карточки
 *
 * Используется для создания карточек с английскими словами и фразами.
 * Поддерживает различные типы контента: текст, изображения, аудио.
 *
 * @example
 * ```typescript
 * const createCardDto: CreateCardDto = {
 *   wordOrPhrase: 'hello',
 *   transcription: 'həˈloʊ',
 *   partOfSpeech: PartOfSpeech.INTERJECTION,
 *   difficulty: CardDifficulty.EASY,
 *   contentType: ContentType.TEXT,
 *   isGlobal: true
 * };
 * ```
 *
 * @example
 * ```typescript
 * // Карточка с изображением и аудио
 * const createCardDto: CreateCardDto = {
 *   wordOrPhrase: 'house',
 *   transcription: 'haʊs',
 *   partOfSpeech: PartOfSpeech.NOUN,
 *   imageUrl: 'https://example.com/house.jpg',
 *   audioUrl: 'https://example.com/house.mp3',
 *   difficulty: CardDifficulty.MEDIUM,
 *   contentType: ContentType.TEXT
 * };
 * ```
 */
export class CreateCardDto {
  @ApiProperty({
    description: 'Слово или фраза для изучения',
    example: 'hello',
  })
  @IsString()
  wordOrPhrase!: string;

  @ApiPropertyOptional({
    description: 'ID языка карточки',
    example: 'clx1234567890abcdef',
  })
  @IsOptional()
  @IsString()
  languageId?: string;

  @ApiPropertyOptional({
    description: 'Часть речи',
    enum: PartOfSpeech,
    example: PartOfSpeech.NOUN,
  })
  @IsOptional()
  @IsEnum(PartOfSpeech)
  partOfSpeech?: PartOfSpeech;

  @ApiPropertyOptional({
    description: 'Фонетическая транскрипция',
    example: 'həˈloʊ',
  })
  @IsOptional()
  @IsString()
  transcription?: string;

  @ApiPropertyOptional({
    description: 'URL изображения для карточки',
    example: 'https://example.com/image.jpg',
  })
  @IsOptional()
  @IsString()
  imageUrl?: string;

  @ApiPropertyOptional({
    description: 'URL аудио файла с произношением',
    example: 'https://example.com/audio.mp3',
  })
  @IsOptional()
  @IsString()
  audioUrl?: string;

  @ApiPropertyOptional({
    description: 'Глобальная карточка (доступна всем пользователям)',
    default: true,
  })
  @IsOptional()
  @IsBoolean()
  isGlobal?: boolean;

  @ApiPropertyOptional({
    description: 'Сложность карточки',
    enum: CardDifficulty,
    example: CardDifficulty.EASY,
  })
  @IsOptional()
  @IsEnum(CardDifficulty)
  difficulty?: CardDifficulty;

  @ApiPropertyOptional({
    description: 'Тип контента карточки',
    enum: ContentType,
    example: ContentType.TEXT,
  })
  @IsOptional()
  @IsEnum(ContentType)
  contentType?: ContentType;

  @ApiPropertyOptional({
    description: 'Статус контента карточки',
    enum: ContentStatus,
    example: ContentStatus.DRAFT,
  })
  @IsOptional()
  @IsEnum(ContentStatus)
  contentStatus?: ContentStatus;

  @ApiPropertyOptional({
    description: 'Провайдер источника данных',
    example: 'dictionary-api',
  })
  @IsOptional()
  @IsString()
  sourceProvider?: string;

  @ApiPropertyOptional({
    description: 'ID в источнике данных',
    example: 'hello',
  })
  @IsOptional()
  @IsString()
  sourceId?: string;
}
