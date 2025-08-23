# 📚 Документация Space4Quizlet Server

Добро пожаловать в документацию Space4Quizlet Server - современного NestJS приложения для изучения языков.

## 🚀 Быстрый старт

- **[Установка и настройка](getting-started/installation.md)** - Первые шаги для запуска проекта
- **[Первые шаги](getting-started/first-steps.md)** - Быстрый старт после установки
- **[Настройка окружения](getting-started/environment-setup.md)** - Конфигурация переменных окружения

## 🗄️ База данных

- **[Обзор базы данных](database/README.md)** - Архитектура и структура БД
- **[Руководство по миграциям](database/migrations-guide.md)** - Управление миграциями через терминал
- **[Схема данных](database/schema-guide.md)** - Описание моделей и связей

## 🔌 API

- **[Документация API](api/README.md)** - Обзор API endpoints
- **[Версионирование API](api/versioning.md)** - Система версионирования
- **[Аутентификация](api/authentication.md)** - JWT аутентификация и авторизация
- **[Endpoints](api/endpoints/)** - Подробная документация по endpoints

## 🏗️ Архитектура

- **[Обзор архитектуры](architecture/README.md)** - Общая архитектура проекта
- **[Модули](architecture/modules.md)** - Описание модулей приложения
- **[Паттерны](architecture/patterns.md)** - Используемые паттерны проектирования

## 🚀 Развертывание

- **[Docker](deployment/docker.md)** - Работа с контейнерами
- **[Production](deployment/production.md)** - Развертывание в продакшене
- **[Мониторинг](deployment/monitoring.md)** - Мониторинг и логирование

## 👨‍💻 Для разработчиков

- **[Стандарты кодирования](contributing/coding-standards.md)** - Правила и стандарты
- **[Git workflow](contributing/git-workflow.md)** - Рабочий процесс с Git
- **[Инструменты](contributing/tools.md)** - Используемые инструменты разработки

## 📋 Справочники

- **[Troubleshooting](troubleshooting.md)** - Решение常见 проблем
- **[FAQ](faq.md)** - Часто задаваемые вопросы
- **[Changelog](../../CHANGELOG.md)** - История изменений

## 🎯 Навигация по проекту

### Основные технологии

- **NestJS** - Прогрессивный Node.js фреймворк
- **Bun** - Быстрый JavaScript runtime
- **Prisma ORM** - Современный ORM для TypeScript
- **PostgreSQL** - Надежная реляционная база данных
- **Docker** - Контейнеризация для разработки

### Структура проекта

```
src/
├── modules/                    # Бизнес-модули
│   ├── auth/                  # Аутентификация
│   ├── user/                  # Пользователи
│   ├── card/                  # Карточки
│   └── set/                   # Наборы
├── infrastructure/            # Инфраструктура
│   ├── database/             # База данных
│   └── config/               # Конфигурация
└── shared/                   # Общие компоненты
    ├── decorators/           # Декораторы
    ├── guards/               # Guards
    └── utils/                # Утилиты
```

## 🤝 Вклад в проект

Хотите внести вклад в проект? Ознакомьтесь с [руководством для разработчиков](contributing/README.md).

## 📞 Поддержка

Если у вас есть вопросы или проблемы:

1. Проверьте [FAQ](faq.md) и [Troubleshooting](troubleshooting.md)
2. Создайте issue в GitHub репозитории
3. Обратитесь к команде разработки
