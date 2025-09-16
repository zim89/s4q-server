export const LanguageSwaggerSchemas = {
  // === Базовые поля ===
  id: {
    description: 'Уникальный идентификатор языка',
    example: 'cmfier0t20000p4hnsruuys01',
  },
  createdAt: {
    description: 'Дата и время создания языка',
    example: '2025-01-13T15:15:11.702Z',
  },

  // === Основные поля ===
  name: {
    description: 'Название языка',
    example: 'English',
  },
  code: {
    description: 'Код языка по ISO 639-1',
    example: 'en',
  },
  isEnabled: {
    description: 'Активен ли язык в системе',
    example: true,
  },
} as const;
