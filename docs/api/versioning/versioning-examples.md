# 📝 Практические примеры версионирования

## 🎯 Текущая версия проекта

**Space4Quizlet Server: `0.1.0`**

Это означает:

- `0` - проект еще не готов для продакшена
- `1` - первая значимая версия с базовым функционалом
- `0` - нет исправлений в этой версии

## 📋 Примеры изменений и версий

### 🔐 Аутентификация (уже реализовано)

**Текущее состояние:** `0.1.0`

Если бы мы добавляли аутентификацию сейчас:

```bash
# Добавляем JWT аутентификацию
git commit -m "feat: add JWT authentication"
npm run version:minor  # 0.1.0 → 0.2.0

# Исправляем баг в refresh токенах
git commit -m "fix: resolve refresh token bug"
npm run version:patch  # 0.2.0 → 0.2.1

# Улучшаем валидацию паролей
git commit -m "fix: improve password validation"
npm run version:patch  # 0.2.1 → 0.2.2
```

### 👤 Модуль пользователей (уже реализовано)

```bash
# Добавляем CRUD для пользователей
git commit -m "feat: add user management module"
npm run version:minor  # 0.2.2 → 0.3.0

# Исправляем баг с обновлением профиля
git commit -m "fix: fix profile update bug"
npm run version:patch  # 0.3.0 → 0.3.1
```

### 📚 Наборы карточек (планируется)

```bash
# Добавляем базовый CRUD для наборов
git commit -m "feat: add basic set management"
npm run version:minor  # 0.3.1 → 0.4.0

# Исправляем баг с удалением наборов
git commit -m "fix: fix set deletion bug"
npm run version:patch  # 0.4.0 → 0.4.1

# Добавляем пагинацию для списка наборов
git commit -m "feat: add pagination to sets list"
npm run version:minor  # 0.4.1 → 0.5.0
```

### 🃏 Карточки (планируется)

```bash
# Добавляем модуль карточек
git commit -m "feat: add card management module"
npm run version:minor  # 0.5.0 → 0.6.0

# Исправляем баг с созданием карточек
git commit -m "fix: fix card creation bug"
npm run version:patch  # 0.6.0 → 0.6.1

# Добавляем поддержку изображений
git commit -m "feat: add image support for cards"
npm run version:minor  # 0.6.1 → 0.7.0
```

## 🚀 Дорога к первому релизу

### Текущий прогресс: `0.1.0`

**Что уже готово:**

- ✅ Базовая структура приложения
- ✅ JWT аутентификация
- ✅ Модуль пользователей
- ✅ Конфигурация и документация

**Что нужно для MVP (`1.0.0`):**

1. **Set Module** (наборы карточек)

   ```bash
   # Добавляем базовый CRUD для наборов
   npm run version:minor  # 0.1.0 → 0.2.0
   ```

2. **Card Module** (карточки)

   ```bash
   # Добавляем управление карточками
   npm run version:minor  # 0.2.0 → 0.3.0
   ```

3. **Study Module** (изучение)

   ```bash
   # Добавляем базовый режим изучения
   npm run version:minor  # 0.3.0 → 0.4.0
   ```

4. **Тестирование и стабилизация**

   ```bash
   # Исправляем критические баги
   npm run version:patch  # 0.4.0 → 0.4.1
   npm run version:patch  # 0.4.1 → 0.4.2
   ```

5. **Первый релиз**
   ```bash
   # MVP готов!
   npm run version:major  # 0.4.2 → 1.0.0
   ```

## 🔄 Workflow версионирования

### 1. Разработка функции

```bash
# Создаем ветку для новой функции
git checkout -b feature/set-management

# Делаем изменения
git add .
git commit -m "feat: add set creation endpoint"

# Пушим изменения
git push origin feature/set-management
```

### 2. Code Review и Merge

```bash
# Создаем Pull Request
# Проходим ревью
# Мержим в main
git checkout main
git pull origin main
```

### 3. Версионирование

```bash
# Определяем тип изменений
# Новые функции = minor
npm run version:minor

# Проверяем новую версию
cat package.json | grep version

# Пушим изменения и теги
git push origin main --tags
```

### 4. Обновление CHANGELOG

```markdown
## [0.2.0] - 2024-12-19

### Added

- Set management module
- CRUD operations for sets
- Set validation

### Changed

- Updated API documentation

### Fixed

- Minor bug fixes
```

## 🎯 Рекомендации

### Для Space4Quizlet:

1. **Начните с `0.1.0`** - у нас уже есть базовая структура
2. **Используйте minor для новых модулей** - Set, Card, Study
3. **Используйте patch для исправлений** - баги, улучшения
4. **Достигните `1.0.0` для MVP** - когда основные функции готовы
5. **Ведите changelog** - документируйте все изменения

### Команды для запоминания:

```bash
# Увеличить patch версию (исправления)
npm run version:patch

# Увеличить minor версию (новые функции)
npm run version:minor

# Увеличить major версию (критические изменения)
npm run version:major

# Посмотреть текущую версию
npm version

# Создать git тег
git tag -a v0.2.0 -m "Add set management module"
```

---

_Эти примеры помогут вам правильно вести версионирование в проекте Space4Quizlet._
