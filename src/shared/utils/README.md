# Utils

Утилиты для работы с различными аспектами приложения.

## 📁 Структура

```
src/shared/utils/
├── env.ts           # Утилиты для работы с переменными окружения
├── index.ts         # Централизованный экспорт
└── README.md        # Документация
```

## 🔧 Утилиты

### env.ts

**Назначение**: Утилиты для работы с переменными окружения

**Функции:**

#### `getCookieSameSite(cfg: ConfigService)`

- **Описание**: Получает конфигурацию SameSite для cookies
- **Возвращает**: `'lax'` для production, `'none'` для development
- **Использование**:

```typescript
import { getCookieSameSite } from 'src/shared/utils';

const sameSite = getCookieSameSite(configService);
```

#### `isDevelopment(cfg: ConfigService)`

- **Описание**: Проверяет, является ли окружение development
- **Возвращает**: `boolean`
- **Использование**:

```typescript
import { isDevelopment } from 'src/shared/utils';

if (isDevelopment(configService)) {
  console.log('Development mode');
}
```

#### `isProduction(cfg: ConfigService)`

- **Описание**: Проверяет, является ли окружение production
- **Возвращает**: `boolean`
- **Использование**:

```typescript
import { isProduction } from 'src/shared/utils';

if (isProduction(configService)) {
  console.log('Production mode');
}
```

#### `isTest(cfg: ConfigService)`

- **Описание**: Проверяет, является ли окружение test
- **Возвращает**: `boolean`
- **Использование**:

```typescript
import { isTest } from 'src/shared/utils';

if (isTest(configService)) {
  console.log('Test mode');
}
```

#### `getEnvironment(cfg: ConfigService)`

- **Описание**: Получает название текущего окружения
- **Возвращает**: `string`
- **Использование**:

```typescript
import { getEnvironment } from 'src/shared/utils';

const env = getEnvironment(configService);
console.log(`Current environment: ${env}`);
```

## 📝 Принципы

### Названия файлов

- ✅ **Без префиксов** - `env.ts`, `validation.ts`, `formatting.ts`
- ✅ **Краткие названия** - понятно назначение
- ✅ **Консистентность** - как в `constants/`

### Названия функций

- ✅ **Понятные названия** - `isDevelopment`, `getCookieSameSite`
- ✅ **Глаголы для действий** - `get`, `is`, `check`
- ✅ **Полные названия** - `isDevelopment` вместо `isDev`

### Документация

- ✅ **JSDoc для всех функций**
- ✅ **Примеры использования**
- ✅ **Описание параметров и возвращаемых значений**

### Типизация

- ✅ **Явные типы возвращаемых значений**
- ✅ **Типизированные параметры**
- ✅ **Использование типов из ConfigService**

## 🚀 Добавление новых утилит

### 1. Создайте файл

```typescript
// src/shared/utils/validation.ts
export const validateEmail = (email: string): boolean => {
  // логика валидации
};
```

### 2. Добавьте в index.ts

```typescript
// src/shared/utils/index.ts
export { validateEmail } from './validation';
```

### 3. Добавьте документацию

```typescript
/**
 * Validates email format
 * @param email - Email to validate
 * @returns true if email is valid
 */
export const validateEmail = (email: string): boolean => {
  // логика
};
```

## 📋 Примеры файлов

### validation.ts

```typescript
/**
 * Validation utilities for form validation
 */

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password: string): boolean => {
  return password.length >= 6 && password.length <= 20;
};
```

### formatting.ts

```typescript
/**
 * Formatting utilities for data presentation
 */

export const formatDate = (date: Date): string => {
  return date.toLocaleDateString('en-US');
};

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};
```

## 🔄 Импорты

### Централизованный импорт (рекомендуется)

```typescript
import {
  getCookieSameSite,
  isDevelopment,
  isProduction,
} from 'src/shared/utils';
```

### Прямой импорт (если нужна только одна функция)

```typescript
import { getCookieSameSite } from 'src/shared/utils/env';
```
