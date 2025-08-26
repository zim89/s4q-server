# Модуль карточек (Card Module)

## 📋 Обзор

Модуль карточек отвечает за создание, управление и поиск карточек для изучения языков. Карточки могут содержать слова, фразы, предложения и идиомы с различными уровнями сложности.

## 🏗️ Архитектура

### Основные компоненты:

- **CardController** - REST API endpoints для работы с карточками
- **CardService** - бизнес-логика создания и управления карточками
- **DTOs** - объекты передачи данных для валидации запросов
- **Swagger Decorators** - документация API

### Зависимости:

- **PrismaService** - работа с базой данных
- **ContentAnalyzerService** - анализ типа контента
- **DifficultyCalculatorService** - расчет сложности карточек

## 🚀 Функциональность

### Создание карточки

```typescript
POST /cards
{
  "wordOrPhrase": "beautiful",
  "partOfSpeech": "ADJECTIVE",
  "transcription": "ˈbjuːtɪfəl",
  "difficulty": "EASY"
}
```

#### Автоматическое определение полей:

1. **slug** - генерируется из `wordOrPhrase`
2. **languageId** - по умолчанию английский язык
3. **contentType** - всегда `TEXT`
4. **contentStatus** - по умолчанию `DRAFT`
5. **isGlobal** - по умолчанию `true`
6. **difficulty** - рассчитывается автоматически (если не указана)

### Поиск карточек

```typescript
GET /cards?page=1&limit=10&difficulty=EASY&partOfSpeech=NOUN&search=hello
```

#### Поддерживаемые фильтры:

- **difficulty** - сложность (EASY, MEDIUM, HARD)
- **partOfSpeech** - часть речи
- **search** - поиск по слову/фразе
- **page/limit** - пагинация
- **sort/order** - сортировка

## 🎵 Автоматическое получение транскрипции

Транскрипция автоматически получается из словаря **только для отдельных слов**:

### ✅ **Получаем транскрипцию:**

#### Обычные слова:

- `hello` → `həˈloʊ`
- `beautiful` → `ˈbyü-ti-fəl`
- `computer` → `kəmˈpyo͞otər`

#### Составные слова с дефисом:

- `self-driving` → `ˈself ˈdraɪvɪŋ`
- `well-known` → `ˈwel ˈnoʊn`
- `up-to-date` → `ˈʌp tuː ˈdeɪt`

#### Слова с апострофом:

- `don't` → `doʊnt`
- `can't` → `kænt`
- `it's` → `ɪts`

#### Сокращения с точкой:

- `e.g.` → `ˌiː ˈdʒiː`
- `i.e.` → `ˌaɪ ˈiː`
- `etc.` → `ɪt ˈsetrə`

### ❌ **НЕ получаем транскрипцию:**

#### Фразы и предложения:

- `hello world` (фраза)
- `look up` (фразовый глагол)
- `break a leg` (идиома)
- `Hello, how are you?` (предложение)

#### Числа и символы:

- `123` (число)
- `3.14` (дробное число)
- `@#$%` (специальные символы)

### 🔧 **Логика определения:**

Система использует `ContentAnalyzerService.isSingleWord()` для определения, является ли контент отдельным словом:

1. **Проверка на пробелы** - если есть пробелы, это не слово
2. **Проверка на знаки препинания** - предложения исключаются
3. **Проверка на числа** - числовые значения исключаются
4. **Проверка на специальные символы** - символы исключаются
5. **Поддержка составных слов** - слова с дефисом считаются словами

### 🌐 **Провайдеры:**

- **Merriam-Webster** (основной провайдер)
- **Free Dictionary API** (fallback провайдер)

### ⚠️ **Обработка ошибок:**

- Если словарь недоступен - карточка создается без транскрипции
- Ошибки логируются для отладки
- Пользователь может добавить транскрипцию вручную позже

## 🧠 Система определения сложности

### DifficultyCalculatorService

Сервис автоматически определяет сложность карточки на основе:

#### 1. Базовые слова (EASY)

