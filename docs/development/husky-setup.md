# Husky Setup - Проверка кода перед коммитом

## 📋 Обзор

Husky настроен для автоматической проверки кода перед каждым коммитом. Это гарантирует, что в репозиторий попадает только качественный код без ошибок.

## 🔧 Что проверяется

### Pre-commit хук (`.husky/pre-commit`)

1. **ESLint** - проверка и исправление ошибок линтера
2. **Prettier** - форматирование кода
3. **TypeScript** - проверка типов и компиляция

### Commit-msg хук (`.husky/commit-msg`)

1. **Длина сообщения** - минимум 10 символов
2. **Непустое сообщение** - сообщение не может быть пустым

## 📁 Структура файлов

```
.husky/
├── pre-commit      # Проверка кода перед коммитом
└── commit-msg      # Проверка сообщений коммитов
```

## ⚙️ Конфигурация

### Lint-staged (package.json)

```json
{
  "lint-staged": {
    "*.{ts,js}": ["eslint --fix", "prettier --write"],
    "*.{json,md,yml,yaml}": ["prettier --write"]
  }
}
```

### Pre-commit хук

```bash
echo "🔍 Проверка и исправление кода (lint-staged)..."
bunx lint-staged

echo "🔧 Проверка типов TypeScript..."
bun run build

echo "✅ Pre-commit проверки пройдены!"
```

## 🚀 Как это работает

1. **При коммите** - автоматически запускаются проверки
2. **Lint-staged** - проверяет только измененные файлы
3. **ESLint** - исправляет ошибки автоматически
4. **Prettier** - форматирует код
5. **TypeScript** - проверяет типы
6. **Если ошибки** - коммит блокируется

## ❌ Что блокирует коммит

- ESLint ошибки (которые нельзя исправить автоматически)
- Ошибки TypeScript компиляции
- Слишком короткие сообщения коммитов
- Пустые сообщения коммитов

## ✅ Преимущества

- **Качество кода** - только проверенный код попадает в репозиторий
- **Автоматизация** - не нужно помнить о проверках
- **Скорость** - lint-staged проверяет только измененные файлы
- **Консистентность** - единый стиль кода в проекте

## 🔧 Ручной запуск

```bash
# Запустить pre-commit проверки
bunx husky run .husky/pre-commit

# Запустить lint-staged
bunx lint-staged

# Проверить линтер
bun run lint

# Проверить типы
bun run build
```

## 🚨 Обход проверок (не рекомендуется)

```bash
# Пропустить pre-commit хуки
git commit -m "message" --no-verify

# Пропустить все хуки
git commit -m "message" --no-verify
```

## 📝 Расширение

### Добавление новых проверок

1. Отредактировать `.husky/pre-commit`
2. Добавить новые команды
3. Протестировать

### Настройка commitlint

```bash
# Установить commitlint
bun add -D @commitlint/cli @commitlint/config-conventional

# Создать конфигурацию
echo 'module.exports = {extends: ["@commitlint/config-conventional"]}' > commitlint.config.js

# Обновить commit-msg хук
echo 'bunx @commitlint/cli --edit $1' > .husky/commit-msg
```
