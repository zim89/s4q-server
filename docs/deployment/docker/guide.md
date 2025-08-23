# 🐳 Docker Compose Files Guide

## 📁 Структура файлов

```
├── docker-compose.yml              # Основная конфигурация (базовые настройки)
├── docker-compose.override.yml     # Development overrides (автоматически применяется)
└── docker-compose.prod.yml         # Production overrides (применяется вручную)
```

## 🎯 Назначение каждого файла

### `docker-compose.yml` (Основной)

- **Назначение**: Базовая конфигурация для всех окружений
- **Содержит**: Общие настройки, health checks, ресурсы, логирование
- **Использование**: Всегда используется как основа

### `docker-compose.override.yml` (Development)

- **Назначение**: Переопределения для development окружения
- **Применение**: Автоматически (Docker Compose сам его подхватывает)
- **Содержит**: Development-специфичные настройки
- **Пример**: Пароли по умолчанию, публичные порты

### `docker-compose.prod.yml` (Production)

- **Назначение**: Переопределения для production окружения
- **Применение**: Вручную через флаг `-f`
- **Содержит**: Production-специфичные настройки
- **Пример**: Ограниченный доступ к портам, увеличенные ресурсы

## 🚀 Команды запуска

### Development (по умолчанию)

```bash
# Автоматически применяется override
docker-compose up -d

# Эквивалентно:
docker-compose -f docker-compose.yml -f docker-compose.override.yml up -d
```

### Production

```bash
# Применяется production override
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d
```

### Только базовая конфигурация

```bash
# Без override файлов
docker-compose -f docker-compose.yml up -d
```

## 🔧 Принцип работы

1. **Базовый файл** загружается первым
2. **Override файлы** применяются по порядку и переопределяют настройки
3. **Последний файл** имеет приоритет над предыдущими

## 📝 Примеры переопределений

### Development Override

```yaml
services:
  postgres:
    environment:
      - POSTGRES_PASSWORD=password # Простой пароль для dev
    ports:
      - '5433:5432' # Публичный порт
```

### Production Override

```yaml
services:
  postgres:
    environment:
      - POSTGRES_PASSWORD=${POSTGRES_PASSWORD} # Безопасный пароль
    ports:
      - '127.0.0.1:5433:5432' # Только локальный доступ
```

## ✅ Преимущества такого подхода

- ✅ **Разделение конфигураций** по окружениям
- ✅ **Безопасность** - production настройки отдельно
- ✅ **Удобство** - development работает "из коробки"
- ✅ **Гибкость** - легко добавлять новые окружения
- ✅ **Читаемость** - понятно что где используется

## 🎯 Рекомендации

1. **Основной файл** - только общие настройки
2. **Override файлы** - специфичные для окружения
3. **Переменные окружения** - для секретных данных
4. **Документация** - комментируйте назначение каждого файла
