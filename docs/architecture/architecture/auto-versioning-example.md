# 🔄 Автоматическое версионирование API

## 🎯 Как это работает

### До (ручное версионирование)

```typescript
@Controller({ path: 'auth', version: '0' })  // Жестко заданная версия
export class AuthController {

  @Post('register')  // /v0/auth/register
  async register() { ... }

  @Version('1')  // Ручное указание версии
  @Post('login')  // /v1/auth/login
  async login() { ... }
}
```

### После (автоматическое версионирование)

```typescript
@Controller('auth')  // Без версии - использует декораторы
export class AuthController {

  @apiVersionStable('auth')  // Автоматически получает версию из констант
  @Post('register')  // /v0/auth/register
  async register() { ... }

  @apiVersionExperimental()  // Автоматически получает экспериментальную версию
  @Post('login')  // /v1/auth/login
  async login() { ... }
}
```

## 📊 Результат

| Эндпоинт | Декоратор                    | Версия | URL                      |
| -------- | ---------------------------- | ------ | ------------------------ |
| register | `@apiVersionStable('auth')`  | v0     | `POST /v0/auth/register` |
| login    | `@apiVersionExperimental()`  | v1     | `POST /v1/auth/login`    |
| refresh  | `@apiVersionCurrent('auth')` | v0     | `POST /v0/auth/refresh`  |
| logout   | `@apiVersionStable('auth')`  | v0     | `POST /v0/auth/logout`   |

## 🔧 Преимущества

### ✅ Автоматизация

- Версии управляются централизованно в константах
- Не нужно помнить, какая версия у какого эндпоинта
- Автоматическое обновление при изменении констант

### ✅ Консистентность

- Все эндпоинты одного типа используют одинаковые версии
- Легко отслеживать, какие эндпоинты стабильные, а какие экспериментальные

### ✅ Гибкость

- Легко изменить версию для всего модуля
- Поддержка разных типов версий (стабильная, экспериментальная, бета)

## 🚀 Как изменить версию

### Для одного эндпоинта

```typescript
// Изменить с экспериментальной на стабильную
@apiVersionStable('auth')  // вместо @apiVersionExperimental()
@Post('login')
async login() { ... }
```

### Для всего модуля

```typescript
// В src/shared/constants/api-versions.ts
export const moduleVersions = {
  auth: {
    current: apiVersions.v1, // Изменить с v0 на v1
    stable: apiVersions.v1, // Изменить с v0 на v1
    experimental: apiVersions.v2, // Изменить с v1 на v2
  },
} as const;
```

### Результат

- Все эндпоинты с `@apiVersionStable('auth')` автоматически получат версию v1
- Все эндпоинты с `@apiVersionCurrent('auth')` автоматически получат версию v1
- Все эндпоинты с `@apiVersionExperimental()` автоматически получат версию v2

## 🎯 Рекомендации

### Для стабильных эндпоинтов

```typescript
@apiVersionStable('auth')  // Использует стабильную версию модуля
```

### Для новых функций

```typescript
@apiVersionExperimental()  // Использует экспериментальную версию
```

### Для текущих функций

```typescript
@apiVersionCurrent('auth')  // Использует текущую версию модуля
```

---

_Теперь версионирование полностью автоматизировано и управляется централизованно!_ 🎉
