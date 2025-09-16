export const CommonSwaggerSchemas = {
  // === Пагинация ===
  page: {
    description: 'Номер страницы',
    example: 1,
    minimum: 1,
  },
  limit: {
    description: 'Количество элементов на странице',
    example: 10,
    minimum: 1,
    maximum: 100,
  },
  total: {
    description: 'Общее количество элементов',
    example: 150,
  },
  totalPages: {
    description: 'Общее количество страниц',
    example: 15,
  },
  hasNext: {
    description: 'Есть ли следующая страница',
    example: true,
  },
  hasPrev: {
    description: 'Есть ли предыдущая страница',
    example: false,
  },

  // === Сортировка ===
  sort: {
    description: 'Поле для сортировки',
    example: 'createdAt',
  },
  order: {
    description: 'Порядок сортировки',
    example: 'desc',
    enum: ['asc', 'desc'],
  },

  // === Поиск ===
  search: {
    description: 'Поисковый запрос',
    example: 'hello world',
  },

  // === ID поля ===
  id: {
    description: 'Уникальный идентификатор',
    example: 'cmfier0t20000p4hnsruuys01',
  },

  // === Даты ===
  createdAt: {
    description: 'Дата и время создания',
    example: '2025-01-13T15:15:11.702Z',
  },
  updatedAt: {
    description: 'Дата и время последнего обновления',
    example: '2025-01-13T15:15:11.702Z',
  },

  // === Булевы значения ===
  isActive: {
    description: 'Активен ли объект',
    example: true,
  },
  isEnabled: {
    description: 'Включен ли объект',
    example: true,
  },
  isGlobal: {
    description: 'Глобальный объект',
    example: true,
  },
  isPublic: {
    description: 'Публичный объект',
    example: true,
  },

  // === Строковые поля ===
  name: {
    description: 'Название',
    example: 'Example Name',
  },
  description: {
    description: 'Описание',
    example: 'Example description',
  },
  slug: {
    description: 'URL-дружественный идентификатор',
    example: 'example-slug',
  },
  email: {
    description: 'Email адрес',
    example: 'user@example.com',
  },

  // === Числовые поля ===
  count: {
    description: 'Количество',
    example: 42,
  },
  totalCount: {
    description: 'Общее количество',
    example: 150,
  },
} as const;
