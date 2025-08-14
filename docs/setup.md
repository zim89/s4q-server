# 🚀 Быстрая установка Space4Quizlet Server

## 📋 Предварительные требования

1. **Bun** - [Установить Bun](https://bun.sh/docs/installation)
2. **Docker** - [Установить Docker](https://docs.docker.com/get-docker/)
3. **Git** - [Установить Git](https://git-scm.com/downloads)

## ⚡ Быстрый старт (5 минут)

### 1. Клонирование

```bash
git clone <repository-url>
cd s4q-server
```

### 2. Установка зависимостей

```bash
bun install
```

### 3. Настройка окружения

```bash
cp env.example .env.local
# Отредактируйте .env.local при необходимости
```

### 4. Запуск базы данных

```bash
docker-compose up -d
```

### 5. Настройка БД

```bash
bun run prisma:generate
bun run prisma:db:push
```

### 6. Запуск приложения

```bash
bun run dev
```

### 7. Проверка

- API: http://localhost:3001
- Swagger: http://localhost:3001/api-docs

## 🔧 Полезные команды

```bash
# Остановка БД
docker-compose down

# Перезапуск БД
docker-compose restart

# Логи БД
docker-compose logs postgres

# Сброс БД
bun run prisma:db:reset

# Заполнение тестовыми данными
bun run db:seed

# Prisma Studio (GUI для БД)
bun run prisma:studio
```

## 🐛 Troubleshooting

### Проблема: Порт 5433 занят

```bash
# Проверка занятых портов
lsof -i :5433

# Остановка конфликтующих сервисов
sudo systemctl stop postgresql
```

### Проблема: Bun не найден

```bash
# Установка Bun
curl -fsSL https://bun.sh/install | bash
```

### Проблема: Docker не запущен

```bash
# Запуск Docker
sudo systemctl start docker
```

## 📚 Дополнительная документация

- [Полный README](../README.md)
- [Docker документация](docker/README.md)
- [Docker Quick Start](docker/quick-start.md)
