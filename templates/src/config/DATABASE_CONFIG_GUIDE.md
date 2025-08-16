# Руководство по конфигурации базы данных

## 🎯 **Назначение database.config.ts**

### 📋 **Что это такое:**

`database.config.ts` - это центральный модуль конфигурации для всех аспектов работы с базой данных в приложении. Он отвечает за настройку подключения, производительности, мониторинга и управления данными.

### 🎯 **Зачем он нужен:**

#### 1. **Централизованная конфигурация**

- Все настройки БД в одном месте
- Легко изменять параметры для разных окружений
- Единообразный подход к конфигурации

#### 2. **Безопасность**

- Переменные окружения вместо хардкода
- Разные настройки для development/production
- SSL настройки для production

#### 3. **Производительность**

- Настройка пула соединений
- Оптимизация запросов
- Мониторинг медленных запросов

#### 4. **Отладка и мониторинг**

- Логирование SQL запросов
- Метрики производительности
- Алерты на проблемы

## 🏗️ **Архитектура конфигурации**

### 📁 **Структура файлов:**

```
src/config/
├── database.config.ts          # Основной конфиг БД
├── env/
│   ├── keys.ts                # Ключи переменных окружения
│   └── schema.ts              # Валидация переменных
└── DATABASE_CONFIG_GUIDE.md   # Это руководство
```

### 🔧 **Основные функции:**

#### 1. **getDatabaseConfig()**

```typescript
// Настройки подключения, пула, логирования, миграций
const dbConfig = getDatabaseConfig(configService);
```

#### 2. **getPrismaConfig()**

```typescript
// Настройки Prisma Client
const prismaConfig = getPrismaConfig(configService);
```

#### 3. **getDatabaseMonitoringConfig()**

```typescript
// Настройки мониторинга и метрик
const monitoringConfig = getDatabaseMonitoringConfig(configService);
```

## 📊 **Детальный разбор настроек**

### 🔌 **Настройки подключения:**

```typescript
connection: {
  url: "postgresql://user:pass@localhost:5432/db",
  ssl: { rejectUnauthorized: false } // Только в production
}
```

**Зачем нужно:**

- **URL**: Строка подключения к PostgreSQL
- **SSL**: Безопасное соединение в production

### 🏊 **Пул соединений:**

```typescript
pool: {
  min: 2,                    // Минимум соединений
  max: 10,                   // Максимум соединений
  idleTimeoutMillis: 30000,  // Время неактивности
  connectionTimeoutMillis: 2000 // Таймаут подключения
}
```

**Зачем нужно:**

- **Производительность**: Переиспользование соединений
- **Стабильность**: Предотвращение перегрузки БД
- **Эффективность**: Оптимальное использование ресурсов

### 📝 **Логирование:**

```typescript
logging: {
  enabled: true,              // Включить логирование
  slowQueryThreshold: 1000    // Порог медленных запросов (мс)
}
```

**Зачем нужно:**

- **Отладка**: Поиск проблем в запросах
- **Оптимизация**: Выявление медленных запросов
- **Мониторинг**: Отслеживание производительности

### 🔄 **Миграции:**

```typescript
migrations: {
  directory: "./src/infrastructure/database/schema/migrations",
  tableName: "_prisma_migrations"
}
```

**Зачем нужно:**

- **Версионирование**: Отслеживание изменений схемы
- **Безопасность**: Контролируемые изменения БД
- **Команда**: Синхронизация схемы между разработчиками

### 🌱 **Заполнение данными:**

```typescript
seed: {
  enabled: true,
  file: "./src/infrastructure/database/services/seed.service.ts"
}
```

**Зачем нужно:**

- **Тестирование**: Начальные данные для разработки
- **Демо**: Данные для демонстрации функционала
- **Разработка**: Базовые данные для работы

## 🔧 **Использование в приложении**

### 📦 **В модулях:**

```typescript
// database.module.ts
@Module({
  imports: [
    ConfigModule.forRoot({
      load: [getDatabaseConfig, getPrismaConfig],
    }),
  ],
})
export class DatabaseModule {}
```

### 🏭 **В сервисах:**

```typescript
// prisma.service.ts
@Injectable()
export class PrismaService {
  constructor(private configService: ConfigService) {
    const prismaConfig = getPrismaConfig(configService);
    this.prisma = new PrismaClient(prismaConfig);
  }
}
```

### 📊 **В мониторинге:**

```typescript
// database-monitoring.service.ts
@Injectable()
export class DatabaseMonitoringService {
  constructor(private configService: ConfigService) {
    const monitoringConfig = getDatabaseMonitoringConfig(configService);
    this.setupMonitoring(monitoringConfig);
  }
}
```

## 🌍 **Переменные окружения**

### 📋 **Обязательные:**

```env
# Основное подключение
POSTGRES_URI=postgresql://user:pass@localhost:5432/db

# Окружение
NODE_ENV=development
```

### 🔧 **Опциональные:**

```env
# Пул соединений
DB_POOL_MIN=2
DB_POOL_MAX=10
DB_IDLE_TIMEOUT=30000
DB_CONNECTION_TIMEOUT=2000

# Логирование
DB_LOGGING_ENABLED=true
DB_SLOW_QUERY_THRESHOLD=1000

# Заполнение данными
DB_SEED_ENABLED=true

# Shadow база для миграций
POSTGRES_SHADOW_URI=postgresql://user:pass@localhost:5432/db_shadow

# Мониторинг
DB_METRICS_ENABLED=true
DB_METRICS_INTERVAL=60
DB_ALERT_SLOW_QUERY=5000
DB_ALERT_CONNECTION_ERRORS=10
DB_LOG_QUERIES=true
DB_LOG_PARAMETERS=false
DB_LOG_QUERY_TIME=true
```

## 🚀 **Лучшие практики**

### ✅ **Что делать:**

1. **Используйте переменные окружения** для всех настроек
2. **Разные настройки** для development/production
3. **Мониторьте производительность** БД
4. **Логируйте медленные запросы** для оптимизации
5. **Используйте пул соединений** для эффективности

### ❌ **Чего избегать:**

1. **Хардкод настроек** в коде
2. **Одинаковые настройки** для всех окружений
3. **Отсутствие мониторинга** производительности
4. **Игнорирование медленных запросов**
5. **Неоптимальные настройки пула**

## 🔍 **Отладка и мониторинг**

### 📊 **Метрики для отслеживания:**

- Время выполнения запросов
- Количество активных соединений
- Ошибки подключения
- Размер пула соединений
- Количество медленных запросов

### 🚨 **Алерты:**

- Запросы медленнее 5 секунд
- Более 10 ошибок подключения в минуту
- Пул соединений заполнен на 90%
- SSL ошибки в production

### 📝 **Логи:**

- Все SQL запросы (в development)
- Параметры запросов (опционально)
- Время выполнения запросов
- Ошибки подключения

## 🎯 **Заключение**

`database.config.ts` - это **ключевой компонент** архитектуры приложения, который обеспечивает:

- ✅ **Безопасность** подключения к БД
- ✅ **Производительность** через оптимизацию
- ✅ **Надежность** через мониторинг
- ✅ **Удобство** разработки через логирование
- ✅ **Масштабируемость** через настройки пула

**Правильная конфигурация БД критически важна для стабильной работы приложения!** 🚀
