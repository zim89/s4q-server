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

## Миграции базы данных

### Обзор

Система управления миграциями предоставляет программный интерфейс для работы с Prisma Migrate через `MigrationsService` и REST API через `MigrationsController`.

### Компоненты

#### MigrationsService

Сервис для программного управления миграциями:

- `generateMigration(name)` - создание новой миграции
- `applyMigrations()` - применение миграций
- `resetDatabase()` - сброс базы данных (только для разработки)
- `getMigrationStatus()` - получение статуса миграций
- `generateClient()` - генерация Prisma клиента
- `pushSchema()` - прямое применение схемы (только для разработки)

#### MigrationsController

REST API для управления миграциями (только для администраторов):

- `POST /migrations/generate` - создать миграцию
- `POST /migrations/apply` - применить миграции
- `POST /migrations/reset` - сбросить базу данных
- `GET /migrations/status` - получить статус
- `POST /migrations/generate-client` - сгенерировать клиент
- `POST /migrations/push-schema` - применить схему

### Как правильно делать миграции

#### 1. Разработка (Development)

**Создание новой миграции:**

```bash
# Через CLI
npx prisma migrate dev --name add_new_feature

# Через API (требует права администратора)
POST /v1/migrations/generate
{
  "name": "add_new_feature"
}
```

**Сброс базы данных (только для разработки):**

```bash
# Через CLI
npx prisma migrate reset --force

# Через API
POST /v1/migrations/reset
```

**Прямое применение схемы (для быстрого прототипирования):**

```bash
# Через CLI
npx prisma db push

# Через API
POST /v1/migrations/push-schema
```

#### 2. Продакшн (Production)

**Применение миграций:**

```bash
# Через CLI
npx prisma migrate deploy

# Через API
POST /v1/migrations/apply
```

**Проверка статуса:**

```bash
# Через CLI
npx prisma migrate status

# Через API
GET /v1/migrations/status
```

#### 3. Генерация клиента

После изменения схемы всегда генерируйте Prisma клиент:

```bash
# Через CLI
npx prisma generate

# Через API
POST /v1/migrations/generate-client
```

### Рекомендации

#### Для разработки:

1. **Используйте `migrate dev`** для создания миграций
2. **Используйте `db push`** для быстрого прототипирования
3. **Сбрасывайте базу** при необходимости с помощью `migrate reset`

#### Для продакшна:

1. **Всегда используйте `migrate deploy`** для применения миграций
2. **Никогда не используйте `db push`** в продакшне
3. **Проверяйте статус** перед применением миграций

#### Безопасность:

1. **Все операции через API** требуют права администратора
2. **Сброс базы** запрещен в продакшне
3. **Прямое применение схемы** запрещено в продакшне

### Примеры использования

#### Программное использование:

```typescript
import { MigrationsService } from 'src/infrastructure/database';

@Injectable()
export class MyService {
  constructor(private migrations: MigrationsService) {}

  async setupDatabase() {
    // Применить миграции
    await this.migrations.applyMigrations();

    // Сгенерировать клиент
    await this.migrations.generateClient();
  }

  async createFeatureMigration() {
    // Создать миграцию для новой функции
    await this.migrations.generateMigration('add_user_preferences');
  }
}
```

#### Через API:

```bash
# Создать миграцию
curl -X POST http://localhost:4000/v1/migrations/generate \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"name": "add_user_preferences"}'

# Применить миграции
curl -X POST http://localhost:4000/v1/migrations/apply \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN"

# Проверить статус
curl -X GET http://localhost:4000/v1/migrations/status \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN"
```

### Troubleshooting

#### Проблема: "Database schema is not in sync"

**Решение:** Сбросите базу данных и создайте новую миграцию:

```bash
npx prisma migrate reset --force
npx prisma migrate dev --name init
```

#### Проблема: "Migration failed"

**Решение:** Проверьте логи и убедитесь, что схема корректна:

```bash
npx prisma migrate status
npx prisma validate
```

#### Проблема: "Client not generated"

**Решение:** Сгенерируйте клиент после изменений схемы:

```bash
npx prisma generate
```

## Сидинг данных

### Обзор

