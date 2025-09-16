export const AuthSwaggerSchemas = {
  // === Регистрация ===
  email: {
    description: 'Email пользователя',
    example: 'user@example.com',
  },
  password: {
    description: 'Пароль пользователя',
    example: 'SecurePassword123!',
  },
  firstName: {
    description: 'Имя пользователя',
    example: 'John',
  },
  lastName: {
    description: 'Фамилия пользователя',
    example: 'Doe',
  },

  // === Вход ===
  loginEmail: {
    description: 'Email для входа',
    example: 'user@example.com',
  },
  loginPassword: {
    description: 'Пароль для входа',
    example: 'SecurePassword123!',
  },

  // === Ответы аутентификации ===
  accessToken: {
    description: 'JWT токен доступа',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  },
  refreshToken: {
    description: 'Токен обновления',
    example: 'refresh_token_123456789',
  },
  expiresIn: {
    description: 'Время жизни токена в секундах',
    example: 3600,
  },
  tokenType: {
    description: 'Тип токена',
    example: 'Bearer',
  },

  // === Пользователь в ответе ===
  user: {
    description: 'Данные пользователя',
    example: {
      id: 'cmfier0t20000p4hnsruuys01',
      email: 'user@example.com',
      firstName: 'John',
      lastName: 'Doe',
    },
  },
} as const;