- Артикли: `a`, `an`, `the`
- Местоимения: `I`, `you`, `he`, `she`, `it`
- Предлоги: `in`, `on`, `at`, `to`, `for`
- Союзы: `and`, `or`, `but`, `so`
- Глаголы-связки: `is`, `are`, `was`, `were`
- Базовые глаголы: `go`, `get`, `make`, `take`
- Базовые прилагательные: `good`, `bad`, `big`, `small`
- Базовые существительные: `time`, `day`, `house`, `car`

#### 2. Часть речи

- **EASY**: ARTICLE, PRONOUN, PREPOSITION, CONJUNCTION, INTERJECTION, PARTICLE
- **MEDIUM**: NOUN, VERB, ADJECTIVE, ADVERB, PHRASE, PHRASE_VERB
- **HARD**: IDIOM, SENTENCE

#### 3. Длина слова

- **1-4 символа**: EASY
- **5-7 символов**: EASY (если нет сложного произношения)
- **8-10 символов**: MEDIUM
- **11+ символов**: HARD

#### 4. Тип контента

- **Фразовые глаголы**: `look up`, `get out` → MEDIUM
- **Идиомы**: `break a leg`, `piece of cake` → HARD
- **Предложения**: по количеству слов (≤5: EASY, ≤10: MEDIUM, >10: HARD)
- **Фразы**: по количеству слов (≤3: EASY, ≤6: MEDIUM, >6: HARD)

#### 5. Сложность произношения

- Множественные согласные: `strength` → HARD
- Сложные окончания: `-tion`, `-sion`, `-cious` → HARD
- Необычные буквы: `q`, `j`, `x`, `z` → HARD

## 📊 Примеры создания карточек

| Слово/Фраза           | Часть речи  | Сложность | Транскрипция        | Причина            |
| --------------------- | ----------- | --------- | ------------------- | ------------------ |
| `the`                 | ARTICLE     | EASY      | ✅ `ðə`             | Базовое слово      |
| `hello`               | NOUN        | EASY      | ✅ `həˈloʊ`         | Короткое слово     |
| `beautiful`           | ADJECTIVE   | MEDIUM    | ✅ `ˈbyü-ti-fəl`    | Средняя длина      |
| `self-driving`        | ADJECTIVE   | HARD      | ✅ `ˈself ˈdraɪvɪŋ` | Составное слово    |
| `don't`               | VERB        | EASY      | ✅ `doʊnt`          | Слово с апострофом |
| `look up`             | PHRASE_VERB | MEDIUM    | ❌ `null`           | Фразовый глагол    |
| `break a leg`         | IDIOM       | HARD      | ❌ `null`           | Идиома             |
| `Hello, how are you?` | SENTENCE    | EASY      | ❌ `null`           | Предложение        |
| `123`                 | -           | -         | ❌ `null`           | Число              |

## 🔧 Текущие ограничения

### 1. Локальная логика

- ❌ Нет учета реальной частоты использования слов
- ❌ Нет данных о популярности в разных контекстах
- ❌ Ограниченный список базовых слов

### 2. Статичные правила

- ❌ Не учитывает уровень пользователя
- ❌ Нет адаптации к прогрессу обучения
- ❌ Жесткие границы сложности

### 3. Отсутствие контекста

- ❌ Нет учета темы/категории слова
- ❌ Не учитывает культурные особенности
- ❌ Нет связи с грамматическими правилами

## 🚀 Планы по улучшению

### Этап 1: Интеграция с внешними API (Следующий)

#### Datamuse API (бесплатный)

```typescript
// Получение частоты использования
const frequency = await datamuseService.getWordFrequency(word);
if (frequency > 1000) return CardDifficulty.EASY;
```

#### Google Books Ngram

```typescript
// Анализ частоты в литературе
const ngramData = await ngramService.getFrequency(word);
if (ngramData.frequency > 0.001) return CardDifficulty.EASY;
```

#### Wordnik API

```typescript
// Множественные источники данных
const wordnikData = await wordnikService.getWordInfo(word);
const difficulty = this.calculateFromMultipleSources(wordnikData);
```

### Этап 2: Машинное обучение (Будущее)

#### Признаки для ML модели:

- Длина слова/фразы
- Частота использования
- Сложность произношения
- Часть речи
- Морфологические характеристики
- Семантическая сложность

#### Предобученные модели:

- **BERT-based** для определения сложности
- **Word2Vec** для семантического анализа
- **Custom model** на основе корпуса текстов

