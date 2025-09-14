import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  CardDifficulty,
  ContentStatus,
  ContentType,
  LanguageLevel,
  PartOfSpeech,
  VerbType,
} from '@prisma/client';
import { IsBoolean, IsEnum, IsOptional, IsString } from 'class-validator';

/**
 * DTO для создания новой карточки
 *
 * Используется для создания карточек с английскими словами и фразами.
 * Поддерживает различные типы контента: текст, изображения, аудио.
 * Включает все поля модели Card для полного контроля над созданием карточки.
 *
 * @example
 * ```typescript
 * // Полный пример со всеми полями
 * // ОБЯЗАТЕЛЬНЫЕ поля (без ! не скомпилируется):
 * // - term: string
 *
 * // ОПЦИОНАЛЬНЫЕ поля (все остальные):
 * const createCardDto: CreateCardDto = {
 *   // 🔴 ОБЯЗАТЕЛЬНОЕ - слово или фраза для изучения
 *   term: 'house',
 *   translate: 'дом', // перевод на другой язык
 *   definition: '<p>A building for human habitation</p>', // определение
 *
 *   // 🟡 ОПЦИОНАЛЬНЫЕ - базовая информация
 *   languageId: 'clx1234567890abcdef',        // ID языка
 *   partOfSpeech: PartOfSpeech.NOUN,          // часть речи
 *   transcription: 'haʊs',                    // фонетическая транскрипция
 *
 *   // 🟡 ОПЦИОНАЛЬНЫЕ - медиа контент
 *   imageUrl: 'https://example.com/house.jpg', // URL изображения
 *   audioUrl: 'https://example.com/house.mp3', // URL аудио файла
 *
 *   // 🟡 ОПЦИОНАЛЬНЫЕ - настройки карточки
 *   isGlobal: true,                           // глобальная карточка (по умолчанию true)
 *   grammaticalGender: 'NEUTER',              // грамматический род (для немецкого)
 *   difficulty: CardDifficulty.EASY,          // сложность карточки
 *   contentType: ContentType.LANGUAGE,        // тип контента
 *   contentStatus: ContentStatus.DRAFT,       // статус контента (по умолчанию DRAFT)
 *   level: LanguageLevel.A1,                  // уровень сложности (A1-C2)
 *
 *   // 🟡 ОПЦИОНАЛЬНЫЕ - связи с другими моделями
 *   ruleId: 'clx1234567890abcdef',            // ID грамматического правила
 *   verbType: VerbType.REGULAR,               // тип глагола (только для VERB)
 *   irregularVerbId: 'clx1234567890abcdef',   // ID неправильного глагола
 *
 *   // 🟡 ОПЦИОНАЛЬНЫЕ - источник данных
 *   sourceProvider: 'dictionary-api',         // провайдер источника
 *   sourceId: 'house'                         // ID в источнике данных
 * };
 * ```
 */
export class CreateCardDto {
  // TERM FIELD
  @ApiProperty({
    description: 'Слово или фраза для изучения',
    example: 'hello',
  })
  @IsString()
  term!: string;

  // TRANSLATE FIELD
  @ApiPropertyOptional({
    description: 'Перевод термина на другой язык (необязательное поле)',
    example: 'привет',
  })
  @IsOptional()
  @IsString()
  translate?: string;

  // DEFINITION FIELD
  @ApiPropertyOptional({
    description: 'Определение (HTML из WYSIWYG редактора)',
    example: '<p>A greeting used when meeting someone</p>',
  })
  @IsOptional()
  @IsString()
  definition?: string;

  // LANGUAGE ID FIELD
  @ApiPropertyOptional({
    description: 'ID языка карточки',
    example: 'clx1234567890abcdef',
  })
  @IsOptional()
  @IsString()
  languageId?: string;

  // PART OF SPEECH FIELD
  @ApiPropertyOptional({
    description: 'Часть речи',
    enum: PartOfSpeech,
    example: PartOfSpeech.NOUN,
  })
  @IsOptional()
  @IsEnum(PartOfSpeech)
  partOfSpeech?: PartOfSpeech;

  // TRANSCRIPTION FIELD
  @ApiPropertyOptional({
    description:
      'Фонетическая транскрипция. Если не указана, будет автоматически получена из словаря (только для отдельных слов). Поддерживает обычные слова, составные слова с дефисом, слова с апострофом и сокращения.',
    example: 'həˈloʊ',
  })
  @IsOptional()
  @IsString()
  transcription?: string;

  // IMAGE URL FIELD
  @ApiPropertyOptional({
    description: 'URL изображения для карточки',
    example: 'https://example.com/image.jpg',
  })
  @IsOptional()
  @IsString()
  imageUrl?: string;

  // AUDIO URL FIELD
  @ApiPropertyOptional({
    description: 'URL аудио файла с произношением',
    example: 'https://example.com/audio.mp3',
  })
  @IsOptional()
  @IsString()
  audioUrl?: string;

  // IS GLOBAL FIELD
  @ApiPropertyOptional({
    description: 'Глобальная карточка (доступна всем пользователям)',
    default: true,
  })
  @IsOptional()
  @IsBoolean()
  isGlobal?: boolean;

  // GRAMMATICAL GENDER FIELD
  @ApiPropertyOptional({
    description:
      'Грамматический род (для немецкого: MASCULINE, FEMININE, NEUTER)',
    example: 'MASCULINE',
  })
  @IsOptional()
  @IsString()
  grammaticalGender?: string;

  // DIFFICULTY FIELD
  @ApiPropertyOptional({
    description: 'Сложность карточки',
    enum: CardDifficulty,
    example: CardDifficulty.EASY,
  })
  @IsOptional()
  @IsEnum(CardDifficulty)
  difficulty?: CardDifficulty;

  // CONTENT TYPE FIELD
  @ApiPropertyOptional({
    description: 'Тип контента карточки',
    enum: ContentType,
    example: ContentType.LANGUAGE,
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
    description: 'Уровень сложности (A1, A2, B1, B2, C1, C2)',
    enum: LanguageLevel,
    example: LanguageLevel.A1,
  })
  @IsOptional()
  @IsEnum(LanguageLevel)
  level?: LanguageLevel;

  @ApiPropertyOptional({
    description: 'ID грамматического правила',
    example: 'clx1234567890abcdef',
  })
  @IsOptional()
  @IsString()
  ruleId?: string;

  @ApiPropertyOptional({
    description: 'Тип глагола (только для partOfSpeech = VERB)',
    enum: VerbType,
    example: VerbType.REGULAR,
  })
  @IsOptional()
  @IsEnum(VerbType)
  verbType?: VerbType;

  @ApiPropertyOptional({
    description: 'ID неправильного глагола',
    example: 'clx1234567890abcdef',
  })
  @IsOptional()
  @IsString()
  irregularVerbId?: string;

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
