# Configuration

Конфигурационные файлы для приложения.

## 📁 Структура

```
src/config/
├── jwt.config.ts           # JWT конфигурация
├── swagger.config.ts       # Swagger документация
├── database.config.ts      # База данных конфигурация
├── app.config.ts           # Приложение конфигурация
├── index.ts                # Централизованный экспорт
├── env/                    # Переменные окружения
│   ├── loader.ts           # Загрузчик переменных
│   ├── keys.ts             # Ключи переменных
│   ├── schema.ts           # Схема валидации
│   └── README.md           # Документация
└── README.md               # Документация
```

## 🔧 Конфигурационные файлы

### jwt.config.ts

**Назначение**: Конфигурация JWT модуля для аутентификации

**Функция**: `getJwtConfig(configService: ConfigService)`

**Возвращает**: JWT модуль опции для NestJS

**Использование:**

```typescript
import { getJwtConfig } from 'src/config';

JwtModule.registerAsync({
  imports: [ConfigModule],
  useFactory: getJwtConfig,
  inject: [ConfigService],
});
```

### swagger.config.ts

**Назначение**: Настройка Swagger/OpenAPI документации

**Функция**: `setupSwaggerDocs(app: INestApplication)`

**Функциональность:**

- Настройка API метаданных
- Конфигурация аутентификации
- Настройка UI документации

**Использование:**

```typescript
import { setupSwaggerDocs } from 'src/config';

// В main.ts
setupSwaggerDocs(app);
// Доступно по адресу: http://localhost:3000/api-docs
```

### database.config.ts

**Назначение**: Конфигурация подключения к базе данных

**Функция**: `getDatabaseConfig(configService: ConfigService)`

**Возвращает**: Опции подключения к БД

**Использование:**

```typescript
import { getDatabaseConfig } from 'src/config';

const dbConfig = getDatabaseConfig(configService);
```

### app.config.ts

**Назначение**: Общая конфигурация приложения

**Функция**: `getAppConfig(configService: ConfigService)`

**Возвращает**: Настройки приложения (порт, префикс и т.д.)

**Использование:**

```typescript
import { getAppConfig } from 'src/config';

const appConfig = getAppConfig(configService);
app.setGlobalPrefix(appConfig.globalPrefix);
```

## 🌍 Переменные окружения

### loader.ts

**Назначение**: Загрузчик переменных окружения

**Экспорт**: `envLoader`

**Функциональность:**

- Определяет какие переменные загружать
- Обрабатывает переменные из process.env

**Использование:**

```typescript
import { envLoader } from 'src/config';

ConfigModule.forRoot({
  load: [envLoader.load[0]],
  validate: config => envSchema.parse(config),
});
```

### keys.ts

**Назначение**: Константы для ключей переменных окружения

**Экспорт**: `EnvKeys`

**Доступные ключи:**

- `JWT_SECRET` - Секретный ключ для JWT
- `JWT_ACCESS_TOKEN_TTL` - Время жизни access токена
- `JWT_REFRESH_TOKEN_TTL` - Время жизни refresh токена
- `COOKIE_DOMAIN` - Домен для cookies
- `ALLOWED_ORIGINS` - Разрешенные origins для CORS
- `NODE_ENV` - Окружение (development/production/test)
- `PORT` - Порт приложения
- `GLOBAL_PREFIX` - Глобальный префикс API

**Использование:**

```typescript
import { EnvKeys } from 'src/config';

const jwtSecret = configService.getOrThrow<string>(EnvKeys.JWT_SECRET);
```

### schema.ts

**Назначение**: Схема валидации переменных окружения

**Экспорт**: `envSchema`, `EnvSchema`

**Функциональность:**

- Валидация переменных с помощью Zod
- Типизация переменных окружения
- Значения по умолчанию

**Использование:**

```typescript
import { envSchema, type EnvSchema } from 'src/config';

// Валидация
const validatedConfig = envSchema.parse(process.env);

// Типизация
const configService: ConfigService<EnvSchema>;
```

## 📋 Примеры использования

### Полная настройка ConfigModule

```typescript
// app.module.ts
import { ConfigModule } from '@nestjs/config';
import { envLoader, envSchema } from 'src/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [envLoader.load[0]],
      validate: config => envSchema.parse(config),
      envFilePath: ['.env.local', '.env'],
    }),
    // другие модули
  ],
})
export class AppModule {}
```

