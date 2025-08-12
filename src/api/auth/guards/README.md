# Auth Guards

Коллекция guards для аутентификации и авторизации в auth модуле.

## Guards

### JwtGuard

**Назначение**: Аутентификация пользователей через JWT токены

**Что делает:**

- Валидирует JWT токен из заголовка `Authorization: Bearer <token>`
- Извлекает данные пользователя из токена
- Добавляет пользователя в `request.user`

**Использование:**

```typescript
import { JwtGuard } from '../guards';

@Controller('protected')
export class ProtectedController {
  @Get()
  @UseGuards(JwtGuard)
  getProtectedData() {
    return 'This endpoint requires authentication';
  }
}
```

### RolesGuard

**Назначение**: Авторизация на основе ролей пользователя

**Что делает:**

- Читает метаданные `roles` из декоратора `@RequireRoles`
- Проверяет, есть ли у пользователя требуемые роли
- Разрешает или запрещает доступ к эндпоинту

**Использование:**

```typescript
import { RolesGuard } from '../guards';
import { RequireRoles } from '../decorators';

@Controller('admin')
export class AdminController {
  @Get()
  @RequireRoles(Role.ADMIN)
  @UseGuards(JwtGuard, RolesGuard)
  getAdminData() {
    return 'Admin only data';
  }
}
```

## Взаимосвязь с декораторами

### RequireRoles vs RolesGuard

**`@RequireRoles`** - это **декоратор**:

- ✅ Устанавливает метаданные с требуемыми ролями
- ✅ Не выполняет проверки
- ✅ Используется для конфигурации

**`RolesGuard`** - это **guard**:

- ✅ Читает метаданные от `@RequireRoles`
- ✅ Выполняет проверки ролей
- ✅ Применяет логику авторизации

**Они дополняют друг друга:**

```typescript
@RequireRoles(Role.ADMIN)  // ← Устанавливает метаданные
@UseGuards(RolesGuard)     // ← Читает метаданные и проверяет
```

### Порядок выполнения

```typescript
@Auth(Role.ADMIN) // Это комбинация:

// 1. @RequireRoles(Role.ADMIN) - устанавливает метаданные
// 2. @UseGuards(JwtGuard, RolesGuard) - применяет guards

// Порядок выполнения:
// 1. JwtGuard проверяет токен → req.user = { id, rights: [...] }
// 2. RolesGuard читает метаданные 'roles' → [Role.ADMIN]
// 3. RolesGuard проверяет req.user.rights.includes(Role.ADMIN)
```

## Рекомендации

### ✅ Правильное использование:

```typescript
// Используйте @Auth для простых случаев
@Auth(Role.ADMIN)
getAdminData() { }

// Используйте комбинацию для сложных случаев
@RequireRoles([Role.ADMIN, Role.MODERATOR])
@UseGuards(JwtGuard, RolesGuard)
getModeratorData() { }
```

### ❌ Неправильное использование:

```typescript
// Не используйте RolesGuard без RequireRoles
@UseGuards(RolesGuard) // ← Не будет работать

// Не используйте RequireRoles без guards
@RequireRoles(Role.ADMIN) // ← Не будет проверяться
```

## Импорт

```typescript
// Импорт всех guards
import { JwtGuard, RolesGuard } from '../guards';

// Или импорт по отдельности
import { JwtGuard } from '../guards/jwt.guard';
import { RolesGuard } from '../guards/roles.guard';
```
