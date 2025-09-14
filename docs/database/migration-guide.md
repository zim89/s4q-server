# Руководство по работе с миграциями Prisma

## Обзор

Данное руководство описывает последовательность действий для работы с миграциями базы данных в проекте Space4Quiz. Миграции находятся в `src/infrastructure/database/schema/migrations/`.

## Последовательность действий при изменении схемы БД

### 1. Изменение схемы Prisma

Сначала внесите изменения в файлы схемы в папке `src/infrastructure/database/schema/models/`:

```prisma
// Например, в card.prisma
model Card {
  // ... существующие поля
  translate String? // новое поле
  // ... остальные поля
}
```

### 2. Создание и применение миграции

```bash
# Перейти в папку сервера
cd s4q-server

# Создать и применить миграцию
bunx prisma migrate dev --name описание_изменения --schema src/infrastructure/database/schema/schema.prisma
```

**Пример:**

```bash
bunx prisma migrate dev --name add_translate_field_to_card --schema src/infrastructure/database/schema/schema.prisma
```

### 3. Генерация типов Prisma

После успешного применения миграции сгенерируйте типы:

```bash
bunx prisma generate --schema src/infrastructure/database/schema/schema.prisma
```

### 4. Обновление DTO и Swagger

Обновите соответствующие DTO файлы:

- `src/modules/{module}/dto/create-{entity}.dto.ts`
- `src/modules/{module}/dto/update-{entity}.dto.ts`
- `src/modules/{module}/dto/{entity}-response.dto.ts`

### 5. Обновление Swagger схем

Обновите файл `src/config/swagger-schemas.config.ts` для отображения новых полей в документации.

## Полезные команды

### Проверка статуса миграций

```bash
bunx prisma migrate status --schema src/infrastructure/database/schema/schema.prisma
```

### Применение существующих миграций (production)

```bash
bunx prisma migrate deploy --schema src/infrastructure/database/schema/schema.prisma
```

### Сброс базы данных (только для разработки!)

```bash
bunx prisma migrate reset --force --schema src/infrastructure/database/schema/schema.prisma
```

### Просмотр базы данных

```bash
bunx prisma studio --schema src/infrastructure/database/schema/schema.prisma
```

## Структура миграций

```
src/infrastructure/database/schema/migrations/
├── 20250823085314_init/
│   └── migration.sql
├── 20250907165707_rename_word_or_phrase_to_term/
│   └── migration.sql
├── 20250914110046_add_translate_field_to_card/
│   └── migration.sql
└── migration_lock.toml
```

## Решение проблем

### Ошибка "Could not find the migration file"

Если папка миграции пустая или повреждена:

```bash
# Удалить поврежденную папку миграции
rm -rf src/infrastructure/database/schema/migrations/YYYYMMDDHHMMSS_name

# Создать миграцию заново
bunx prisma migrate dev --name name --schema src/infrastructure/database/schema/schema.prisma
```

### Ошибка "migrate found failed migrations"

```bash
# Сбросить базу данных (только для разработки!)
bunx prisma migrate reset --force --schema src/infrastructure/database/schema/schema.prisma
```

### Ошибка "The table does not exist in the current database" в Prisma Studio

Эта ошибка возникает когда:

1. Prisma Client не синхронизирован с БД
2. Схема БД не соответствует текущим файлам .prisma
3. Отсутствуют тестовые данные

**Решение:**

```bash
# 1. Проверить статус миграций
bunx prisma migrate status --schema src/infrastructure/database/schema/schema.prisma

# 2. Если БД не синхронизирована, применить миграции
bunx prisma migrate deploy --schema src/infrastructure/database/schema/schema.prisma

# 3. Перегенерировать Prisma Client
bunx prisma generate --schema src/infrastructure/database/schema/schema.prisma

# 4. При необходимости заполнить БД тестовыми данными
bunx prisma db seed --schema src/infrastructure/database/schema/schema.prisma
```

### Конфликт миграций

Если есть конфликт между локальными и удаленными миграциями:

