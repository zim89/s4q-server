# 🚀 NestJS Backend Template

Современный шаблон для создания NestJS бэкенд приложений с аутентификацией и пользователями.

## 🛠️ Технический стек

- **Node.js**: 22.18.0 (зафиксировано через Volta)
- **Bun**: 1.2.9+ (менеджер пакетов и рантайм)
- **NestJS**: 11.0.1 (фреймворк)
- **PostgreSQL**: 15+ (база данных)
- **Prisma**: 6.11.1 (ORM)

## 📦 Включенные модули

### ✅ Основные модули

- **Auth Module** - JWT аутентификация с refresh токенами
- **User Module** - управление пользователями
- **Database Module** - Prisma интеграция
- **Config Module** - конфигурация приложения

### 🔧 Инфраструктура

- **Compression** - сжатие HTTP ответов
- **Helmet** - безопасность HTTP заголовков
- **Argon2** - хеширование паролей
- **Zod** - валидация схем
- **Swagger** - API документация

## 🚀 Быстрый старт

### 1. Клонирование и настройка

```bash
# Скопируйте содержимое templates/ в новый проект
cp -r templates/* your-new-project/

# Перейдите в директорию проекта
cd your-new-project

# Установите зависимости
bun install
```

### 2. Настройка окружения

```bash
# Скопируйте пример конфигурации
cp env.example .env.local

# Отредактируйте .env.local
# Укажите настройки базы данных и JWT секреты
```

### 3. Запуск базы данных

```bash
# Запустите PostgreSQL через Docker
docker-compose up -d

# Или используйте локальную PostgreSQL
```

### 4. Настройка БД

```bash
# Сгенерируйте Prisma клиент
bun run prisma:generate

# Примените схему к БД
bun run prisma:db:push
```

### 5. Запуск приложения

```bash
# Development режим
bun run start:dev

# Production режим
bun run build
bun run start:prod
```

## 📁 Структура проекта

```
src/
├── main.ts                    # Точка входа
├── app.module.ts             # Главный модуль
├── app.controller.ts         # Основной контроллер
├── modules/                  # Бизнес-модули
│   ├── auth/                # Аутентификация
│   └── user/                # Пользователи
├── shared/                  # Общие утилиты
├── config/                  # Конфигурация
└── infrastructure/          # Инфраструктура
    └── database/           # База данных
```

## 🔐 Аутентификация

### Endpoints

- `POST /auth/register` - регистрация
- `POST /auth/login` - вход
- `POST /auth/refresh` - обновление токена
- `POST /auth/logout` - выход

### Особенности

- JWT токены с refresh механизмом
- Хеширование паролей через Argon2
- Защищенные роуты с Guards
- Автоматическая валидация через DTO

## 👥 Пользователи

### Endpoints

- `GET /user` - получить профиль
- `PATCH /user` - обновить профиль
- `DELETE /user` - удалить аккаунт

### Модель пользователя

- Email (уникальный)
- Пароль (хешированный)
- Имя и фамилия
- Роли и права доступа

## 🗄️ База данных

### Prisma Schema

- User модель с аутентификацией
- Session модель для refresh токенов
- Готовые миграции

### Команды

```bash
# Генерация клиента
bun run prisma:generate

# Применение миграций
bun run prisma:db:push

# Создание миграции
bun run prisma:migrate:dev

# Prisma Studio
bun run prisma:studio
```

## 🔧 Конфигурация

### Переменные окружения

```env
# База данных
DATABASE_URL=postgresql://user:password@localhost:5432/dbname

# JWT
JWT_SECRET=your-secret-key
JWT_REFRESH_SECRET=your-refresh-secret

# Приложение
PORT=4000
NODE_ENV=development
```

## 📚 Документация

- [API Documentation](docs/development/api-docs.md)
- [Архитектурный гайд](docs/development/architecture-guide.md)
- [Пакеты и зависимости](docs/development/packages.md)
- [Стандарты кодирования](docs/development/coding-standards.md)

## 🐳 Docker

### Команды

```bash
# Development
docker-compose up -d

# Production
docker-compose -f docker-compose.prod.yml up -d
```

## 🧪 Тестирование

```bash
# Unit тесты
bun run test

# E2E тесты
bun run test:e2e

# Покрытие
bun run test:cov
```

## 📦 Полезные команды

```bash
# Линтинг
bun run lint

# Форматирование
bun run format

# Сборка
bun run build

# Запуск в production
bun run start:prod
```

## 🔄 Кастомизация

### Добавление новых модулей

1. Создайте папку в `src/modules/`
2. Создайте контроллер, сервис, модуль
3. Добавьте в `app.module.ts`

### Изменение схемы БД

1. Отредактируйте `src/infrastructure/database/schema/`
2. Создайте миграцию: `bun run prisma:migrate:dev`

### Настройка аутентификации

1. Измените JWT стратегию в `src/modules/auth/`
2. Настройте Guards для защиты роутов

## 🚀 Готово к использованию!

Этот шаблон предоставляет:

- ✅ Готовую аутентификацию
- ✅ Управление пользователями
- ✅ Безопасную конфигурацию
- ✅ Современные инструменты
- ✅ Полную документацию

Начните разработку прямо сейчас! 🎯
