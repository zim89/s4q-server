# 🔢 Система версионирования API

## 🎯 Обзор

Система автоматического версионирования API позволяет централизованно управлять версиями эндпоинтов без необходимости указывать их вручную в каждом контроллере.

## 🏗️ Архитектура

### Константы версий (`src/shared/constants/api-versions.ts`)

```typescript
export const apiVersions = {
  v0: '0',
  v1: '1',
  v2: '2',
  v3: '3',
  stable: '0',
  experimental: '1',
  beta: '2',
  alpha: '3',
} as const;

export const moduleVersions = {
  auth: {
    current: apiVersions.v0,
    stable: apiVersions.v0,
    experimental: apiVersions.v1,
  },
  user: {
    current: apiVersions.v0,
    stable: apiVersions.v0,
  },
  // ... другие модули
} as const;
```

### Декораторы (`src/shared/decorators/api-version.decorator.ts`)

```typescript
// Текущая версия модуля
@apiVersionCurrent('auth')
@Post('register')
async register() { ... }

// Стабильная версия
@apiVersionStable('auth')
@Post('login')
async login() { ... }

// Экспериментальная версия
@apiVersionExperimental()
@Post('new-feature')
async newFeature() { ... }

// Бета версия
@apiVersionBeta()
@Post('beta-feature')
async betaFeature() { ... }
```

## 🚀 Использование

### 1. Базовое использование

```typescript
import { ApiVersionCurrent, ApiVersionStable } from 'src/shared/decorators';

@Controller('auth')
export class AuthController {

  // Использует текущую версию модуля AUTH
  @ApiVersionCurrent('AUTH')
  @Post('register')
  async register() { ... }

  // Использует стабильную версию
  @ApiVersionStable('AUTH')
  @Post('login')
  async login() { ... }
}
```

### 2. Экспериментальные функции

```typescript
// Для новых функций в разработке
@ApiVersionExperimental()
@Post('new-auth-method')
async newAuthMethod() { ... }
```

### 3. Множественные версии

```typescript
// Поддержка нескольких версий одного эндпоинта
@ApiVersionMultiple(['1', '2'])
@Post('feature')
async feature() { ... }
```

### 4. Устаревшие эндпоинты

```typescript
// Помечает эндпоинт как устаревший
@ApiVersionDeprecated('1')
@Post('old-feature')
async oldFeature() { ... }
```

## 📋 Управление версиями

### Добавление нового модуля

1. **Добавьте модуль в константы:**

```typescript
export const MODULE_VERSIONS = {
  // ... существующие модули

  NEW_MODULE: {
    CURRENT: API_VERSIONS.V1,
    STABLE: API_VERSIONS.V1,
    EXPERIMENTAL: API_VERSIONS.V2,
  },
} as const;
```

2. **Используйте в контроллере:**

```typescript
@ApiVersionCurrent('NEW_MODULE')
@Post('endpoint')
async endpoint() { ... }
```

### Обновление версии модуля

1. **Измените версию в константах:**

```typescript
export const MODULE_VERSIONS = {
  AUTH: {
    CURRENT: API_VERSIONS.V2, // Обновлено с V1
    STABLE: API_VERSIONS.V1,
    EXPERIMENTAL: API_VERSIONS.V2,
  },
} as const;
```

2. **Все эндпоинты автоматически получат новую версию**

### Добавление новой версии API

1. **Добавьте версию в константы:**

```typescript
export const API_VERSIONS = {
  V1: '1',
  V2: '2',
  V3: '3',
  V4: '4', // Новая версия
  STABLE: '1',
  EXPERIMENTAL: '2',
  BETA: '3',
  ALPHA: '4', // Новая категория
} as const;
```

2. **Обновите конфигурацию:**

```typescript
export const VERSION_CONFIG = {
  SUPPORTED: [
    API_VERSIONS.V1,
    API_VERSIONS.V2,
    API_VERSIONS.V3,
    API_VERSIONS.V4,
  ],
  IN_DEVELOPMENT: [API_VERSIONS.V4],
} as const;
```

## 🎯 Преимущества

### ✅ Централизованное управление

