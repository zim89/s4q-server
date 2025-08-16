# RefreshTokenService

Сервис для управления refresh токенами и пользовательскими сессиями.

## Назначение

`RefreshTokenService` отвечает за:

- Добавление refresh токенов в HTTP-only cookies
- Валидацию refresh токенов против базы данных
- Инвалидацию refresh токенов при выходе
- Управление пользовательскими сессиями с отслеживанием IP и User-Agent

## Методы

### addToResponse(res, refreshToken, expires)

Добавляет refresh токен в HTTP-only cookie и сохраняет сессию в базу данных.

**Параметры:**

- `res: Response` - объект ответа Express
- `refreshToken: string` - plain refresh токен для сохранения
- `expires: Date` - дата истечения токена

**Что делает:**

1. Проверяет наличие userId в res.locals
2. Хеширует refresh токен с помощью Argon2
3. Сохраняет сессию в базу данных с IP и User-Agent
4. Устанавливает HTTP-only cookie

**Пример:**

```typescript
await refreshTokenService.addToResponse(res, token, expires);
```

### validate(userId, refreshToken)

Валидирует refresh токен против сохраненного хеша в базе данных.

**Параметры:**

- `userId: string` - ID пользователя для валидации токена
- `refreshToken: string` - plain refresh токен для валидации

**Возвращает:**

- `boolean` - true если токен валиден, false иначе

**Что делает:**

1. Ищет активную сессию пользователя
2. Проверяет, что сессия не истекла
3. Верифицирует токен с помощью Argon2

**Пример:**

```typescript
const isValid = await refreshTokenService.validate(userId, token);
```

### invalidate(userId, refreshToken)

Инвалидирует refresh токен, помечая сессию как неактивную.

**Параметры:**

- `userId: string` - ID пользователя для инвалидации токена
- `refreshToken: string` - plain refresh токен для инвалидации

**Что делает:**

1. Хеширует refresh токен
2. Находит и деактивирует соответствующую сессию

**Пример:**

```typescript
await refreshTokenService.invalidate(userId, token);
```

### removeFromResponse(res)

Удаляет refresh токен cookie из ответа.

**Параметры:**

- `res: Response` - объект ответа Express

**Пример:**

```typescript
refreshTokenService.removeFromResponse(res);
```

## Безопасность

### Хеширование токенов

Все refresh токены хешируются с помощью Argon2id перед сохранением в базу данных:

```typescript
const refreshTokenHash = await hash(refreshToken, { type: argon2id });
```

### HTTP-only Cookies

Refresh токены сохраняются в HTTP-only cookies для защиты от XSS атак:

```typescript
res.cookie(this.REFRESH_TOKEN_KEY, refreshToken, {
  httpOnly: true,
  secure: isProdEnv(this.configService),
  sameSite: getSameSiteConfig(this.configService),
});
```

### Отслеживание сессий

Каждая сессия сохраняется с информацией о:

- IP адресе пользователя
- User-Agent браузера
- Времени истечения

## Обработка ошибок

### Валидация userId

```typescript
if (!userId || typeof userId !== 'string') {
  throw new UnauthorizedException('User ID is missing or invalid');
}
```

### Try-catch блоки

Все операции с базой данных обернуты в try-catch для graceful обработки ошибок.

### Логирование

Ошибки логируются для отладки:

```typescript
console.error('Failed to validate refresh token:', error);
```

## Конфигурация

### Cookie настройки

- `httpOnly: true` - защита от XSS
- `secure: true` - только для HTTPS в продакшене
- `sameSite: 'strict'` - защита от CSRF атак
- `domain` - настраивается через переменные окружения

### Время жизни токенов

Время жизни refresh токенов настраивается в `AuthService`:

```typescript
new Date(Date.now() + 1000 * 60 * 60 * 24 * 7); // 7 дней
```

## Использование

### В AuthService

```typescript
// При логине/регистрации
await this.refreshTokenService.addToResponse(res, refreshToken, expires);

// При выходе
await this.refreshTokenService.invalidate(userId, token);
this.refreshTokenService.removeFromResponse(res);
```

### В AuthController

```typescript
// При обновлении токена
const isValid = await this.refreshTokenService.validate(userId, token);
```