### Использование в сервисах

```typescript
// some.service.ts
import { ConfigService } from '@nestjs/config';
import { EnvKeys, type EnvSchema } from 'src/config';

@Injectable()
export class SomeService {
  constructor(private configService: ConfigService<EnvSchema>) {}

  someMethod() {
    const jwtSecret = this.configService.getOrThrow<string>(EnvKeys.JWT_SECRET);
    const port = this.configService.get<number>(EnvKeys.PORT, 3000);
  }
}
```

### Настройка JWT модуля

```typescript
// auth.module.ts
import { JwtModule } from '@nestjs/jwt';
import { getJwtConfig } from 'src/config';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: getJwtConfig,
      inject: [ConfigService],
    }),
  ],
})
export class AuthModule {}
```

## 🔧 Environment Variables

### Обязательные переменные

```env
# JWT Configuration
JWT_SECRET=your-super-secret-key
JWT_ACCESS_TOKEN_TTL=15m
JWT_REFRESH_TOKEN_TTL=7d

# Cookie Configuration
COOKIE_DOMAIN=localhost

# CORS Configuration
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:3001

# Environment
NODE_ENV=development
```

### Опциональные переменные

```env
# Application Configuration
PORT=3000
GLOBAL_PREFIX=api
```

## 📝 Принципы

### Названия файлов

- ✅ **Краткие названия** - `jwt.config.ts`, `swagger.config.ts`
- ✅ **Понятные названия** - сразу ясно назначение
- ✅ **Без префиксов** - не `jwt.config.config.ts`

### Названия функций

- ✅ **Глаголы для действий** - `getJwtConfig`, `setupSwaggerDocs`
- ✅ **Понятные названия** - описывают назначение
- ✅ **Консистентность** - единый стиль именования

### Типизация

- ✅ **Строгая типизация** - все функции типизированы
- ✅ **Использование EnvSchema** - типизированные переменные окружения
- ✅ **Type safety** - безопасный доступ к конфигурации

### Валидация

- ✅ **Runtime валидация** - Zod для проверки переменных
- ✅ **Значения по умолчанию** - fallback значения
- ✅ **Обработка ошибок** - понятные сообщения об ошибках

## 🚀 Добавление новых конфигураций

### 1. Создайте файл конфигурации

```typescript
// src/config/redis.config.ts
import { ConfigService } from '@nestjs/config';
import { EnvKeys } from './env/keys';
import type { EnvSchema } from './env/schema';

export function getRedisConfig(configService: ConfigService<EnvSchema>) {
  return {
    host: configService.get<string>(EnvKeys.REDIS_HOST, 'localhost'),
    port: configService.get<number>(EnvKeys.REDIS_PORT, 6379),
  };
}
```

### 2. Добавьте переменные в keys.ts

```typescript
// src/config/env/keys.ts
export const EnvKeys = {
  // ... существующие ключи
  REDIS_HOST: 'REDIS_HOST',
  REDIS_PORT: 'REDIS_PORT',
} as const;
```

### 3. Добавьте в schema.ts

```typescript
// src/config/env/schema.ts
export const envSchema = z.object({
  // ... существующие поля
  [EnvKeys.REDIS_HOST]: z.string().default('localhost'),
  [EnvKeys.REDIS_PORT]: z.coerce.number().default(6379),
});
```

### 4. Добавьте в loader.ts

```typescript
// src/config/env/loader.ts
export const envLoader = {
  load: [
    () => ({
      // ... существующие поля
      [EnvKeys.REDIS_HOST]: process.env[EnvKeys.REDIS_HOST],
      [EnvKeys.REDIS_PORT]: process.env[EnvKeys.REDIS_PORT],
    }),
  ],
};
```

### 5. Экспортируйте в index.ts

```typescript
// src/config/index.ts
export { getRedisConfig } from './redis.config';
```

## ⚠️ Важные моменты

### Безопасность

- Никогда не коммитьте секретные ключи в репозиторий
- Используйте .env.local для локальной разработки
- Проверяйте переменные окружения в production

### Производительность

- Конфигурация загружается один раз при старте
- Используйте кэширование для часто используемых значений
- Минимизируйте количество обращений к ConfigService

### Масштабируемость

- Централизованная конфигурация
- Легко добавлять новые переменные
- Поддержка разных окружений
