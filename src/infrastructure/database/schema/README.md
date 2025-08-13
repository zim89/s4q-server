# Prisma Schema - Модульная структура

## 📁 Структура файлов

```
src/infrastructure/database/schema/
├── schema.prisma          # Основной файл (generator + datasource)
├── enums/                 # Енумы по доменам
│   ├── user.enums.prisma
│   ├── language.enums.prisma
│   └── progress.enums.prisma
├── models/                # Модели по доменам
│   ├── user.model.prisma
│   ├── session.model.prisma
│   ├── achievement.model.prisma
│   ├── language.model.prisma
│   ├── grammar-rule.model.prisma
│   ├── verb-form.model.prisma
│   ├── card.model.prisma
│   ├── definition.model.prisma
│   ├── example.model.prisma
│   ├── tag.model.prisma
│   ├── set.model.prisma
│   ├── user-set.model.prisma
│   ├── folder.model.prisma
│   ├── user-card.model.prisma
│   ├── progress.model.prisma
│   └── audit-log.model.prisma
├── migrations/            # Миграции базы данных
│   └── README.md
└── README.md
```

## 🚀 Использование

### Команды для работы с Prisma:

```bash
# Генерировать Prisma Client
npm run prisma:generate

# Создать миграцию
npm run prisma:migrate

# Применить миграции в продакшене
npm run prisma:deploy

# Открыть Prisma Studio
npm run prisma:studio
```

## 📝 Как это работает

1. **Multi-file Schema** - Prisma нативно поддерживает разделение схемы на файлы (v6.7.0+)
2. **Автоматическое обнаружение** - Prisma автоматически находит все `.prisma` файлы в папке
3. **Настройка в package.json** - указываем `"prisma": { "schema": "./src/infrastructure/database/schema" }`

## 🔧 Добавление новых моделей/енумов

1. Создайте новый файл в соответствующей папке (`models/` или `enums/`)
2. Добавьте модель/енум в файл
3. Создайте миграцию: `npm run prisma:migrate`

## 📋 Домены

### User Domain

- `User` - пользователи
- `Session` - сессии пользователей
- `Achievement` - достижения

### Language Domain

- `Language` - языки
- `GrammarRule` - грамматические правила
- `VerbForm` - формы глаголов

### Content Domain

- `Card` - карточки
- `Definition` - определения
- `Example` - примеры
- `Tag` - теги

### Learning Domain

- `Set` - наборы карточек
- `UserSet` - наборы пользователей
- `Folder` - папки
- `UserCard` - карточки пользователей

### Progress Domain

- `Progress` - прогресс изучения
- `AuditLog` - логи аудита

## ⚠️ Важные замечания

- **Всегда используйте npm скрипты** для работы с Prisma
- **Редактируйте файлы в папках `models/` и `enums/`**
- **Prisma автоматически обнаружит все изменения**

## 🎯 Преимущества

✅ **Модульность** - каждая модель в отдельном файле  
✅ **Организация** - группировка по доменам  
✅ **Читаемость** - легче найти нужную модель  
✅ **Масштабируемость** - легко добавлять новые модели  
✅ **Нативная поддержка** - Prisma автоматически работает с multi-file schema  
✅ **Логичное расположение** - schema находится в infrastructure/database

## 🏗️ Архитектурное решение

Schema размещена в `/src/infrastructure/database/schema/` потому что:

- **Infrastructure** - Prisma schema является частью инфраструктуры приложения
- **Database** - схема напрямую связана с базой данных
- **Schema** - содержит определения моделей и енумов

Это соответствует принципам Clean Architecture и делает структуру проекта более логичной.
