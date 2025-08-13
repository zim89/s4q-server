# Prisma Migrations

## 📁 Структура

```
migrations/
├── README.md
├── 20240101000000_initial/     # Пример миграции
│   ├── migration.sql          # SQL файл миграции
│   └── README.md             # Описание изменений
└── _prisma_migrations/        # Системная папка Prisma
```

## 🚀 Использование

### Создание миграции:

```bash
npm run prisma:migrate
```

### Применение миграций в продакшене:

```bash
npm run prisma:deploy
```

### Сброс базы данных (только для разработки):

```bash
npx prisma migrate reset
```

## 📋 Правила

### ✅ Что делать:

- **Всегда создавайте миграции** при изменении schema
- **Тестируйте миграции** на dev окружении
- **Делайте бэкап** перед применением в продакшене
- **Документируйте** сложные миграции

### ❌ Что НЕ делать:

- **Не редактируйте** уже примененные миграции
- **Не удаляйте** файлы миграций из git
- **Не применяйте** миграции без тестирования
- **Не игнорируйте** ошибки миграций

## 🔧 Управление миграциями

### Просмотр статуса:

```bash
npx prisma migrate status
```

### Применение конкретной миграции:

```bash
npx prisma migrate resolve --applied 20240101000000_initial
```

### Откат миграции (только для разработки):

```bash
npx prisma migrate reset
```

## 📖 Документация

- [Prisma Migrate Guide](https://www.prisma.io/docs/orm/prisma-migrate)
- [Migration Workflows](https://www.prisma.io/docs/orm/prisma-migrate/workflows)
- [Schema Migrations](https://www.prisma.io/docs/orm/prisma-schema/overview/location#multi-file-prisma-schema)

## ⚠️ Важные замечания

1. **Папка migrations должна быть рядом с schema.prisma** - это требование Prisma
2. **Не перемещайте папку migrations** после создания
3. **Все миграции должны быть в git** для отслеживания изменений
4. **Тестируйте миграции** на копии продакшен данных