- Все версии определены в одном месте
- Легко отслеживать изменения
- Консистентность между модулями

### ✅ Автоматическое обновление

- Изменение версии в константах автоматически применяется ко всем эндпоинтам
- Нет необходимости обновлять каждый контроллер вручную

### ✅ TypeScript поддержка

- Полная типизация версий
- Автодополнение в IDE
- Проверка на этапе компиляции

### ✅ Гибкость

- Поддержка множественных версий
- Экспериментальные и стабильные версии
- Устаревшие эндпоинты

## 📊 Примеры использования

### Auth Module

```typescript
@Controller('auth')
export class AuthController {

  // Стабильная версия регистрации
  @ApiVersionStable('AUTH')
  @Post('register')
  async register() { ... }

  // Экспериментальная версия входа
  @ApiVersionExperimental()
  @Post('login')
  async login() { ... }

  // Текущая версия обновления токена
  @ApiVersionCurrent('AUTH')
  @Post('refresh')
  async refresh() { ... }
}
```

### User Module

```typescript
@Controller('user')
export class UserController {

  // Стабильная версия профиля
  @ApiVersionStable('USER')
  @Get('profile')
  async getProfile() { ... }

  // Текущая версия обновления
  @ApiVersionCurrent('USER')
  @Patch('profile')
  async updateProfile() { ... }
}
```

### Set Module (планируется)

```typescript
@Controller('set')
export class SetController {

  // Стабильная версия создания
  @ApiVersionStable('SET')
  @Post()
  async create() { ... }

  // Текущая версия списка
  @ApiVersionCurrent('SET')
  @Get()
  async findAll() { ... }

  // Экспериментальная версия поиска
  @ApiVersionExperimental()
  @Get('search')
  async search() { ... }
}
```

## 🔄 Workflow обновления версий

### 1. Разработка новой функции

```typescript
// Используйте экспериментальную версию
@ApiVersionExperimental()
@Post('new-feature')
async newFeature() { ... }
```

### 2. Тестирование

```bash
# Тестируйте новую версию
curl -X POST /v2/new-feature
```

### 3. Стабилизация

```typescript
// Переместите в стабильную версию
@ApiVersionStable('MODULE')
@Post('new-feature')
async newFeature() { ... }
```

### 4. Обновление констант

```typescript
export const MODULE_VERSIONS = {
  MODULE: {
    CURRENT: API_VERSIONS.V2, // Обновили текущую версию
    STABLE: API_VERSIONS.V2, // Сделали стабильной
    EXPERIMENTAL: API_VERSIONS.V3, // Новая экспериментальная
  },
} as const;
```

## 🚨 Лучшие практики

### ✅ Рекомендуется

1. **Используйте стабильные версии для продакшена**
2. **Тестируйте экспериментальные версии**
3. **Документируйте изменения версий**
4. **Обновляйте changelog при изменении версий**

### ❌ Не рекомендуется

1. **Не используйте экспериментальные версии в продакшене**
2. **Не удаляйте старые версии без предупреждения**
3. **Не смешивайте версии в одном контроллере без необходимости**

## 📝 Примеры в проекте

### Текущее состояние

```typescript
// Auth Controller
@Controller({ path: 'auth', version: '0' })
export class AuthController {

  @apiVersionStable('auth')
  @Post('register')
  async register() { ... }

  @apiVersionExperimental()
  @Post('login')
  async login() { ... }
}
```

### После обновления версии

```typescript
// Обновляем константы
export const moduleVersions = {
  auth: {
    current: apiVersions.v1,  // Обновили
    stable: apiVersions.v1,   // Сделали стабильной
    experimental: apiVersions.v2,  // Новая экспериментальная
  },
} as const;

// Контроллер автоматически получит новые версии
@Controller({ path: 'auth', version: '1' })  // Автоматически обновится
export class AuthController {

  @apiVersionStable('auth')  // Теперь использует v1
  @Post('register')
  async register() { ... }

  @apiVersionExperimental()  // Теперь использует v2
  @Post('login')
  async login() { ... }
}
```

---

_Эта система позволяет легко управлять версиями API и обеспечивает консистентность между всеми модулями._
