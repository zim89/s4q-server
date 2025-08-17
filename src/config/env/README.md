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

**Экспорт**: `envKeys`

**Доступные ключи:**

#### Application Configuration

- `NODE_ENV` - Окружение (development/production/test)
- `PORT` - Порт приложения
- `GLOBAL_PREFIX` - Глобальный префикс API

#### JWT Configuration

- `JWT_SECRET` - Секретный ключ для JWT токенов
- `JWT_ACCESS_TOKEN_TTL` - Время жизни access токена
- `JWT_REFRESH_TOKEN_TTL` - Время жизни refresh токена

#### Cookie Configuration

- `COOKIE_DOMAIN` - Домен для cookies

#### CORS Configuration

- `ALLOWED_ORIGINS` - Разрешенные origins для CORS

#### Database Configuration

- `POSTGRES_URI` - URI подключения к PostgreSQL
- `POSTGRES_SHADOW_URI` - URI shadow базы данных
- `DB_POOL_MIN` - Минимальный размер пула соединений
- `DB_POOL_MAX` - Максимальный размер пула соединений
- `DB_IDLE_TIMEOUT` - Таймаут неактивных соединений
- `DB_CONNECTION_TIMEOUT` - Таймаут подключения
- `DB_LOGGING_ENABLED` - Включение логирования запросов
- `DB_SLOW_QUERY_THRESHOLD` - Порог медленных запросов
- `DB_SEED_ENABLED` - Включение сидинга

#### Database Monitoring

- `DB_METRICS_ENABLED` - Включение метрик
- `DB_METRICS_INTERVAL` - Интервал сбора метрик
- `DB_ALERT_SLOW_QUERY` - Порог для алертов медленных запросов
- `DB_ALERT_CONNECTION_ERRORS` - Порог для алертов ошибок подключения
- `DB_LOG_QUERIES` - Логирование запросов
- `DB_LOG_PARAMETERS` - Логирование параметров
- `DB_LOG_QUERY_TIME` - Логирование времени выполнения

#### Integrations Configuration

- `FREE_DICTIONARY_API_URL` - URL Free Dictionary API
- `FREE_DICTIONARY_API_TIMEOUT` - Таймаут запросов к API
- `FREE_DICTIONARY_API_RETRIES` - Количество повторов запросов

**Использование:**

```typescript
import { envKeys } from 'src/config/env';

const jwtSecret = configService.getOrThrow<string>(envKeys.JWT_SECRET);
const port = configService.get<number>(envKeys.PORT, 3000);
const origins = configService.get<string[]>(envKeys.ALLOWED_ORIGINS);
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
import { envKeys, type EnvSchema } from 'src/config/env';

@Injectable()
export class SomeService {
  constructor(private configService: ConfigService<EnvSchema>) {}

  someMethod() {
    const jwtSecret = this.configService.getOrThrow<string>(envKeys.JWT_SECRET);
    const port = this.configService.get<number>(envKeys.PORT, 3000);
    const origins = this.configService.get<string[]>(envKeys.ALLOWED_ORIGINS);
  }
}
```

## 🔧 Environment Variables

### Обязательные переменные

```env
# JWT Configuration
JWT_SECRET=your-super-secret-key
COOKIE_DOMAIN=localhost

# Database Configuration
POSTGRES_URI=postgresql://user:password@localhost:5432/db
```

### Опциональные переменные

```env
# Application Configuration
NODE_ENV=development
PORT=3000
GLOBAL_PREFIX=api

# JWT Configuration
JWT_ACCESS_TOKEN_TTL=15m
JWT_REFRESH_TOKEN_TTL=7d

# CORS Configuration
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:3001

# Database Configuration
POSTGRES_SHADOW_URI=
DB_POOL_MIN=2
DB_POOL_MAX=10
DB_IDLE_TIMEOUT=30000
DB_CONNECTION_TIMEOUT=2000
DB_LOGGING_ENABLED=true
DB_SLOW_QUERY_THRESHOLD=1000
DB_SEED_ENABLED=false

# Database Monitoring
DB_METRICS_ENABLED=false
DB_METRICS_INTERVAL=60
DB_ALERT_SLOW_QUERY=5000
DB_ALERT_CONNECTION_ERRORS=10
DB_LOG_QUERIES=false
DB_LOG_PARAMETERS=false
DB_LOG_QUERY_TIME=true

# Integrations Configuration
FREE_DICTIONARY_API_URL=https://api.dictionaryapi.dev/api/v2/entries/en
FREE_DICTIONARY_API_TIMEOUT=5000
FREE_DICTIONARY_API_RETRIES=3
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
export const envKeys = {
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
  [envKeys.REDIS_HOST]: z.string().default('localhost'),
  [envKeys.REDIS_PORT]: z.coerce.number().default(6379),
});
```

### 3. Добавьте в loader.ts

```typescript
// src/config/env/loader.ts
export const envLoader = {
  load: [
    () => ({
      // ... существующие поля
      [envKeys.REDIS_HOST]: process.env[envKeys.REDIS_HOST],
      [envKeys.REDIS_PORT]: process.env[envKeys.REDIS_PORT],
    }),
  ],
};
```

### 4. Используйте в коде

```typescript
// some.service.ts
const redisHost = this.configService.get<string>(
  envKeys.REDIS_HOST,
  'localhost'
);
const redisPort = this.configService.get<number>(envKeys.REDIS_PORT, 6379);
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