Система сидинга предоставляет программный интерфейс для заполнения базы данных начальными данными через `SeedService` и REST API через `SeedController`.

### Компоненты

#### SeedService

Сервис для программного управления сидингом:

- `seedLanguages()` - заполнение языков
- `seedInitialData()` - заполнение всех начальных данных
- `clearAllData()` - очистка всех данных (только для разработки)
- `getSeedingStats()` - получение статистики сидинга
- `checkAdminExists()` - проверка существования админа
- `getAdminId()` - получение ID админа

#### SeedController

REST API для управления сидингом (только для администраторов):

- `POST /seed/languages` - заполнить языки
- `POST /seed/initial-data` - заполнить все начальные данные
- `POST /seed/clear` - очистить все данные
- `GET /seed/stats` - получить статистику
- `GET /seed/admin-id` - получить ID админа

### Данные для сидинга

#### Языки

Данные языков хранятся в `src/infrastructure/database/services/constants/languages.constants.ts`:

```typescript
export const languagesData: LanguageData[] = [
  {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    flag: '🇺🇸',
    isActive: true,
    isDefault: true,
  },
  {
    code: 'de',
    name: 'German',
    nativeName: 'Deutsch',
    flag: '🇩🇪',
    isActive: true,
    isDefault: false,
  },
];
```

#### Администратор

Используется существующий администратор с ID: `cmefhefgg0000p4xvds3jc5rt`

### Как правильно делать сидинг

#### 1. Разработка (Development)

**Заполнение языков:**

```bash
# Через API (требует права администратора)
POST /v1/seed/languages
```

**Заполнение всех начальных данных:**

```bash
# Через API
POST /v1/seed/initial-data
```

**Очистка данных (только для разработки):**

```bash
# Через API
POST /v1/seed/clear
```

#### 2. Продакшн (Production)

**Заполнение начальных данных:**

```bash
# Через API
POST /v1/seed/initial-data
```

**Проверка статистики:**

```bash
# Через API
GET /v1/seed/stats
```

### Рекомендации

#### Для разработки:

1. **Используйте `seedLanguages()`** для заполнения языков
2. **Используйте `clearAllData()`** для очистки при необходимости
3. **Проверяйте статистику** после сидинга

#### Для продакшна:

1. **Используйте `seedInitialData()`** для заполнения всех данных
2. **Никогда не используйте `clearAllData()`** в продакшне
3. **Проверяйте статистику** после сидинга

#### Безопасность:

1. **Все операции через API** требуют права администратора
2. **Очистка данных** запрещена в продакшне
3. **Администратор сохраняется** при очистке данных

### Примеры использования

#### Программное использование:

```typescript
import { SeedService } from 'src/infrastructure/database';

@Injectable()
export class MyService {
  constructor(private seed: SeedService) {}

  async setupInitialData() {
    // Заполнить языки
    await this.seed.seedLanguages();

    // Проверить статистику
    const stats = await this.seed.getSeedingStats();
    console.log(`Заполнено языков: ${stats.languages}`);
  }

  async checkAdmin() {
    const adminExists = await this.seed.checkAdminExists();
    const adminId = this.seed.getAdminId();

    if (adminExists) {
      console.log(`Админ найден: ${adminId}`);
    }
  }
}
```

#### Через API:

```bash
# Заполнить языки
curl -X POST http://localhost:4000/v1/seed/languages \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN"

# Заполнить все данные
curl -X POST http://localhost:4000/v1/seed/initial-data \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN"

# Получить статистику
curl -X GET http://localhost:4000/v1/seed/stats \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN"

# Получить ID админа
curl -X GET http://localhost:4000/v1/seed/admin-id \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN"
```

### Troubleshooting

#### Проблема: "Admin not found"

**Решение:** Убедитесь, что администратор существует в базе данных:

```bash
GET /v1/seed/admin-id
```

#### Проблема: "Languages already exist"

**Решение:** Это нормально - сервис пропускает уже существующие языки:

```bash
GET /v1/seed/stats
```

#### Проблема: "Cannot clear data in production"

**Решение:** Очистка данных запрещена в продакшне. Используйте только в разработке.
