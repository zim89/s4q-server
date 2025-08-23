# 🚀 Quick Start Guide

## 📋 Основные команды

### Development

```bash
# Запуск
docker-compose up -d

# Логи
docker-compose logs -f postgres

# Остановка
docker-compose down
```

### Production

```bash
# Запуск
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d

# Остановка
docker-compose -f docker-compose.yml -f docker-compose.prod.yml down
```

## 🔧 Управление volumes

```bash
# Создание volumes
./scripts/docker-volumes.sh create

# Бэкап БД
./scripts/docker-volumes.sh backup

# Восстановление
./scripts/docker-volumes.sh restore backup_20231201_120000.sql

# Информация
./scripts/docker-volumes.sh info
```

## 📊 Мониторинг

```bash
# Статус сервисов
docker-compose ps

# Health check
docker-compose exec postgres pg_isready -U postgres

# Использование ресурсов
docker stats
```

## 🛠️ Troubleshooting

```bash
# Перезапуск сервиса
docker-compose restart postgres

# Просмотр логов
docker-compose logs postgres

# Очистка данных
docker-compose down -v
./scripts/docker-volumes.sh remove
```

## 📝 Переменные окружения

### Development (по умолчанию)

```env
POSTGRES_USER=postgres
POSTGRES_PASSWORD=password
POSTGRES_DB=s4q_db_dev
```

### Production (обязательно)

```env
POSTGRES_USER=your_user
POSTGRES_PASSWORD=your_secure_password
POSTGRES_DB=your_database_name
```
