# Auth Module

Модуль аутентификации и авторизации для приложения.

## 📁 Структура

```
src/api/auth/
├── auth.controller.ts           # Контроллер для HTTP endpoints
├── auth.service.ts              # Основная бизнес-логика аутентификации
├── auth.module.ts               # Модуль NestJS
├── refresh-token.service.ts     # Управление refresh токенами
├── dto/                         # Data Transfer Objects
│   ├── register.dto.ts          # DTO для регистрации
│   ├── login.dto.ts             # DTO для входа
│   ├── auth-response.dto.ts     # DTO для ответов аутентификации
│   └── index.ts                 # Централизованный экспорт
├── decorators/                  # Кастомные декораторы
│   ├── auth.decorator.ts        # Декоратор для защиты endpoints
│   ├── roles.decorator.ts       # Декоратор для ролей
│   ├── user.decorator.ts        # Декоратор для получения пользователя
│   ├── auth-swagger.decorator.ts # Swagger документация
│   └── index.ts                 # Централизованный экспорт
├── guards/                      # Guards для аутентификации
│   ├── jwt.guard.ts             # JWT guard
│   ├── roles.guard.ts           # Guard для проверки ролей
│   └── index.ts                 # Централизованный экспорт
├── strategies/                  # Passport стратегии
│   ├── jwt.strategy.ts          # JWT стратегия
│   └── index.ts                 # Централизованный экспорт
├── types/                       # Типы TypeScript
│   └── auth.types.ts            # Типы для аутентификации
└── README.md                    # Документация модуля
```

## 🔧 Основные компоненты

### AuthController

**Назначение**: Обработка HTTP запросов для аутентификации

**Endpoints:**

- `POST /v1/auth/register` - Регистрация нового пользователя
- `POST /v2/auth/login` - Вход в систему
- `POST /v1/auth/refresh` - Обновление access токена
- `POST /v1/auth/logout` - Выход из системы

**Использование:**

```typescript
import { AuthController } from 'src/api/auth/auth.controller';

// Автоматически регистрируется в AuthModule
```

### AuthService

**Назначение**: Основная бизнес-логика аутентификации

**Методы:**

- `register()` - Регистрация пользователя
- `login()` - Аутентификация пользователя
- `refresh()` - Обновление токенов
- `logout()` - Выход из системы
- `validate()` - Валидация пользователя

**Использование:**

```typescript
import { AuthService } from 'src/api/auth/auth.service';

@Injectable()
export class SomeService {
  constructor(private authService: AuthService) {}

  async someMethod() {
    // Использование методов аутентификации
  }
}
```

### RefreshTokenService

**Назначение**: Управление refresh токенами и сессиями

**Функциональность:**

- Добавление refresh токенов в HTTP-only cookies
- Валидация refresh токенов
- Инвалидация токенов при выходе
- Управление сессиями пользователей

## 🔐 Аутентификация и авторизация

### JWT Tokens

**Access Token:**

- Короткий срок жизни (15 минут)
- Передается в заголовке `Authorization: Bearer <token>`
- Содержит ID пользователя и роли

**Refresh Token:**

- Долгий срок жизни (7 дней)
- Хранится в HTTP-only cookie
- Используется для получения нового access токена

### Роли и права доступа

**Доступные роли:**

- `USER` - Обычный пользователь
- `MODERATOR` - Модератор
- `ADMIN` - Администратор

**Использование:**

```typescript
import { Auth } from 'src/api/auth/decorators';

@Get('admin')
@Auth(Role.ADMIN) // Только для администраторов
getAdminData() {
  return 'Admin only data';
}

@Get('moderator')
@Auth([Role.MODERATOR, Role.ADMIN]) // Для модераторов и администраторов
getModeratorData() {
  return 'Moderator data';
}
```

## 📝 DTOs

### RegisterDto

**Назначение**: Данные для регистрации пользователя

**Поля:**

- `firstName` - Имя пользователя (строка, максимум 50 символов)
- `lastName` - Фамилия пользователя (строка, максимум 50 символов)
- `email` - Email адрес (валидный email)
- `password` - Пароль (6-20 символов)

**Пример:**

```typescript
const registerDto: RegisterDto = {
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@example.com',
  password: 'securePassword123',
};
```

### LoginDto

**Назначение**: Данные для входа в систему

**Поля:**

- `email` - Email адрес (валидный email)
- `password` - Пароль

**Пример:**

```typescript
const loginDto: LoginDto = {
  email: 'john.doe@example.com',
  password: 'securePassword123',
};
```

