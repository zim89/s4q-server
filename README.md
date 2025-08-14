<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## 🚀 Описание

Space4Quizlet Server - это NestJS приложение для изучения языков с использованием современных технологий:

- **NestJS** - прогрессивный Node.js фреймворк
- **Bun** - быстрый JavaScript runtime
- **Prisma** - современный ORM для TypeScript
- **PostgreSQL** - надежная реляционная БД
- **Docker** - контейнеризация для разработки

## 📋 Требования

- **Bun** - [Установка Bun](https://bun.sh/docs/installation)
- **Docker** - [Установка Docker](https://docs.docker.com/get-docker/)
- **Docker Compose** - обычно идет с Docker

## 🚀 Быстрый старт

### 1. Клонирование репозитория

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
# Скопируйте пример файла окружения
cp env.example .env.local

# Отредактируйте переменные окружения
nano .env.local
```

### 4. Запуск базы данных

```bash
# Запуск PostgreSQL
docker-compose up -d

# Проверка статуса
docker-compose ps
```

### 5. Настройка базы данных

```bash
# Генерация Prisma Client
bun run prisma:generate

# Применение схемы к БД
bun run prisma:db:push

# Заполнение тестовыми данными (опционально)
bun run db:seed
```

### 6. Запуск приложения

```bash
# Development режим
bun run dev

# Или production режим
bun run start:prod
```

### 7. Проверка работы

- API: http://localhost:3001
- Swagger документация: http://localhost:3001/api-docs

## 🐳 Docker Setup

### Quick Start

```bash
# Development
docker-compose up -d

# Production
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d
```

### Documentation

- [📚 Полная документация](docs/README.md)
- [🚀 Быстрая установка](docs/setup.md)
- [🐳 Docker](docs/docker/README.md)
- [🗄️ База данных](docs/database/README.md)
- [🔧 Разработка](docs/development/README.md)

## 🗄️ База данных

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

## 🔧 Команды разработки

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

## 🧪 Тестирование

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

## 🚀 Развертывание

### Подготовка к production

```bash
# Сборка приложения
bun run build

# Проверка production сборки
bun run start:prod
```

### Переменные окружения для production

```env
NODE_ENV=production
POSTGRES_URI=postgresql://user:password@host:5432/database
JWT_SECRET=your_jwt_secret
JWT_REFRESH_SECRET=your_refresh_secret
```

### Docker для production

```bash
# Запуск с production конфигурацией
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d
```

## 📚 Полезные ресурсы

### Документация

- [NestJS Documentation](https://docs.nestjs.com) - официальная документация NestJS
- [Bun Documentation](https://bun.sh/docs) - документация Bun runtime
- [Prisma Documentation](https://www.prisma.io/docs) - документация Prisma ORM
- [PostgreSQL Documentation](https://www.postgresql.org/docs/) - документация PostgreSQL

### Сообщество

- [NestJS Discord](https://discord.gg/G7Qnnhy) - сообщество NestJS
- [Bun Discord](https://bun.sh/discord) - сообщество Bun
- [Prisma Discord](https://discord.gg/prisma) - сообщество Prisma

### Инструменты разработки

- [NestJS Devtools](https://devtools.nestjs.com) - инструменты для разработки
- [Prisma Studio](https://www.prisma.io/studio) - GUI для работы с БД

## 🤝 Поддержка

Этот проект использует MIT лицензию. Если у вас есть вопросы или предложения, создайте issue в репозитории.

## 📄 Лицензия

MIT License - см. файл [LICENSE](LICENSE) для подробностей.
