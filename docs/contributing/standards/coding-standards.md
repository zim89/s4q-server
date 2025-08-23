# 📝 Стандарты кодирования

Документ описывает минимальные требования к качеству кода и стилю написания в проекте Space4Quiz API.

## 🎯 Общие принципы

### Читаемость

- Код должен быть самодокументируемым
- Имена переменных и функций должны быть описательными
- Избегать магических чисел и строк
- Комментарии только там, где логика неочевидна

### Консистентность

- Единый стиль во всем проекте
- Следование установленным соглашениям
- Использование общих паттернов

### Поддерживаемость

- DRY (Don't Repeat Yourself)
- SOLID принципы
- Модульная архитектура
- Четкое разделение ответственности

## 📛 Именование

### Переменные и функции

```typescript
// ✅ Хорошо
const userCount = 10;
const isAuthenticated = true;
const getUserById = (id: string) => {
  /* ... */
};
const validateEmail = (email: string) => {
  /* ... */
};

// ❌ Плохо
const uc = 10;
const auth = true;
const get = (id: string) => {
  /* ... */
};
const validate = (email: string) => {
  /* ... */
};
```

### Классы и интерфейсы

```typescript
// ✅ Хорошо
class UserService {
  /* ... */
}
interface CreateUserDto {
  /* ... */
}
enum UserRole {
  /* ... */
}

// ❌ Плохо
class userService {
  /* ... */
}
interface createUserDto {
  /* ... */
}
enum userRole {
  /* ... */
}
```

### Файлы и папки

```typescript
// ✅ Хорошо
user.service.ts;
auth.controller.ts;
create - user.dto.ts;
user.entity.ts;

// ❌ Плохо
UserService.ts;
authController.ts;
createUserDto.ts;
userEntity.ts;
```

## 🔧 Константы

### Примитивы - UPPER_SNAKE_CASE

```typescript
// ✅ Хорошо
export const APP_GUARD = 'APP_GUARD';
export const JWT_SECRET = 'your-secret-key';
export const MAX_FILE_SIZE = 10 * 1024 * 1024;
export const DEFAULT_PAGE_SIZE = 20;
export const API_VERSION = 'v1';

// ❌ Плохо
export const appGuard = 'APP_GUARD';
export const jwtSecret = 'your-secret-key';
export const maxFileSize = 10 * 1024 * 1024;
```

### Объекты и массивы - camelCase

```typescript
// ✅ Хорошо
export const cookieConfig = {
  httpOnly: true,
  secure: true,
  sameSite: 'strict',
};

export const allowedOrigins = [
  'http://localhost:3000',
  'https://app.example.com',
];

export const validationMessages = {
  required: 'Поле обязательно для заполнения',
  email: 'Неверный формат email',
  minLength: 'Минимальная длина {0} символов',
};

// ❌ Плохо
export const COOKIE_CONFIG = {
  /* ... */
};
export const ALLOWED_ORIGINS = [
  /* ... */
];
export const VALIDATION_MESSAGES = {
  /* ... */
};
```

### Типы для объектов констант

```typescript
// ✅ Хорошо - тип объявляется под константой
export const cookieConfig = {
  httpOnly: true,
  secure: true,
  sameSite: 'strict',
} as const;

/**
 * Тип для конфигурации cookies
 */
export type CookieConfig = typeof cookieConfig;

// ✅ Хорошо - для массивов
export const languagesData: LanguageData[] = [
  { code: 'en', name: 'English' },
  { code: 'de', name: 'German' },
];

/**
 * Тип для данных языков
 */
export type LanguageData = {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
  isActive: boolean;
  isDefault: boolean;
};
```

### Enum'ы - PascalCase

```typescript
// ✅ Хорошо
export enum UserRole {
  USER = 'USER',
  ADMIN = 'ADMIN',
  MODERATOR = 'MODERATOR',
}

export enum HttpStatus {
  OK = 200,
  CREATED = 201,
  BAD_REQUEST = 400,
}

// ❌ Плохо
export enum userRole {
  /* ... */
}
export enum HTTP_STATUS {
  /* ... */
}
```

## 📁 Структура файлов

### Импорты (порядок)

```typescript
// 1. Node.js модули
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

// 2. Внешние библиотеки
import { z } from 'zod';
import * as helmet from 'helmet';

// 3. Внутренние модули (относительные пути)
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';

// 4. Типы (в конце)
import type { Request, Response } from 'express';
```

### Экспорты

```typescript
// ✅ Хорошо - именованные экспорты
export class UserService {
  /* ... */
}
export interface UserDto {
  /* ... */
}
export const USER_CONSTANTS = {
  /* ... */
};

// ✅ Хорошо - default экспорт для главных классов
export default class AppModule {
  /* ... */
}

// ❌ Плохо - смешивание default и именованных экспортов
export default class UserService {
  /* ... */
}
export const userConstants = {
  /* ... */
};
```

## 🏗️ Архитектурные паттерны

### Dependency Injection

```typescript
// ✅ Хорошо
@Injectable()
export class UserService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly configService: ConfigService
  ) {}
}

// ❌ Плохо
@Injectable()
export class UserService {
  private prismaService = new PrismaService();
  private configService = new ConfigService();
}
```

### DTO и валидация

```typescript
// ✅ Хорошо
export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  firstName!: string;

  @IsEmail()
  email!: string;

  @IsString()
  @MinLength(6)
  @MaxLength(20)
  password!: string;
}

// ❌ Плохо
export class CreateUserDto {
  firstName: string;
  email: string;
  password: string;
}
```

### Обработка ошибок

```typescript
// ✅ Хорошо
async findUser(id: string) {
  const user = await this.prismaService.user.findUnique({
    where: { id },
  });

  if (!user) {
    throw new NotFoundException('Пользователь не найден');
  }

  return user;
}

// ❌ Плохо
async findUser(id: string) {
  const user = await this.prismaService.user.findUnique({
    where: { id },
  });
  return user; // может вернуть null
}
```

## 📝 Комментарии и документация

### JSDoc для публичных методов

```typescript
/**
 * Создает нового пользователя
 * @param dto - Данные для создания пользователя
 * @returns Созданный пользователь
 * @throws ConflictException если пользователь уже существует
 */
async createUser(dto: CreateUserDto): Promise<User> {
  // ...
}
```

### Inline комментарии

```typescript
// ✅ Хорошо - объясняет "почему", а не "что"
// Используем Argon2id для максимальной безопасности
const hashedPassword = await hash(password, { type: argon2id });

// ❌ Плохо - очевидные комментарии
const hashedPassword = await hash(password); // хешируем пароль
```

### TODO комментарии

```typescript
// ✅ Хорошо
// TODO: Добавить валидацию email через внешний сервис
// TODO: Реализовать кеширование пользователей
// FIXME: Исправить утечку памяти в production

// ❌ Плохо
// TODO: что-то сделать
// FIXME: баг
```

## 🔒 Безопасность

### Валидация входных данных

```typescript
// ✅ Хорошо
@Post()
async createUser(@Body() dto: CreateUserDto) {
  // DTO автоматически валидируется
  return this.userService.create(dto);
}

// ❌ Плохо
@Post()
async createUser(@Body() data: any) {
  // Нет валидации
  return this.userService.create(data);
}
```

### Безопасная работа с паролями

```typescript
// ✅ Хорошо
const hashedPassword = await hash(password, { type: argon2id });
const isValid = await verify(hashedPassword, password);

// ❌ Плохо
const hashedPassword = crypto.createHash('md5').update(password).digest('hex');
```

## 🧪 Тестирование

### Именование тестов

```typescript
// ✅ Хорошо
describe('UserService', () => {
  describe('createUser', () => {
    it('should create user with valid data', async () => {
      // ...
    });

    it('should throw error when user already exists', async () => {
      // ...
    });
  });
});

// ❌ Плохо
describe('UserService', () => {
  it('test1', async () => {
    // ...
  });
});
```

### Структура тестов (AAA)

```typescript
it('should create user with valid data', async () => {
  // Arrange - подготовка
  const dto = new CreateUserDto();
  dto.email = 'test@example.com';
  dto.password = 'password123';

  // Act - действие
  const result = await userService.createUser(dto);

  // Assert - проверка
  expect(result).toBeDefined();
  expect(result.email).toBe(dto.email);
});
```

## 📊 Метрики качества

### Сложность кода

- Максимальная сложность функции: 10
- Максимальная вложенность: 4 уровня
- Максимальная длина функции: 50 строк

### Покрытие тестами

- Минимум 80% покрытия кода
- 100% покрытие критических путей
- Обязательные тесты для всех публичных методов

### Документация

- JSDoc для всех публичных методов
- README для каждого модуля
- Примеры использования в документации

## 🚫 Антипаттерны

### Избегать

```typescript
// ❌ any типы
const data: any = {};

// ❌ Магические числа
if (status === 200) {
  /* ... */
}

// ❌ Длинные цепочки методов
const result = data.filter().map().reduce().sort().slice();

// ❌ Глобальные переменные
global.userCount = 0;

// ❌ Синхронные операции в async функциях
async function processData() {
  const data = fs.readFileSync('file.txt'); // блокирующая операция
}
```

### Рекомендуется

```typescript
// ✅ Строгая типизация
const data: UserData = {};

// ✅ Константы
if (status === HttpStatus.OK) { /* ... */ }

// ✅ Разбиение на шаги
const filtered = data.filter(/* ... */);
const mapped = filtered.map(/* ... */);
const result = mapped.reduce(/* ... */);

// ✅ Dependency injection
constructor(private readonly userService: UserService) {}

// ✅ Асинхронные операции
async function processData() {
  const data = await fs.promises.readFile('file.txt');
}
```

## 🔄 Code Review чеклист

### Функциональность

- [ ] Код выполняет требуемую задачу
- [ ] Обработаны edge cases
- [ ] Добавлены соответствующие тесты
- [ ] Обновлена документация

### Качество кода

- [ ] Следует установленным стандартам
- [ ] Нет дублирования кода
- [ ] Правильное именование переменных и функций
- [ ] Адекватная сложность

### Безопасность

- [ ] Валидация входных данных
- [ ] Безопасная работа с чувствительными данными
- [ ] Нет уязвимостей (SQL injection, XSS, etc.)
- [ ] Правильная обработка ошибок

### Производительность

- [ ] Нет N+1 запросов
- [ ] Эффективное использование памяти
- [ ] Оптимизированные запросы к БД
- [ ] Кеширование где необходимо

---

## 📚 Полезные ссылки

- [NestJS Style Guide](https://docs.nestjs.com/contributing/style-guide)
- [TypeScript Coding Guidelines](https://github.com/microsoft/TypeScript/wiki/Coding-guidelines)
- [Clean Code by Robert C. Martin](https://www.amazon.com/Clean-Code-Handbook-Software-Craftsmanship/dp/0132350884)
- [SOLID Principles](https://en.wikipedia.org/wiki/SOLID)