```bash
# Применить только существующие миграции
bunx prisma migrate deploy --schema src/infrastructure/database/schema/schema.prisma

# Затем создать новую миграцию
bunx prisma migrate dev --name new_changes --schema src/infrastructure/database/schema/schema.prisma
```

## Сохранение тестовых данных

### Проблема потери данных в разработке

**Почему теряются данные:**

1. Команда `prisma migrate reset` **всегда удаляет все данные** в БД
2. Команда `prisma db push` **не создает тестовые данные** автоматически
3. Docker контейнеры могут пересоздаваться, теряя данные

**Как избежать потери тестовых данных:**

### 1. Использование seed скриптов

```bash
# Добавить в package.json
{
  "prisma": {
    "seed": "bun run src/infrastructure/database/services/seed.service.ts"
  }
}

# Запустить seed после миграций
bunx prisma db seed --schema src/infrastructure/database/schema/schema.prisma
```

### 2. Создание бэкапов тестовых данных

```bash
# Создать дамп БД
pg_dump -h localhost -p 5433 -U postgres -d s4q_db_dev > backup_dev_$(date +%Y%m%d_%H%M%S).sql

# Восстановить из дампа
psql -h localhost -p 5433 -U postgres -d s4q_db_dev < backup_dev_20240101_120000.sql
```

### 3. Использование отдельной БД для тестов

```bash
# Создать отдельную БД для тестирования
createdb -h localhost -p 5433 -U postgres s4q_db_test

# Использовать разные переменные окружения
# .env.dev
POSTGRES_URI=postgresql://postgres:password@localhost:5433/s4q_db_dev

# .env.test
POSTGRES_URI=postgresql://postgres:password@localhost:5433/s4q_db_test
```

### 4. Docker volumes для персистентности

```yaml
# docker-compose.override.yml
services:
  postgres:
    volumes:
      - postgres_data:/var/lib/postgresql/data
      - ./backup:/backup

volumes:
  postgres_data:
```

## Важные замечания

1. **Всегда делайте бэкап** перед применением миграций в production
2. **Тестируйте миграции** на копии production данных
3. **Используйте транзакции** для критических изменений
4. **Проверяйте SQL** в файлах миграций перед применением
5. **Не редактируйте** уже примененные миграции
6. **Используйте seed скрипты** для автоматического заполнения тестовых данных
7. **Создавайте бэкапы** перед сбросом БД в разработке

## Рекомендуемый workflow для разработки

### Безопасное изменение схемы

```bash
# 1. Создать бэкап текущих данных (опционально)
pg_dump -h localhost -p 5433 -U postgres -d s4q_db_dev > backup_$(date +%Y%m%d_%H%M%S).sql

# 2. Изменить схему в файлах .prisma
# 3. Создать миграцию
bunx prisma migrate dev --name add_new_field --schema src/infrastructure/database/schema/schema.prisma

# 4. Сгенерировать типы
bunx prisma generate --schema src/infrastructure/database/schema/schema.prisma

# 5. Заполнить тестовыми данными (если нужно)
bunx prisma db seed --schema src/infrastructure/database/schema/schema.prisma

# 6. Обновить DTO файлы
# 7. Обновить Swagger схемы
# 8. Запустить сервер для тестирования
bun run start:dev
```

### Восстановление после проблем

```bash
# Если Prisma Studio показывает ошибки:
# 1. Проверить статус миграций
bunx prisma migrate status --schema src/infrastructure/database/schema/schema.prisma

# 2. Применить миграции
bunx prisma migrate deploy --schema src/infrastructure/database/schema/schema.prisma

# 3. Перегенерировать клиент
bunx prisma generate --schema src/infrastructure/database/schema/schema.prisma

# 4. Заполнить тестовыми данными
bunx prisma db seed --schema src/infrastructure/database/schema/schema.prisma

# 5. Запустить Prisma Studio
bunx prisma studio --schema src/infrastructure/database/schema/schema.prisma
```
