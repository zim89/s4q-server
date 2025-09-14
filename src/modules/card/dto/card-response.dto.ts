import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  CardDifficulty,
  ContentStatus,
  ContentType,
  LanguageLevel,
  PartOfSpeech,
  VerbType,
} from '@prisma/client';

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
  @ApiProperty({
    description: 'Уникальный идентификатор карточки',
    example: 'cmfier0t20000p4hnsruuys01',
  })
  id!: string;

  @ApiProperty({
    description: 'Дата и время создания карточки',
    example: '2025-01-13T15:15:11.702Z',
  })
  createdAt!: Date;

  @ApiProperty({
    description: 'Дата и время последнего обновления карточки',
    example: '2025-01-13T15:15:11.702Z',
  })
  updatedAt!: Date;

  @ApiProperty({
    description: 'Слово или фраза для изучения',
    example: 'beautiful',
  })
  term!: string;

  @ApiProperty({
    description: 'URL-дружественный идентификатор',
    example: 'beautiful',
  })
  slug!: string;

  @ApiPropertyOptional({
    description: 'Перевод термина на другой язык',
    example: 'красивый',
  })
  translate?: string;

  @ApiPropertyOptional({
    description: 'Определение (HTML из WYSIWYG редактора)',
    example: 'Pleasing to the senses or mind aesthetically',
  })
  definition?: string;

  @ApiPropertyOptional({
    description: 'Часть речи',
    enum: PartOfSpeech,
    example: PartOfSpeech.ADJECTIVE,
  })
  partOfSpeech?: PartOfSpeech;

  @ApiPropertyOptional({
    description: 'Фонетическая транскрипция',
    example: 'ˈbjuːtɪfəl',
  })
  transcription?: string;

  @ApiPropertyOptional({
    description: 'URL изображения для карточки',
    example: 'https://example.com/image.jpg',
  })
  imageUrl?: string;

  @ApiPropertyOptional({
    description: 'URL аудио файла с произношением',
    example: 'https://example.com/audio.mp3',
  })
  audioUrl?: string;

  @ApiProperty({
    description: 'Глобальная карточка (доступна всем пользователям)',
    example: true,
  })
  isGlobal!: boolean;

  @ApiPropertyOptional({
    description: 'Грамматический род (для немецкого)',
    example: 'MASCULINE',
  })
  grammaticalGender?: string;

  @ApiPropertyOptional({
    description: 'Сложность карточки',
    enum: CardDifficulty,
    example: CardDifficulty.EASY,
  })
  difficulty?: CardDifficulty;

  @ApiPropertyOptional({
    description: 'Тип контента карточки',
    enum: ContentType,
    example: ContentType.LANGUAGE,
  })
  contentType?: ContentType;

  @ApiPropertyOptional({
    description: 'Статус контента карточки',
    enum: ContentStatus,
    example: ContentStatus.PUBLISHED,
  })
  contentStatus?: ContentStatus;

  @ApiPropertyOptional({
    description: 'ID пользователя, создавшего карточку',
    example: 'cmfier0t20000p4hnsruuys02',
  })
  userId?: string;

  @ApiPropertyOptional({
    description: 'ID языка карточки',
    example: 'cmfier0t20000p4hnsruuys03',
  })
  languageId?: string;

  @ApiPropertyOptional({
    description: 'Уровень сложности',
    enum: LanguageLevel,
    example: LanguageLevel.A1,
  })
  level?: LanguageLevel;

  @ApiPropertyOptional({
    description: 'ID грамматического правила',
    example: 'cmfier0t20000p4hnsruuys04',
  })
  ruleId?: string;

  @ApiPropertyOptional({
    description: 'Тип глагола',
    enum: VerbType,
    example: VerbType.REGULAR,
  })
  verbType?: VerbType;

  @ApiPropertyOptional({
    description: 'ID неправильного глагола',
    example: 'cmfier0t20000p4hnsruuys05',
  })
  irregularVerbId?: string;

  @ApiPropertyOptional({
    description: 'Провайдер источника данных',
    example: 'dictionary-api',
  })
  sourceProvider?: string;

  @ApiPropertyOptional({
    description: 'ID в источнике данных',
    example: 'dict-12345',
  })
  sourceId?: string;

  @ApiProperty({
    description: 'Количество добавлений карточки в наборы для изучения',
    example: 15,
  })
  studyCount!: number;

  @ApiProperty({
    description: 'Количество просмотров карточки',
    example: 42,
  })
  viewCount!: number;

  @ApiPropertyOptional({
    description: 'Дата и время последнего использования',
    example: '2025-01-13T15:15:11.702Z',
  })
  lastUsedAt?: Date;
}
