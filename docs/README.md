# 📚 Документация Space4Quizlet Server

## 🎯 Обзор

Добро пожаловать в документацию Space4Quizlet Server! Здесь вы найдете всю необходимую информацию для работы с проектом.

## 🛠️ Технический стек

### Основные технологии

- **Node.js**: 22.18.0 (зафиксировано через Volta)
- **Bun**: 1.2.9 (менеджер пакетов и рантайм)
- **NestJS**: 11.0.1 (фреймворк)
- **PostgreSQL**: 15+ (база данных)
- **Prisma**: 6.11.1 (ORM)

### Ключевые пакеты

- **compression**: 1.8.1 (сжатие HTTP ответов)
- **helmet**: 8.1.0 (безопасность HTTP заголовков)
- **@nestjs/jwt**: 11.0.0 (JWT аутентификация)
- **argon2**: 0.43.0 (хеширование паролей)
- **zod**: 4.0.10 (валидация схем)

## 📋 Быстрый старт

### 🚀 Установка за 5 минут

Следуйте [инструкции по быстрой установке](setup.md) для запуска проекта.

### 📖 Основные разделы

- [**Установка и настройка**](setup.md) - полное руководство по установке
- [**Docker**](docker/README.md) - работа с контейнерами
- [**База данных**](database/README.md) - Prisma и PostgreSQL
- [**Разработка**](development/README.md) - команды и инструменты
- [**Версионирование**](versioning/README.md) - система версионирования
- [**Пакеты и зависимости**](development/packages.md) - информация о всех пакетах

## 🗂️ Структура документации

```
docs/
├── README.md                    # Эта страница
├── setup.md                     # Установка и настройка
├── docker/                      # Docker документация
│   ├── README.md               # Основная документация
│   ├── quick-start.md          # Быстрый старт
│   └── guide.md                # Подробный гайд
├── database/                    # Документация по БД
│   └── README.md               # Основная документация
├── versioning/                  # Версионирование
│   ├── README.md               # Основная документация
│   ├── versioning-guide.md     # Руководство по версионированию
│   ├── versioning-examples.md  # Примеры версионирования
│   ├── simple-versioning.md    # Простое версионирование API
│   └── auto-versioning.md      # Автоматическое получение версии
└── development/                 # Разработка
    ├── README.md               # Основная документация
    ├── packages.md             # Пакеты и зависимости
    ├── api-docs.md             # API документация
    ├── architecture/           # Архитектура
    │   ├── README.md           # Основная документация
    │   ├── architecture-guide.md # Архитектурный гайд
    │   ├── api-versioning.md   # Версионирование API
    │   └── auto-versioning-example.md # Примеры
    ├── standards/              # Стандарты
    │   ├── README.md           # Основная документация
    │   ├── coding-standards.md # Стандарты кодирования
    │   └── husky-setup.md      # Настройка Git hooks
    └── setup/                  # Настройка
        ├── README.md           # Основная документация
        ├── password-setup.md   # Настройка паролей
        └── ports.md            # Порты и конфигурация
```

## 🔗 Полезные ссылки

### Внешние ресурсы

- [NestJS Documentation](https://docs.nestjs.com)
- [Bun Documentation](https://bun.sh/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)

### Сообщество

- [NestJS Discord](https://discord.gg/G7Qnnhy)
- [Bun Discord](https://bun.sh/discord)
- [Prisma Discord](https://discord.gg/prisma)

## 🤝 Поддержка

Если у вас есть вопросы или предложения по документации:

1. Создайте issue в репозитории
2. Обратитесь к разделу [Разработка](development/README.md)
3. Присоединитесь к сообществу в Discord
