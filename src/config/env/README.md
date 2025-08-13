# Environment Configuration

Конфигурация переменных окружения для приложения.

## 📁 Структура

```
src/config/env/
├── loader.ts    # Загрузчик переменных окружения
├── keys.ts      # Ключи переменных окружения
├── schema.ts    # Схема валидации
└── README.md    # Документация
```

## 🔧 Компоненты

### loader.ts

**Назначение**: Загрузчик переменных окружения

**Экспорт**: `envLoader`

**Функциональность:**

- Определяет какие переменные загружать из process.env
- Обрабатывает переменные для ConfigModule
- Централизованное управление переменными

**Использование:**

```typescript
import { envLoader } from 'src/config/env';

ConfigModule.forRoot({
  load: [envLoader.load[0]],
  validate: config => envSchema.parse(config),
});
```

### keys.ts

**Назначение**: Константы для ключей переменных окружения

**Экспорт**: `EnvKeys`

**Доступные ключи:**

#### JWT Configuration

- `JWT_SECRET` - Секретный ключ для JWT токенов
- `JWT_ACCESS_TOKEN_TTL` - Время жизни access токена
- `JWT_REFRESH_TOKEN_TTL` - Время жизни refresh токена

#### Cookie Configuration

- `COOKIE_DOMAIN` - Домен для cookies

#### CORS Configuration

- `ALLOWED_ORIGINS` - Разрешенные origins для CORS

#### Environment

- `NODE_ENV` - Окружение (development/production/test)

#### Application

- `PORT` - Порт приложения
- `GLOBAL_PREFIX` - Глобальный префикс API

**Использование:**

```typescript
import { EnvKeys } from 'src/config/env';

const jwtSecret = configService.getOrThrow<string>(EnvKeys.JWT_SECRET);
const port = configService.get<number>(EnvKeys.PORT, 3000);
```

### schema.ts

**Назначение**: Схема валидации переменных окружения

**Экспорт**: `envSchema`, `EnvSchema`

**Функциональность:**

- Валидация переменных с помощью Zod
- Типизация переменных окружения
- Значения по умолчанию
- Трансформация данных

**Использование:**

```typescript
import { envSchema, type EnvSchema } from 'src/config/env';

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
import { envLoader, envSchema } from 'src/config/env';

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
import { EnvKeys, type EnvSchema } from 'src/config/env';

@Injectable()
export class SomeService {
  constructor(private configService: ConfigService<EnvSchema>) {}

  someMethod() {
    const jwtSecret = this.configService.getOrThrow<string>(EnvKeys.JWT_SECRET);
    const port = this.configService.get<number>(EnvKeys.PORT, 3000);
    const origins = this.configService.get<string[]>(EnvKeys.ALLOWED_ORIGINS);
  }
}
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

### Пример .env файла

```env
# JWT Configuration
JWT_SECRET=your-super-secret-key-here
JWT_ACCESS_TOKEN_TTL=15m
JWT_REFRESH_TOKEN_TTL=7d

# Cookie Configuration
COOKIE_DOMAIN=localhost

# CORS Configuration
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:3001,https://yourdomain.com

# Environment
NODE_ENV=development

# Application Configuration
PORT=3000
GLOBAL_PREFIX=api
```

## 📝 Принципы

### Названия файлов

- ✅ **Краткие названия** - `loader.ts`, `keys.ts`, `schema.ts`
- ✅ **Понятные названия** - сразу ясно назначение
- ✅ **Без префиксов** - не `env.loader.ts`

### Названия констант

- ✅ **UPPER_SNAKE_CASE** - `JWT_SECRET`, `COOKIE_DOMAIN`
- ✅ **Понятные названия** - описывают назначение
- ✅ **Консистентность** - единый стиль именования

### Типизация

- ✅ **Строгая типизация** - все переменные типизированы
- ✅ **Использование Zod** - runtime валидация
- ✅ **Type safety** - безопасный доступ к переменным

### Валидация

- ✅ **Runtime валидация** - Zod для проверки переменных
- ✅ **Значения по умолчанию** - fallback значения
- ✅ **Обработка ошибок** - понятные сообщения об ошибках

## 🚀 Добавление новых переменных

### 1. Добавьте ключ в keys.ts

```typescript
// src/config/env/keys.ts
export const EnvKeys = {
  // ... существующие ключи
  REDIS_HOST: 'REDIS_HOST',
  REDIS_PORT: 'REDIS_PORT',
} as const;
```

### 2. Добавьте в schema.ts

```typescript
// src/config/env/schema.ts
export const envSchema = z.object({
  // ... существующие поля
  [EnvKeys.REDIS_HOST]: z.string().default('localhost'),
  [EnvKeys.REDIS_PORT]: z.coerce.number().default(6379),
});
```

### 3. Добавьте в loader.ts

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

### 4. Используйте в коде

```typescript
// some.service.ts
const redisHost = this.configService.get<string>(
  EnvKeys.REDIS_HOST,
  'localhost'
);
const redisPort = this.configService.get<number>(EnvKeys.REDIS_PORT, 6379);
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
