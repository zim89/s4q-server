# 🗄️ База данных

## 🎯 Обзор

Space4Quizlet Server использует **PostgreSQL** с **Prisma ORM** для управления данными.

## 📋 Технологии

- **PostgreSQL 15** - основная база данных
- **Prisma** - современный ORM для TypeScript
- **Docker** - контейнеризация для разработки

## 🚀 Быстрый старт

### 1. Запуск базы данных

```bash
docker-compose up -d postgres
```

### 2. Генерация Prisma Client

```bash
bun run prisma:generate
```

### 3. Применение схемы

```bash
bun run prisma:db:push
```

### 4. Заполнение тестовыми данными

```bash
bun run db:seed
```

## 🔧 Основные команды

### Prisma команды

```bash
# Генерация Prisma Client
bun run prisma:generate

# Применение схемы к БД
bun run prisma:db:push

# Создание миграции
bun run prisma:migrate:dev

# Сброс БД (осторожно!)
bun run prisma:db:reset

# Просмотр данных
bun run prisma:studio
```

### Управление данными

```bash
# Заполнение тестовыми данными
bun run db:seed

# Бэкап БД
./scripts/docker-volumes.sh backup

# Восстановление БД
./scripts/docker-volumes.sh restore backup_file.sql
```

## 📊 Мониторинг

### Health Check

```bash
# Проверка состояния БД
docker-compose exec postgres pg_isready -U postgres
```

### Логи

```bash
# Просмотр логов PostgreSQL
docker-compose logs postgres
```

### Статистика

```bash
# Подключение к БД
docker-compose exec postgres psql -U postgres -d s4q_db

# Просмотр статистики
SELECT * FROM pg_stat_database;
```

## 🔒 Безопасность

### Development

- Пароли по умолчанию
- Публичный доступ к порту

### Production

- Строгие пароли
- Ограниченный доступ
- SSL соединения

## 📚 Документация

- [Prisma Guide](prisma-guide.md) - подробная работа с Prisma
- [Migrations](migrations.md) - управление миграциями
- [Docker Documentation](../docker/README.md) - работа с контейнерами
