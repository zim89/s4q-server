# Auth Strategies

Стратегии аутентификации для Passport.js в auth модуле.

## Стратегии

### JwtStrategy

**Назначение**: Стратегия для аутентификации через JWT токены

**Что делает:**

- Валидирует JWT токены из заголовка `Authorization: Bearer <token>`
- Извлекает данные пользователя из токена
- Проверяет активность пользователя
- Возвращает данные пользователя для `JwtGuard`

**Конфигурация:**

```typescript
{
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  ignoreExpiration: false,
  secretOrKey: process.env.JWT_SECRET,
  algorithms: ['HS256'],
}
```

**Валидация:**

```typescript
async validate(payload: JwtPayload): Promise<AuthenticatedUser> {
  // 1. Получает пользователя по ID из токена
  const user = await this.authService.validate(payload.id);

  // 2. Проверяет активность аккаунта
  if (!user.isActive) {
    throw new UnauthorizedException('User account is deactivated');
  }

  // 3. Возвращает данные пользователя
  return user;
}
```

## Взаимосвязь с Guards

### JwtStrategy + JwtGuard

**`JwtStrategy`** - это **стратегия Passport**:

- ✅ Валидирует JWT токен
- ✅ Извлекает данные пользователя
- ✅ Выполняет дополнительную валидацию

**`JwtGuard`** - это **guard NestJS**:

- ✅ Использует `JwtStrategy` для аутентификации
- ✅ Добавляет пользователя в `request.user`
- ✅ Защищает эндпоинты

**Порядок выполнения:**

```typescript
@UseGuards(JwtGuard) // ← Использует JwtStrategy
@Get('protected')
getProtectedData(@CurrentUser() user: AuthenticatedUser) {
  return user;
}

// 1. JwtGuard вызывает JwtStrategy
// 2. JwtStrategy валидирует токен и получает пользователя
// 3. JwtGuard добавляет пользователя в request.user
// 4. @CurrentUser извлекает пользователя из request.user
```

## Использование

### Автоматическое использование

```typescript
// JwtStrategy автоматически используется JwtGuard
@UseGuards(JwtGuard)
@Get('profile')
getProfile(@CurrentUser() user: AuthenticatedUser) {
  return user;
}
```

### Ручное использование (не рекомендуется)

```typescript
// Можно использовать напрямую, но не рекомендуется
@UseGuards(AuthGuard('jwt'))
@Get('profile')
getProfile(@CurrentUser() user: AuthenticatedUser) {
  return user;
}
```

## Обработка ошибок

### Типы ошибок:

- **`UnauthorizedException`** - неверный токен или пользователь не найден
- **`UnauthorizedException`** - аккаунт деактивирован

### Логирование:

```typescript
// Ошибки логируются для отладки
console.error('JWT validation failed:', error);
```

## Импорт

```typescript
// Импорт стратегии
import { JwtStrategy } from '../strategies';

// Или импорт напрямую
import { JwtStrategy } from '../strategies/jwt.strategy';
```
