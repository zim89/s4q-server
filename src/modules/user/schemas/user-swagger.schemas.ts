import { StudyMode, UserRole } from '@prisma/client';

export const UserSwaggerSchemas = {
  // === Базовые поля ===
  id: {
    description: 'Уникальный идентификатор пользователя',
    example: 'cmfier0t20000p4hnsruuys01',
  },
  createdAt: {
    description: 'Дата и время создания пользователя',
    example: '2025-01-13T15:15:11.702Z',
  },
  updatedAt: {
    description: 'Дата и время последнего обновления пользователя',
    example: '2025-01-13T15:15:11.702Z',
  },

  // === Основные поля ===
  email: {
    description: 'Email пользователя',
    example: 'user@example.com',
  },
  emailVerified: {
    description: 'Подтвержден ли email',
    example: true,
  },
  passwordHash: {
    description: 'Хеш пароля',
    example: '$2b$10$...',
  },
  firstName: {
    description: 'Имя пользователя',
    example: 'John',
  },
  lastName: {
    description: 'Фамилия пользователя',
    example: 'Doe',
  },
  avatarUrl: {
    description: 'URL аватара пользователя',
    example: 'https://example.com/avatar.jpg',
  },
  isActive: {
    description: 'Активен ли пользователь',
    example: true,
  },
  lastLoginAt: {
    description: 'Дата и время последнего входа',
    example: '2025-01-13T15:15:11.702Z',
  },

  // === Роли и права ===
  rights: {
    description: 'Права пользователя',
    enum: UserRole,
    example: [UserRole.USER],
  },

  // === Настройки ===
  userSettings: {
    description: 'Настройки пользователя (JSON)',
    example: { theme: 'dark', language: 'en' },
  },
  preferredStudyMode: {
    description: 'Предпочитаемый режим изучения',
    enum: StudyMode,
    example: 'FLASHCARD',
  },

  // === OAuth ===
  googleId: {
    description: 'Google ID пользователя',
    example: 'google_123456789',
  },
} as const;