### AuthResponseDto

**Назначение**: Ответ на успешную аутентификацию

**Поля:**

- `accessToken` - JWT access токен
- `user` - Информация о пользователе

**Пример:**

```typescript
const response: AuthResponseDto = {
  accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  user: {
    id: 'cuid_123',
    email: 'john.doe@example.com',
    firstName: 'John',
    lastName: 'Doe',
    avatarUrl: null,
    rights: ['USER'],
    isActive: true,
    lastLogin: '2024-01-15T10:30:00.000Z',
    createdAt: '2024-01-01T00:00:00.000Z',
  },
};
```

## 🛡️ Guards и Decorators

### JwtGuard

**Назначение**: Проверка JWT токенов

**Использование:**

```typescript
import { JwtGuard } from 'src/api/auth/guards';

@UseGuards(JwtGuard)
@Get('protected')
getProtectedData() {
  return 'This endpoint requires authentication';
}
```

### RolesGuard

**Назначение**: Проверка ролей пользователя

**Использование:**

```typescript
import { RolesGuard } from 'src/api/auth/guards';

@RequireRoles(Role.ADMIN)
@UseGuards(JwtGuard, RolesGuard)
@Get('admin')
getAdminData() {
  return 'Admin only data';
}
```

### Auth Decorator

**Назначение**: Комбинированный декоратор для защиты endpoints

**Использование:**

```typescript
import { Auth } from 'src/api/auth/decorators';

@Get('profile')
@Auth() // По умолчанию USER роль
getProfile() {
  return 'Protected endpoint';
}

@Get('admin')
@Auth(Role.ADMIN) // Только для администраторов
getAdminData() {
  return 'Admin only';
}
```

### CurrentUser Decorator

**Назначение**: Получение текущего пользователя

**Использование:**

```typescript
import { CurrentUser } from 'src/api/auth/decorators';

@Get('profile')
@Auth()
getProfile(@CurrentUser() user: AuthenticatedUser) {
  return user;
}

@Get('profile')
@Auth()
getProfile(@CurrentUser('id') userId: string) {
  return userId;
}
```

## 🔄 Интеграция

### Подключение модуля

```typescript
// app.module.ts
import { AuthModule } from 'src/api/auth/auth.module';

@Module({
  imports: [
    AuthModule,
    // другие модули
  ],
})
export class AppModule {}
```

### Использование в других модулях

```typescript
// some.module.ts
import { AuthModule } from 'src/api/auth/auth.module';

@Module({
  imports: [AuthModule],
  // ...
})
export class SomeModule {}
```

## 🔧 Конфигурация

### Environment Variables

**Обязательные переменные:**

- `JWT_SECRET` - Секретный ключ для JWT
- `JWT_ACCESS_TOKEN_TTL` - Время жизни access токена
- `JWT_REFRESH_TOKEN_TTL` - Время жизни refresh токена
- `COOKIE_DOMAIN` - Домен для cookies

**Пример .env:**

```env
JWT_SECRET=your-super-secret-key
JWT_ACCESS_TOKEN_TTL=15m
JWT_REFRESH_TOKEN_TTL=7d
COOKIE_DOMAIN=localhost
```

## 📋 Примеры использования

### Полный цикл аутентификации

```typescript
// 1. Регистрация
const registerResponse = await fetch('/v1/auth/register', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
    password: 'password123',
  }),
});

// 2. Вход
const loginResponse = await fetch('/v2/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'john@example.com',
    password: 'password123',
  }),
});

// 3. Использование защищенного endpoint
const protectedResponse = await fetch('/api/protected', {
  headers: {
    Authorization: `Bearer ${loginResponse.accessToken}`,
  },
});

// 4. Обновление токена
const refreshResponse = await fetch('/v1/auth/refresh', {
  method: 'POST',
  // refresh token автоматически отправляется в cookies
});

// 5. Выход
await fetch('/v1/auth/logout', {
  method: 'POST',
  headers: {
    Authorization: `Bearer ${accessToken}`,
  },
});
```

## ⚠️ Важные моменты

### Безопасность

- Все пароли хешируются с помощью Argon2
- Refresh токены хранятся в HTTP-only cookies
- Access токены имеют короткий срок жизни
- Проверяется активность пользователя

### Производительность

- Используется кэширование для проверки токенов
- Оптимизированные запросы к базе данных
- Минимальное количество обращений к БД

### Масштабируемость

- Stateless аутентификация (JWT)
- Возможность горизонтального масштабирования
- Поддержка множественных сессий
