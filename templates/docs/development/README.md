# 🔧 Разработка

## 🎯 Обзор

Руководство по разработке Space4Quizlet Server с использованием NestJS и Bun.

## 📋 Требования

- **Node.js 22.18.0** - зафиксировано через Volta
- **Bun 1.2.9+** - JavaScript runtime и менеджер пакетов
- **Docker** - для базы данных
- **Git** - система контроля версий
- **Volta** - менеджер версий Node.js (рекомендуется)

## 🚀 Команды разработки

### Основные команды

```bash
# Development режим (с hot reload)
bun run dev

# Production режим
bun run start:prod

# Сборка проекта
bun run build

# Линтинг
bun run lint

# Форматирование кода
bun run format
```

### Тестирование

```bash
# Unit тесты
bun run test

# E2E тесты
bun run test:e2e

# Покрытие тестами
bun run test:cov

# Запуск тестов в watch режиме
bun run test:watch
```

### База данных

```bash
# Генерация Prisma Client
bun run prisma:generate

# Применение схемы
bun run prisma:db:push

# Создание миграции
bun run prisma:migrate:dev

# Prisma Studio
bun run prisma:studio

# Заполнение тестовыми данными
bun run db:seed
```

## 📁 Структура проекта

```
src/
├── api/                    # API модули
│   ├── auth/              # Аутентификация
│   ├── user/              # Пользователи
│   └── set/               # Наборы карточек
├── config/                # Конфигурация
├── infrastructure/        # Инфраструктура
│   └── database/          # База данных
├── integrations/          # Внешние интеграции
└── shared/               # Общие утилиты
```

## 🔧 Инструменты разработки

### IDE настройки

- **VS Code** - рекомендуемый редактор
- **ESLint** - линтинг кода
- **Prettier** - форматирование
- **TypeScript** - типизация

### Отладка

```bash
# Запуск с отладкой
bun run dev:debug

# Логирование
bun run dev:verbose
```

## 📊 Мониторинг

### Логи

```bash
# Просмотр логов приложения
tail -f logs/app.log

# Логи базы данных
docker-compose logs postgres
```

### Метрики

- **Health checks** - `http://localhost:3001/health`
- **Swagger документация** - `http://localhost:3001/api-docs`
- **Prisma Studio** - `bun run prisma:studio`

## 🐛 Troubleshooting

### Частые проблемы

- [Решение проблем](troubleshooting.md)
- [Команды разработки](commands.md)

### Отладка

```bash
# Проверка зависимостей
bun install

# Очистка кэша
bun run clean

# Перезапуск БД
docker-compose restart postgres
```

## 📚 Документация

- [Пакеты и зависимости](packages.md) - информация о всех пакетах
- [Команды разработки](commands.md) - все доступные команды
- [Troubleshooting](troubleshooting.md) - решение проблем
- [Настройка паролей](password-setup.md) - безопасная настройка паролей
- [Порты и конфигурация](ports.md) - настройка портов
- [API Documentation](api-docs.md) - Swagger документация
- [База данных](../database/README.md) - работа с БД
- [Docker](../docker/README.md) - контейнеризация
