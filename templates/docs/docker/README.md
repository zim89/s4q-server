# 🐳 Docker Configuration

## 🐳 Обзор

Этот проект использует Docker Compose для управления инфраструктурными сервисами.

## 📁 Структура

```
docker/
├── postgres/
│   └── init/
│       └── 01-init.sql          # Скрипт инициализации PostgreSQL
├── README.md                     # Эта документация
└── docker-compose.yml           # Основная конфигурация
    ├── docker-compose.override.yml  # Development overrides
    └── docker-compose.prod.yml      # Production overrides
```

## 🚀 Быстрый старт

### Development

```bash
# Запуск всех сервисов
docker-compose up -d

# Просмотр логов
docker-compose logs -f postgres

# Остановка
docker-compose down
```

### Production

```bash
# Запуск с production конфигурацией
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d

# Остановка
docker-compose -f docker-compose.yml -f docker-compose.prod.yml down
```

## 🔧 Сервисы

### PostgreSQL

- **Порт**: 5433 (host) → 5432 (container)
- **Версия**: 15-alpine
- **Данные**: Docker volume `s4q_db_data`
- **Инициализация**: `./docker/postgres/init/`

## 📊 Мониторинг

### Health Checks

```bash
# Проверка состояния PostgreSQL
docker-compose exec postgres pg_isready -U postgres
```

### Логи

```bash
# PostgreSQL логи
docker-compose logs postgres

# Все логи
docker-compose logs
```

## 🔒 Безопасность

### Development

- Пароли по умолчанию (только для локальной разработки)
- Публичные порты для удобства отладки

### Production

- Обязательные переменные окружения
- Ограниченный доступ к портам (127.0.0.1)
- Увеличенные лимиты ресурсов

## 📝 Переменные окружения

### Обязательные (Production)

```env
POSTGRES_USER=your_user
POSTGRES_PASSWORD=your_secure_password
POSTGRES_DB=your_database_name
```

### Опциональные

```env
POSTGRES_USER=postgres          # По умолчанию
POSTGRES_PASSWORD=password      # По умолчанию
POSTGRES_DB=s4q_db_dev         # По умолчанию
```

## 🛠️ Утилиты

### Резервное копирование

```bash
# Создание бэкапа
docker-compose exec postgres pg_dump -U postgres s4q_db > backup.sql

# Восстановление
docker-compose exec -T postgres psql -U postgres s4q_db < backup.sql
```

### Очистка данных

```bash
# Удаление всех данных
docker-compose down -v

# Пересоздание
docker-compose up -d
```

## 🔧 Troubleshooting

### Проблема: Порт занят

```bash
# Проверка занятых портов
lsof -i :5433
lsof -i :6379

# Остановка конфликтующих сервисов
sudo systemctl stop postgresql
```

### Проблема: Недостаточно места

```bash
# Очистка Docker
docker system prune -a
docker volume prune
```

### Проблема: Права доступа

```bash
# Проверка Docker volumes
docker volume ls | grep s4q

# Создание volumes вручную (если нужно)
docker volume create s4q_db_data
```

## 📚 Дополнительные ресурсы

- [Docker Compose документация](https://docs.docker.com/compose/)
- [PostgreSQL Docker образ](https://hub.docker.com/_/postgres)
- [Redis Docker образ](https://hub.docker.com/_/redis)
