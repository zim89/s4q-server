# Prisma Schema - Модульная структура

## 📁 Структура файлов

```
src/infrastructure/database/schema/
├── schema.prisma          # Основной файл (generator + datasource)
├── enums/                 # Енумы по доменам
│   ├── user.enums.prisma      # Роли пользователей
│   ├── language.enums.prisma  # Языковые характеристики
│   ├── progress.enums.prisma  # Статусы прогресса
│   ├── learning.enums.prisma  # Обучение и достижения
│   ├── content.enums.prisma   # Контент и медиа
│   └── system.enums.prisma    # Системные функции
├── models/                # Модели по доменам
│   ├── user.prisma           # Пользователи
│   ├── session.prisma        # Сессии пользователей
│   ├── achievement.prisma    # Достижения
│   ├── language.prisma       # Языки
│   ├── grammar-rule.prisma   # Грамматические правила
│   ├── irregular-verb.prisma # Неправильные глаголы
│   ├── card.prisma           # Карточки
│   ├── definition.prisma     # Определения
│   ├── example.prisma        # Примеры
│   ├── tag.prisma            # Теги
│   ├── set.prisma            # Наборы карточек
│   ├── user-set.prisma       # Наборы пользователей
│   ├── folder.prisma         # Папки
│   ├── user-card.prisma      # Карточки пользователей
│   ├── progress.prisma       # Прогресс изучения
│   ├── exercise-progress.prisma # Прогресс по упражнениям
│   └── audit-log.prisma      # Логи аудита
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

Управление пользователями, аутентификация и профили

- `User` - пользователи системы с ролями и настройками
- `Session` - сессии пользователей для безопасности
- `Achievement` - достижения пользователей

### Language Domain

Языковые характеристики и грамматика

- `Language` - поддерживаемые языки
- `GrammarRule` - грамматические правила
- `IrregularVerb` - неправильные глаголы с формами

### Content Domain

Контент для изучения

- `Card` - карточки с словами, фразами и глаголами
- `Definition` - определения к карточкам
- `Example` - примеры использования
- `Tag` - теги для категоризации

### Learning Domain

Организация обучения

- `Set` - наборы карточек
- `UserSet` - наборы пользователей с прогрессом
- `Folder` - папки для организации
- `UserCard` - персональные данные карточек пользователей

### Progress Domain

Отслеживание прогресса и аналитика

- `Progress` - общий прогресс изучения наборов
- `ExerciseProgress` - детальный прогресс по упражнениям
- `AuditLog` - логи действий пользователей

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
