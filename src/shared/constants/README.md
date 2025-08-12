# Shared Constants

Общие константы, используемые во всем приложении.

## Структура

```
src/shared/constants/
├── cookies.ts      # Названия cookies
├── errors.ts       # Сообщения об ошибках
├── validation.ts   # Шаблоны валидации
├── index.ts        # Централизованный экспорт
└── README.md       # Документация
```

## Файлы

### cookies.ts

**Назначение**: Названия cookies, используемых в приложении

**Константы:**

- `cookieNames.refreshToken` - название cookie для refresh токена
- `cookieNames.accessToken` - название cookie для access токена (зарезервировано)

**Использование:**

```typescript
import { cookieNames } from 'src/shared/constants';

// Установка cookie
res.cookie(cookieNames.refreshToken, token, options);

// Чтение cookie
const token = req.cookies[cookieNames.refreshToken];
```

### errors.ts

**Назначение**: Сообщения об ошибках, организованные по доменам

**Структура:**

```typescript
errorMessages = {
  user: { ... },      // Ошибки пользователей
  auth: { ... },      // Ошибки аутентификации
  common: { ... }     // Общие ошибки
}
```

**Использование:**

```typescript
import { errorMessages } from 'src/shared/constants';

// В сервисах
throw new NotFoundException(errorMessages.user.notFound);

// С параметрами
throw new ConflictException(errorMessages.user.alreadyExists(email));
```

### validation.ts

**Назначение**: Шаблоны сообщений для валидации форм

**Использование:**

```typescript
import { validationMessages } from 'src/shared/constants';

// В DTO
@IsString({ message: validationMessages.mustBeString('Name') })
@IsNotEmpty({ message: validationMessages.required('Name') })
@MinLength(2, { message: validationMessages.minLength('Name', 2) })
name!: string;
```

## Принципы именования

### Файлы

- ✅ **Краткие названия** - `cookies.ts`, `errors.ts`, `validation.ts`
- ✅ **Понятные названия** - сразу ясно назначение
- ✅ **Без суффиксов** - не `cookies.constants.ts`

### Константы

- ✅ **camelCase для сложных объектов** - `cookieNames`, `errorMessages`, `validationMessages`
- ✅ **UPPER_SNAKE_CASE для простых строк** - `API_BASE_URL`, `MAX_FILE_SIZE`
- ✅ **Описательные названия** - понятно назначение
- ✅ **Группировка по доменам** - `user`, `auth`, `common`

### Значения

- ✅ **Консистентные префиксы** - `s4q_` для cookies
- ✅ **Понятные сообщения** - на английском языке
- ✅ **Функции для динамических значений** - `(email: string) => ...`

## Импорт

```typescript
// Импорт всех констант
import {
  cookieNames,
  errorMessages,
  validationMessages,
} from 'src/shared/constants';

// Или импорт по отдельности
import { cookieNames } from 'src/shared/constants/cookies';
import { errorMessages } from 'src/shared/constants/errors';
import { validationMessages } from 'src/shared/constants/validation';
```

## Добавление новых констант

### 1. Определите домен

- **Cookies** → `cookies.ts`
- **Ошибки** → `errors.ts`
- **Валидация** → `validation.ts`

### 2. Следуйте паттерну

```typescript
// В cookies.ts
export const cookieNames = {
  newCookie: 's4q_new_cookie',
} as const;

// В errors.ts
export const errorMessages = {
  newDomain: {
    newError: 'New error message',
    dynamicError: (param: string) => `Error with ${param}`,
  },
} as const;

// В validation.ts
export const validationMessages = {
  newValidation: (field: string) => `${field} validation message`,
} as const;

// Для простых строк используйте UPPER_SNAKE_CASE
export const API_BASE_URL = 'https://api.example.com';
export const MAX_FILE_SIZE = 1024 * 1024; // 1MB
```

### 3. Добавьте JSDoc

```typescript
/** Description of the constant */
export const newConstant = 'value';
```

## Преимущества

1. **Централизация** - все константы в одном месте
2. **Типобезопасность** - TypeScript проверяет типы
3. **Переиспользование** - один источник истины
4. **Легкость поддержки** - изменения в одном месте
5. **Консистентность** - единый стиль во всем приложении
