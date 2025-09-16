import { ContentStatus, LanguageLevel } from '@prisma/client';

export const SetSwaggerSchemas = {
  // === Базовые поля ===
  id: {
    description: 'Уникальный идентификатор набора',
    example: 'cmfier0t20000p4hnsruuys01',
  },
  createdAt: {
    description: 'Дата и время создания набора',
    example: '2025-01-13T15:15:11.702Z',
  },
  updatedAt: {
    description: 'Дата и время последнего обновления набора',
    example: '2025-01-13T15:15:11.702Z',
  },

  // === Основные поля ===
  name: {
    description: 'Название набора',
    example: 'Basic English Vocabulary',
  },
  slug: {
    description: 'URL-дружественный идентификатор',
    example: 'basic-english-vocabulary',
  },
  description: {
    description: 'Описание набора',
    example: 'A collection of essential English words for beginners',
  },

  // === Метаданные ===
  isBase: {
    description: 'Базовый набор (системный)',
    example: false,
  },
  isPublic: {
    description: 'Публичный набор (доступен всем)',
    example: true,
  },
  level: {
    description: 'Уровень сложности (A1, A2, B1, B2, C1, C2)',
    enum: LanguageLevel,
    example: 'A1',
  },
  contentStatus: {
    description: 'Статус контента',
    enum: ContentStatus,
    example: 'PUBLISHED',
  },

  // === Связи ===
  userId: {
    description: 'ID пользователя, создавшего набор',
    example: 'cmfier0t20000p4hnsruuys02',
  },
  languageId: {
    description: 'ID языка набора',
    example: 'cmfier0t20000p4hnsruuys03',
  },
  originalSetId: {
    description: 'ID оригинального набора (для копий)',
    example: 'cmfier0t20000p4hnsruuys04',
  },

  // === Поля для карточек в сете ===
  existingCardId: {
    description: 'ID существующей карточки (если карточка уже есть в БД)',
    example: 'clx1234567890abcdef',
  },
  newCard: {
    description: 'Данные новой карточки (если карточка не существует)',
  },
} as const;
