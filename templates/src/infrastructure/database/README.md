# Database Infrastructure

Полная инфраструктура для работы с базой данных в приложении.

## 📁 Структура

```
src/infrastructure/database/
├── prisma/              # Базовый Prisma клиент
│   ├── prisma.service.ts    # Основной сервис для работы с БД
│   ├── prisma.module.ts     # Модуль для внедрения зависимостей
│   ├── index.ts             # Экспорты Prisma компонентов
│   └── README.md            # Документация Prisma
├── services/            # Высокоуровневые сервисы
│   ├── database.service.ts  # Сервис для административных операций
│   ├── migrations.service.ts # Сервис для управления миграциями
│   ├── seed.service.ts      # Сервис для заполнения данными
│   └── index.ts             # Экспорты сервисов
├── schema/              # Prisma schema (модульная структура)
│   ├── schema.prisma        # Основной файл (generator + datasource)
│   ├── enums/               # Енумы по доменам
│   ├── models/              # Модели по доменам
│   ├── migrations/          # Миграции базы данных
│   └── README.md            # Документация schema
├── database.module.ts   # Основной модуль для работы с БД
├── types.ts            # Типы для работы с БД
├── index.ts            # Основной экспорт
└── README.md           # Эта документация
```

## 🔧 Компоненты

### Prisma Client (`prisma/`)

**Назначение**: Базовый клиент для работы с базой данных

**Основные файлы:**

- `prisma.service.ts` - Основной сервис, расширяющий PrismaClient
- `prisma.module.ts` - Модуль для внедрения зависимостей

**Использование:**

```typescript
import { PrismaService } from 'src/infrastructure/database';

// В сервисе
constructor(private prisma: PrismaService) {}

// CRUD операции
const users = await this.prisma.user.findMany();
const user = await this.prisma.user.create({ data: userData });
```

### Database Services (`services/`)

**Назначение**: Высокоуровневые сервисы для административных задач

#### DatabaseService

- **Проверка здоровья БД** - `healthCheck()`
- **Статистика** - `getStats()`
- **Очистка данных** - `cleanupExpiredSessions()`, `cleanupOldAuditLogs()`
- **Оптимизация** - `optimizeDatabase()`

#### MigrationsService

- **Создание миграций** - `generateMigration(name)`
- **Применение миграций** - `applyMigrations()`
- **Статус миграций** - `getMigrationStatus()`
- **Генерация клиента** - `generateClient()`

#### SeedService

- **Начальные данные** - `seedInitialData()`
- **Тестовые данные** - `seedTestData()`
- **Очистка данных** - `clearAllData()`

### Schema (`schema/`)

**Назначение**: Модульная структура Prisma schema

**Содержит:**

- `schema.prisma` - Основной файл с generator и datasource
- `enums/` - Енумы по доменам (User, Language, Progress)
- `models/` - Модели по доменам (16 файлов)
- `migrations/` - Миграции базы данных

## 🚀 Использование

### Импорт компонентов

```typescript
import {
  // Prisma клиент
  PrismaService,
  PrismaModule,

  // Высокоуровневые сервисы
  DatabaseService,
  MigrationsService,
  SeedService,

  // Типы
  DatabaseConfig,
  DatabaseStats,
  HealthCheckResult,
} from 'src/infrastructure/database';
```

### Настройка в модуле

```typescript
// app.module.ts
import { PrismaModule } from 'src/infrastructure/database';

@Module({
  imports: [
    PrismaModule, // Глобальный модуль для Prisma
    // другие модули
  ],
})
export class AppModule {}
```

### Использование в сервисах

```typescript
// user.service.ts
import { PrismaService, DatabaseService } from 'src/infrastructure/database';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService, // Для CRUD операций
    private database: DatabaseService // Для административных задач
  ) {}

  async createUser(data: CreateUserDto) {
    // Используем PrismaService для создания пользователя
    return this.prisma.user.create({ data });
  }

  async getDatabaseStats() {
    // Используем DatabaseService для получения статистики
    return this.database.getStats();
  }
}
```

## 📋 Домены данных

### User Domain

- `User` - Пользователи системы
- `Session` - Сессии пользователей
- `Achievement` - Достижения пользователей

### Language Domain

- `Language` - Поддерживаемые языки
- `GrammarRule` - Грамматические правила
- `VerbForm` - Формы глаголов

### Content Domain

- `Card` - Карточки для изучения
- `Definition` - Определения к карточкам
- `Example` - Примеры использования
- `Tag` - Теги для категоризации

### Learning Domain

- `Set` - Наборы карточек
- `UserSet` - Наборы пользователей
- `Folder` - Папки для организации
- `UserCard` - Карточки пользователей

### Progress Domain

- `Progress` - Прогресс изучения
- `AuditLog` - Логи аудита

## 🔧 Административные операции

### Проверка здоровья БД

```typescript
const health = await this.database.healthCheck();
if (health.status === 'error') {
  // Обработка ошибки
  console.error('БД недоступна:', health.message);
}
```

### Получение статистики

```typescript
const stats = await this.database.getStats();
console.log(`Пользователей: ${stats.users}`);
console.log(`Карточек: ${stats.cards}`);
console.log(`Наборов: ${stats.sets}`);
```

### Очистка устаревших данных

```typescript
// Очистка сессий
const cleanedSessions = await this.database.cleanupExpiredSessions();

// Очистка логов (старше 90 дней)
const cleanedLogs = await this.database.cleanupOldAuditLogs(90);
```

### Управление миграциями

```typescript
// Создание миграции
await this.migrations.generateMigration('add_user_profile');

// Применение миграций
await this.migrations.applyMigrations();

// Проверка статуса
const status = await this.migrations.getMigrationStatus();
```

### Заполнение данными

```typescript
// Заполнение начальными данными
await this.seed.seedInitialData();

// Заполнение тестовыми данными (только в development)
await this.seed.seedTestData();
```

## ⚠️ Важные замечания

### Безопасность

- **Не используйте `resetDatabase()` в продакшене**
- **Не используйте `pushSchema()` в продакшене**
- **Всегда делайте бэкап перед миграциями**

### Производительность

- **Используйте транзакции для сложных операций**
- **Мониторьте медленные запросы**
- **Регулярно оптимизируйте БД**

### Разработка

- **Всегда создавайте миграции при изменении schema**
- **Тестируйте миграции на копии продакшен данных**
- **Документируйте сложные миграции**

## 📖 Дополнительная документация

- [Prisma Documentation](https://www.prisma.io/docs)
- [NestJS Database](https://docs.nestjs.com/techniques/database)
- [Schema Documentation](./schema/README.md)
- [Prisma Documentation](./prisma/README.md)
