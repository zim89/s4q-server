# 🎯 Первые шаги

После установки и настройки окружения, выполните эти шаги для запуска приложения.

## 🗄️ Настройка базы данных

### 1. Запуск PostgreSQL

```bash
# Запуск базы данных в Docker
docker-compose up -d postgres

# Проверка статуса
docker-compose ps
```

### 2. Применение схемы

```bash
# Генерация Prisma Client
bun run prisma:generate

# Применение схемы к БД
bun run prisma:db:push
```

### 3. Заполнение начальными данными

```bash
# Запуск приложения (если еще не запущено)
bun run start:dev

# В другом терминале - заполнение языков
curl -X POST http://localhost:4000/v1/seed/languages \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN"
```

## 🚀 Запуск приложения

### Development режим

```bash
# Запуск в режиме разработки с hot reload
bun run start:dev
```

### Production режим

```bash
# Сборка приложения
bun run build

# Запуск в production режиме
bun run start:prod
```

## ✅ Проверка работы

### 1. Health Check

```bash
curl http://localhost:4000/v1/health
```

Ожидаемый ответ:

```json
{
  "status": "ok",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

### 2. Swagger документация

Откройте в браузере: http://localhost:4000/v1/docs

### 3. Проверка базы данных

```bash
# Подключение к БД
docker-compose exec postgres psql -U postgres -d s4q_db

# Проверка таблиц
\dt
```

## 🔧 Полезные команды

### Управление базой данных

```bash
# Сброс БД (осторожно!)
bun run prisma:db:reset

# Просмотр данных через Prisma Studio
bun run prisma:studio

# Создание новой миграции
bun run prisma:migrate
```

### Управление приложением

```bash
# Логи в реальном времени
docker-compose logs -f postgres

# Остановка всех сервисов
docker-compose down

# Перезапуск с пересборкой
docker-compose up --build
```

## 🎯 Что дальше?

После успешного запуска:

1. **Изучите API** - [API документация](../api/README.md)
2. **Поняйте архитектуру** - [Архитектура проекта](../architecture/README.md)
3. **Начните разработку** - [Руководство для разработчиков](../contributing/README.md)

## 🆘 Проблемы?

Если что-то не работает:

1. Проверьте логи: `docker-compose logs postgres`
2. Убедитесь, что порты не заняты: `lsof -i :4000`
3. Проверьте переменные окружения в `.env`
4. Обратитесь к [Troubleshooting](../troubleshooting.md)
