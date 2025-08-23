# 👨‍💻 Для разработчиков

Добро пожаловать в руководство для разработчиков Space4Quizlet Server!

## 🎯 Кому адресовано

Этот раздел предназначен для:

- **Разработчиков** - которые работают с кодом
- **Контрибьюторов** - которые хотят внести вклад в проект
- **DevOps инженеров** - которые развертывают приложение

## 📋 Что вы найдете

### Стандарты разработки

- **[Стандарты кодирования](standards/coding-standards.md)** - Правила написания кода
- **[Git workflow](git-workflow.md)** - Рабочий процесс с Git
- **[Инструменты](tools.md)** - Используемые инструменты разработки

### Архитектура и паттерны

- **[Архитектура проекта](../architecture/README.md)** - Общая архитектура
- **[Модули](../architecture/modules.md)** - Описание модулей
- **[Паттерны](../architecture/patterns.md)** - Используемые паттерны

### Разработка

- **[Установка и настройка](../getting-started/installation.md)** - Первые шаги
- **[API документация](../api/README.md)** - Работа с API
- **[База данных](../database/README.md)** - Работа с БД

## 🚀 Быстрый старт для разработчиков

### 1. Настройка окружения

```bash
# Клонирование репозитория
git clone <repository-url>
cd s4q-server

# Установка зависимостей
bun install

# Настройка окружения
cp env.example .env
# Отредактируйте .env файл

# Запуск базы данных
docker-compose up -d postgres

# Настройка БД
bun run prisma:generate
bun run prisma:db:push
```

### 2. Запуск в режиме разработки

```bash
# Запуск с hot reload
bun run start:dev

# В другом терминале - логи
docker-compose logs -f postgres
```

### 3. Полезные команды

```bash
# Линтинг и форматирование
bun run lint
bun run format

# Тестирование
bun run test
bun run test:watch

# Работа с БД
bun run prisma:studio
bun run prisma:generate
bun run prisma:db:push
```

## 🔧 Инструменты разработки

### Основные инструменты

- **Bun** - JavaScript runtime и менеджер пакетов
- **NestJS** - Фреймворк для Node.js
- **Prisma** - ORM для работы с базой данных
- **PostgreSQL** - Реляционная база данных

### Инструменты качества кода

- **ESLint** - Линтер для JavaScript/TypeScript
- **Prettier** - Форматировщик кода
- **Husky** - Git hooks
- **lint-staged** - Линтинг только измененных файлов

### Инструменты разработки

- **Docker** - Контейнеризация
- **Swagger** - API документация
- **Jest** - Тестирование
- **Prisma Studio** - GUI для базы данных

## 📝 Рабочий процесс

### 1. Создание новой функции

```bash
# Создание новой ветки
git checkout -b feature/new-feature

# Разработка
# ... пишем код ...

# Линтинг и тесты
bun run lint
bun run test

# Коммит
git add .
git commit -m "feat: add new feature"

# Push
git push origin feature/new-feature
```

### 2. Code Review

- Создайте Pull Request
- Убедитесь, что все тесты проходят
- Запросите review у команды
- Внесите изменения по замечаниям

### 3. Слияние

- После одобрения PR
- Слияние в main ветку
- Удаление feature ветки

## 🧪 Тестирование

### Типы тестов

- **Unit тесты** - тестирование отдельных функций
- **Integration тесты** - тестирование взаимодействия компонентов
- **E2E тесты** - тестирование полного пользовательского сценария

### Запуск тестов

```bash
# Все тесты
bun run test

# Тесты в watch режиме
bun run test:watch

# Покрытие кода
bun run test:cov

# E2E тесты
bun run test:e2e
```

## 🔍 Отладка

### Логирование

```typescript
// В сервисах
this.logger.log('Info message');
this.logger.warn('Warning message');
this.logger.error('Error message');
```

### Отладка в VS Code

```json
// .vscode/launch.json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Debug NestJS",
      "program": "${workspaceFolder}/src/main.ts",
      "runtimeArgs": ["-r", "ts-node/register"],
      "env": {
        "NODE_ENV": "development"
      }
    }
  ]
}
```

## 📚 Полезные ссылки

### Документация

- [NestJS Documentation](https://docs.nestjs.com)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Bun Documentation](https://bun.sh/docs)

### Сообщество

- [NestJS Discord](https://discord.gg/G7Qnnhy)
- [Prisma Discord](https://discord.gg/prisma)
- [Bun Discord](https://bun.sh/discord)

## 🤝 Вклад в проект

### Как внести вклад

1. **Fork репозитория**
2. **Создайте feature ветку**
3. **Следуйте стандартам кодирования**
4. **Напишите тесты**
5. **Создайте Pull Request**

### Что можно улучшить

- **Документация** - улучшение существующей документации
- **Тесты** - добавление новых тестов
- **Функциональность** - реализация новых функций
- **Производительность** - оптимизация кода
- **Безопасность** - улучшение безопасности

## 🆘 Нужна помощь?

Если у вас есть вопросы:

1. Проверьте [FAQ](../faq.md)
2. Ознакомьтесь с [Troubleshooting](../troubleshooting.md)
3. Создайте issue в GitHub репозитории
4. Обратитесь к команде разработки

## 📋 Чек-лист для разработчиков

### Перед началом работы

- [ ] Ознакомились со стандартами кодирования
- [ ] Настроили окружение разработки
- [ ] Изучили архитектуру проекта
- [ ] Поняли рабочий процесс с Git

### Во время разработки

- [ ] Следуете стандартам кодирования
- [ ] Пишете тесты для нового кода
- [ ] Обновляете документацию
- [ ] Проверяете код линтером

### Перед коммитом

- [ ] Все тесты проходят
- [ ] Код отформатирован
- [ ] Линтер не выдает ошибок
- [ ] Написано понятное сообщение коммита

### Перед PR

- [ ] Код протестирован
- [ ] Документация обновлена
- [ ] Описаны изменения в PR
- [ ] Запрошен code review
