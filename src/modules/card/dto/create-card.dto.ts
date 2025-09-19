import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  CardDifficulty,
  ContentStatus,
  ContentType,
  LanguageLevel,
  PartOfSpeech,
  VerbType,
} from '@prisma/client';
import {
  IsBoolean,
  IsEnum,
  IsOptional,
  IsString,
  Validate,
} from 'class-validator';
import { IrregularVerbValidator } from '../../irregular-verb/validators/irregular-verb.validator';
import { CardSwaggerSchemas } from '../schemas/card-swagger.schema';

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
 *   example: '<p>I live in a big house.</p><p>The house has three rooms.</p>', // пример использования
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
  @ApiProperty(CardSwaggerSchemas.term)
  @IsString()
  term!: string;

  // TRANSLATE FIELD
  @ApiPropertyOptional(CardSwaggerSchemas.translate)
  @IsOptional()
  @IsString()
  translate?: string;

  // DEFINITION FIELD
  @ApiPropertyOptional(CardSwaggerSchemas.definition)
  @IsOptional()
  @IsString()
  definition?: string;

  // EXAMPLE FIELD
  @ApiPropertyOptional(CardSwaggerSchemas.example)
  @IsOptional()
  @IsString()
  example?: string;

  // LANGUAGE ID FIELD
  @ApiPropertyOptional(CardSwaggerSchemas.languageId)
  @IsOptional()
  @IsString()
  languageId?: string;

  // PART OF SPEECH FIELD
  @ApiPropertyOptional(CardSwaggerSchemas.partOfSpeech)
  @IsOptional()
  @IsEnum(PartOfSpeech)
  partOfSpeech?: PartOfSpeech;

  // TRANSCRIPTION FIELD
  @ApiPropertyOptional(CardSwaggerSchemas.transcription)
  @IsOptional()
  @IsString()
  transcription?: string;

  // IMAGE URL FIELD
  @ApiPropertyOptional(CardSwaggerSchemas.imageUrl)
  @IsOptional()
  @IsString()
  imageUrl?: string;

  // AUDIO URL FIELD
  @ApiPropertyOptional(CardSwaggerSchemas.audioUrl)
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
  @ApiPropertyOptional(CardSwaggerSchemas.grammaticalGender)
  @IsOptional()
  @IsString()
  grammaticalGender?: string;

  // DIFFICULTY FIELD
  @ApiPropertyOptional(CardSwaggerSchemas.difficulty)
  @IsOptional()
  @IsEnum(CardDifficulty)
  difficulty?: CardDifficulty;

  // CONTENT TYPE FIELD
  @ApiPropertyOptional(CardSwaggerSchemas.contentType)
  @IsOptional()
  @IsEnum(ContentType)
  contentType?: ContentType;

  @ApiPropertyOptional(CardSwaggerSchemas.contentStatus)
  @IsOptional()
  @IsEnum(ContentStatus)
  contentStatus?: ContentStatus;

  @ApiPropertyOptional(CardSwaggerSchemas.level)
  @IsOptional()
  @IsEnum(LanguageLevel)
  level?: LanguageLevel;

  @ApiPropertyOptional(CardSwaggerSchemas.ruleId)
  @IsOptional()
  @IsString()
  ruleId?: string;

  @ApiPropertyOptional(CardSwaggerSchemas.verbType)
  @IsOptional()
  @IsEnum(VerbType)
  verbType?: VerbType;

  @ApiPropertyOptional(CardSwaggerSchemas.irregularVerbId)
  @IsOptional()
  @IsString()
  irregularVerbId?: string;

  @ApiPropertyOptional(CardSwaggerSchemas.sourceProvider)
  @IsOptional()
  @IsString()
  sourceProvider?: string;

  @ApiPropertyOptional(CardSwaggerSchemas.sourceId)
  @IsOptional()
  @IsString()
  sourceId?: string;

  // PAST SIMPLE FIELD
  @ApiPropertyOptional({
    description: 'Past Simple форма глагола (только для IRREGULAR глаголов)',
    example: 'went',
    type: String,
  })
  @IsOptional()
  @IsString()
  pastSimple?: string;

  // PAST PARTICIPLE FIELD
  @ApiPropertyOptional({
    description:
      'Past Participle форма глагола (только для IRREGULAR глаголов)',
    example: 'gone',
    type: String,
  })
  @IsOptional()
  @IsString()
  pastParticiple?: string;

  // Валидация для неправильных глаголов
  @Validate(IrregularVerbValidator)
  _?: unknown;
}