### Этап 3: Персонализация (Долгосрочно)

#### Адаптивная сложность:

```typescript
// Учитываем прогресс пользователя
const userLevel = await this.getUserLevel(userId);
const adjustedDifficulty = this.adjustForUserLevel(baseDifficulty, userLevel);
```

#### Контекстное обучение:

```typescript
// Сложность зависит от темы
const topicDifficulty = await this.getTopicDifficulty(topicId);
const finalDifficulty = this.combineDifficulties(
  wordDifficulty,
  topicDifficulty
);
```

## 📈 Метрики и аналитика

### Отслеживаемые показатели:

- Количество созданных карточек
- Распределение по сложности
- Популярные слова/фразы
- Точность определения сложности
- Время создания карточки

### A/B тестирование:

- Сравнение алгоритмов определения сложности
- Тестирование новых правил
- Оценка пользовательского опыта

## 🔗 Интеграции

### Текущие:

- **Dictionary API** - получение транскрипции и аудио
- **Prisma** - работа с базой данных

### Планируемые:

- **Datamuse API** - частота использования слов
- **Google Books Ngram** - анализ литературной частоты
- **Wordnik API** - множественные источники данных
- **ML модели** - точное определение сложности

## 🧪 Тестирование

### Unit тесты:

```typescript
describe('DifficultyCalculatorService', () => {
  it('should return EASY for basic words', () => {
    expect(service.calculateDifficulty('the')).toBe(CardDifficulty.EASY);
  });

  it('should return HARD for complex words', () => {
    expect(service.calculateDifficulty('extraordinary')).toBe(
      CardDifficulty.HARD
    );
  });
});
```

### Integration тесты:

```typescript
describe('CardService', () => {
  it('should create card with calculated difficulty', async () => {
    const card = await service.create({ wordOrPhrase: 'hello' });
    expect(card.difficulty).toBe(CardDifficulty.EASY);
  });
});
```

## 📝 API документация

### Создание карточки

```typescript
POST /cards
Authorization: Bearer <token>
Content-Type: application/json

{
  "wordOrPhrase": "string",           // Обязательно
  "partOfSpeech": "PartOfSpeech",     // Опционально
  "transcription": "string",          // Опционально (автополучение из словаря)
  "audioUrl": "string",               // Опционально
  "imageUrl": "string",               // Опционально
  "difficulty": "CardDifficulty",     // Опционально (автоопределение)
  "isGlobal": "boolean",              // Опционально (true)
  "languageId": "string"              // Опционально (английский)
}
```

#### Примеры запросов:

**Простое слово (автоматическая транскрипция):**

```json
{
  "wordOrPhrase": "beautiful"
}
```

**Слово с указанной транскрипцией:**

```json
{
  "wordOrPhrase": "hello",
  "transcription": "həˈloʊ"
}
```

**Фраза (без транскрипции):**

```json
{
  "wordOrPhrase": "look up"
}
```

**Составное слово:**

```json
{
  "wordOrPhrase": "self-driving"
}
```

### Поиск карточек

```typescript
GET /cards?page=1&limit=10&difficulty=EASY&partOfSpeech=NOUN&search=hello
```

## 🔒 Безопасность

### Авторизация:

- Создание карточек: только ADMIN
- Просмотр карточек: публичный доступ
- Обновление/удаление: только ADMIN

### Валидация:

- Проверка на дубликаты (slug + partOfSpeech + languageId)
- Валидация входных данных через DTO
- Санитизация пользовательского ввода

## 🚀 Развертывание

### Переменные окружения:

```env
# Настройки пагинации
CARD_DEFAULT_LIMIT=10
CARD_MAX_LIMIT=100

# Настройки поиска
CARD_SEARCH_MIN_LENGTH=2
CARD_SEARCH_MAX_LENGTH=50
```

### Мониторинг:

- Логирование создания карточек
- Метрики производительности
- Алерты при ошибках

## 📚 Дополнительные ресурсы

- [Prisma Schema](../infrastructure/database/schema/models/card.prisma)
- [DifficultyCalculatorService](../../shared/services/difficulty-calculator.service.ts)
- [ContentAnalyzerService](../../shared/services/content-analyzer.service.ts)
- [API Documentation](../../../docs/api/README.md)
