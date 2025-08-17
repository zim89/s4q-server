# 📦 Пакеты и зависимости

## 🎯 Обзор

Документация по основным пакетам и зависимостям проекта Space4Quizlet Server.

## 🏗️ Основные зависимости

### NestJS Framework

```json
{
  "@nestjs/common": "^11.0.1",
  "@nestjs/config": "^4.0.2",
  "@nestjs/core": "^11.0.1",
  "@nestjs/jwt": "^11.0.0",
  "@nestjs/passport": "^11.0.5",
  "@nestjs/platform-express": "^11.0.1",
  "@nestjs/schedule": "^6.0.0",
  "@nestjs/swagger": "^11.2.0",
  "@nestjs/throttler": "^6.4.0",
  "@nestjs/axios": "^4.0.1"
}
```

### База данных

```json
{
  "@prisma/client": "^6.11.1",
  "prisma": "^6.11.1"
}
```

### Безопасность и аутентификация

```json
{
  "argon2": "^0.43.0",
  "passport": "^0.7.0",
  "passport-jwt": "^4.0.1",
  "helmet": "^8.1.0"
}
```

### Валидация и типизация

```json
{
  "class-transformer": "^0.5.1",
  "class-validator": "^0.14.2",
  "zod": "^4.0.10"
}
```

### HTTP и middleware

```json
{
  "compression": "^1.8.1",
  "cookie-parser": "^1.4.7"
}
```

### HTTP клиенты

```json
{
  "@nestjs/axios": "^4.0.1"
}
```

### Утилиты

```json
{
  "reflect-metadata": "^0.2.2",
  "rxjs": "^7.8.1"
}
```

## 🔧 Dev зависимости

### Инструменты разработки

```json
{
  "@nestjs/cli": "^11.0.0",
  "@nestjs/schematics": "^11.0.0",
  "@nestjs/testing": "^11.0.1",
  "typescript": "^5.7.3"
}
```

### Линтинг и форматирование

```json
{
  "eslint": "^9.18.0",
  "eslint-config-prettier": "^10.0.1",
  "eslint-plugin-import": "^2.32.0",
  "eslint-plugin-prettier": "^5.2.2",
  "eslint-plugin-simple-import-sort": "^12.1.1",
  "prettier": "^3.4.2"
}
```

### Тестирование

```json
{
  "jest": "^29.7.0",
  "supertest": "^7.0.0",
  "@types/jest": "^29.5.14",
  "ts-jest": "^29.2.5"
}
```

### Типы

```json
{
  "@types/express": "^5.0.0",
  "@types/node": "^22.10.7",
  "@types/passport": "^1.0.17",
  "@types/passport-jwt": "^4.0.1",
  "@types/supertest": "^6.0.2",
  "@types/cookie-parser": "^1.4.9"
}
```

### Git hooks

```json
{
  "husky": "^9.1.7",
  "lint-staged": "^16.1.5"
}
```

## 🚀 Ключевые пакеты

### compression (1.8.1)

**Назначение**: Сжатие HTTP ответов для улучшения производительности

**Использование**:

```typescript
import compression from 'compression';

app.use(compression());
```

**Особенности**:

- Поддержка gzip и deflate
- Автоматическое определение возможностей клиента
- Настраиваемые пороги сжатия

### helmet (8.1.0)

**Назначение**: Безопасность HTTP заголовков

**Использование**:

```typescript
import helmet from 'helmet';

app.use(helmet());
```

**Особенности**:

- Защита от XSS атак
- Настройка CSP заголовков
- Безопасность по умолчанию

### argon2 (0.43.0)

**Назначение**: Хеширование паролей

**Использование**:

```typescript
import { hash, verify } from 'argon2';

const hashedPassword = await hash(password);
const isValid = await verify(hashedPassword, password);
```

**Особенности**:

- Современный алгоритм хеширования
- Защита от атак перебором
- Настраиваемые параметры

### zod (4.0.10)

**Назначение**: Валидация схем и типизация

**Использование**:

```typescript
import { z } from 'zod';

const UserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});
```

**Особенности**:

- Runtime валидация
- TypeScript интеграция
- Автоматическая типизация

### @nestjs/axios (4.0.1)

**Назначение**: HTTP клиент для NestJS приложений

**Использование**:

```typescript
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class SomeService {
  constructor(private httpService: HttpService) {}

  async fetchData() {
    const response = await firstValueFrom(
      this.httpService.get('https://api.example.com/data')
    );
    return response.data;
  }
}
```

**Особенности**:

- Интеграция с NestJS DI
- Поддержка RxJS Observable
- Автоматическая обработка ошибок
- TypeScript поддержка
- Interceptors и middleware

## 📋 Управление зависимостями

### Добавление новых пакетов

```bash
# Production зависимости
bun add package-name

# Dev зависимости
bun add -d package-name

# Глобальные зависимости
bun add -g package-name
```

### Обновление пакетов

```bash
# Обновление всех пакетов
bun update

# Обновление конкретного пакета
bun update package-name
```

### Удаление пакетов

```bash
bun remove package-name
```

### Проверка уязвимостей

```bash
bun audit
```

## 🔄 Миграции пакетов

### Недавние изменения

#### compression

- **Было**: Устаревший пакет с ошибками TypeScript
- **Стало**: Современный пакет 1.8.1 с правильной настройкой

#### Node.js

- **Было**: Не зафиксированная версия
- **Стало**: Node.js 22.18.0 зафиксировано через Volta

#### child_process

- **Было**: `exec` с `shell: true` (deprecated)
- **Стало**: `spawn` с `shell: false` (безопасно)

## 📚 Полезные ссылки

- [Bun Package Manager](https://bun.sh/docs/cli/install)
- [NestJS Dependencies](https://docs.nestjs.com/first-steps)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Helmet Documentation](https://helmetjs.github.io/)
- [Argon2 Documentation](https://github.com/ranisalt/node-argon2)
- [Zod Documentation](https://zod.dev/)
- [NestJS Axios Documentation](https://docs.nestjs.com/techniques/http-module)
