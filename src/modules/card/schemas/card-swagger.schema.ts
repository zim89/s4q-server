import {
  CardDifficulty,
  ContentStatus,
  ContentType,
  LanguageLevel,
  PartOfSpeech,
  VerbType,
} from '@prisma/client';

export const CardSwaggerSchemas = {
  // === Базовые поля ===
  id: {
    description: 'Уникальный идентификатор карточки',
    example: 'cmfier0t20000p4hnsruuys01',
  },
  createdAt: {
    description: 'Дата и время создания карточки',
    example: '2025-01-13T15:15:11.702Z',
  },
  updatedAt: {
    description: 'Дата и время последнего обновления карточки',
    example: '2025-01-13T15:15:11.702Z',
  },

  // === Основные поля ===
  term: {
    description: 'Слово или фраза для изучения',
    example: 'beautiful',
  },
  slug: {
    description: 'URL-дружественный идентификатор',
    example: 'beautiful',
  },
  translate: {
    description: 'Перевод термина на другой язык',
    example: 'красивый',
  },
  definition: {
    description: 'Определение (HTML из WYSIWYG редактора)',
    example: 'Pleasing to the senses or mind aesthetically',
  },
  example: {
    description: 'Пример использования (HTML из WYSIWYG редактора)',
    example:
      'The sunset is beautiful.<br>The beautiful garden is full of flowers.',
  },
  transcription: {
    description: 'Фонетическая транскрипция',
    example: 'ˈbjuːtɪfəl',
  },

  // === Медиа поля ===
  imageUrl: {
    description: 'URL изображения для карточки',
    example: 'https://example.com/image.jpg',
  },
  audioUrl: {
    description: 'URL аудио файла с произношением',
    example: 'https://example.com/audio.mp3',
  },

  // === Метаданные ===
  isGlobal: {
    description: 'Глобальная карточка (доступна всем пользователям)',
    example: true,
  },
  grammaticalGender: {
    description:
      'Грамматический род (для немецкого: MASCULINE, FEMININE, NEUTER)',
    example: 'NEUTER',
  },

  // === Enums ===
  partOfSpeech: {
    description: 'Часть речи',
    enum: PartOfSpeech,
    example: 'ADJECTIVE',
  },
  difficulty: {
    description: 'Сложность карточки',
    enum: CardDifficulty,
    example: 'EASY',
  },
  contentType: {
    description: 'Тип контента карточки',
    enum: ContentType,
    example: 'TEXT',
  },
  contentStatus: {
    description: 'Статус контента карточки',
    enum: ContentStatus,
    example: 'PUBLISHED',
  },
  level: {
    description: 'Уровень сложности (A1, A2, B1, B2, C1, C2)',
    enum: LanguageLevel,
    example: 'A1',
  },
  verbType: {
    description: 'Тип глагола (только для partOfSpeech = VERB)',
    enum: VerbType,
    example: 'REGULAR',
  },

  // === Связи ===
  userId: {
    description: 'ID пользователя, создавшего карточку',
    example: 'cmfier0t20000p4hnsruuys02',
  },
  languageId: {
    description: 'ID языка карточки',
    example: 'cmfier0t20000p4hnsruuys03',
  },
  ruleId: {
    description: 'ID грамматического правила',
    example: 'cmfier0t20000p4hnsruuys04',
  },
  irregularVerbId: {
    description: 'ID неправильного глагола',
    example: 'cmfier0t20000p4hnsruuys05',
  },

  // === Источник ===
  sourceProvider: {
    description: 'Провайдер источника данных',
    example: 'dictionary-api',
  },
  sourceId: {
    description: 'ID в источнике данных',
    example: 'dict_12345',
  },

  // === Статистика ===
  studyCount: {
    description: 'Количество добавлений карточки в наборы для изучения',
    example: 15,
  },
  viewCount: {
    description: 'Количество просмотров карточки',
    example: 42,
  },
  lastUsedAt: {
    description: 'Дата и время последнего использования',
    example: '2025-01-13T15:15:11.702Z',
  },
} as const;
