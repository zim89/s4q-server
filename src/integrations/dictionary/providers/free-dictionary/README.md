# Free Dictionary API Provider

Провайдер для работы с [Free Dictionary API](https://dictionaryapi.dev/).

## 🎯 Назначение

Бесплатный API словаря без лимитов и регистрации. Идеальный fallback провайдер для Merriam-Webster.

## ⚙️ Конфигурация

### Переменные окружения:

```env
# Free Dictionary API
FREE_DICTIONARY_API_URL=https://api.dictionaryapi.dev/api/v2/entries/en
FREE_DICTIONARY_API_TIMEOUT=5000
FREE_DICTIONARY_API_RETRIES=3
```

### Получение доступа:

**Не требуется!** API полностью бесплатный и не требует регистрации.

## 🚀 Возможности

### Основные функции:

- ✅ **Полностью бесплатный** - без лимитов
- ✅ **Не требует регистрации** - сразу готов к использованию
- ✅ **Фонетическая транскрипция** (IPA)
- ✅ **Аудио произношение** (Google TTS)
- ✅ **Подробные определения** с примерами
- ✅ **Части речи** и грамматическая информация
- ✅ **Этимология** слов
- ✅ **Синонимы и антонимы**

### Поддерживаемые языки:

- 🇬🇧 **Английский** (британский и американский)

## 📊 Лимиты

### Бесплатный план:

- **Без ограничений** - неограниченное количество запросов
- **Все эндпоинты** доступны
- **Полная функциональность**

## 🔧 API Endpoints

### Получение информации о слове:

```
GET /api/v2/entries/en/{word}
```

**Пример запроса:**

```
GET https://api.dictionaryapi.dev/api/v2/entries/en/hello
```

### Примеры запросов:

```typescript
// Получение информации о слове
const wordInfo = await freeDictionaryService.getWordInfo('hello');

// Получение транскрипции
const transcription = await freeDictionaryService.getTranscription('world');
```

## 📝 Структура ответа

### Основные поля ответа:

```json
[
  {
    "word": "hello",
    "phonetic": "həˈləʊ",
    "phonetics": [
      {
        "text": "həˈləʊ",
        "audio": "//ssl.gstatic.com/dictionary/static/sounds/20200429/hello--_gb_1.mp3"
      }
    ],
    "origin": "early 19th century: variant of earlier hollo",
    "meanings": [
      {
        "partOfSpeech": "exclamation",
        "definitions": [
          {
            "definition": "used as a greeting or to begin a phone conversation.",
            "example": "hello there, Katie!",
            "synonyms": [],
            "antonyms": []
          }
        ]
      }
    ]
  }
]
```

### WordInfo (нормализованный формат):

```typescript
interface WordInfo {
  transcription?: string;
  audioUrl?: string;
  partOfSpeech?: string;
  source: string;
}
```

### TranscriptionResult (нормализованный формат):

```typescript
interface TranscriptionResult {
  transcription: string;
  audioUrl?: string;
  source: string;
}
```

## 🏗️ Архитектура

### Файлы:

```
free-dictionary/
├── free-dictionary.service.ts      # Основной сервис
├── free-dictionary.types.ts        # Типы для Free Dictionary API
├── free-dictionary.module.ts       # NestJS модуль
├── index.ts                       # Экспорты
└── README.md                      # Документация
```

### Наследование:

```typescript
export class FreeDictionaryService extends BaseDictionaryProvider {
  // Реализация методов
}
```

## 🔄 Обработка ошибок

### Автоматическая обработка:

- ✅ **Слово не найдено** - возврат null
- ✅ **Сетевые ошибки** - логирование и повторные попытки
- ✅ **Неверный формат ответа** - логирование ошибок
- ✅ **Rate limiting** - обработка 429 ошибок

### Логирование:

```typescript
this.logger.debug(`Word "${word}" not found in Free Dictionary API`);
this.logger.error('Error getting word info from Free Dictionary API:', error);
```

## 📊 Мониторинг

### Метрики:

- **errorCount** - количество ошибок
- **successCount** - количество успешных запросов
- **averageResponseTime** - среднее время ответа
- **lastCheck** - последняя проверка доступности

### Статус:

```typescript
{
  name: 'Free Dictionary API',
  isAvailable: true,
  isActive: false,
  errorCount: 0,
  successCount: 500,
  averageResponseTime: 150,
  lastCheck: '2024-01-15T10:30:00Z'
}
```

## 🚨 Ограничения

### Технические:

- **Только английский язык**
- **Зависимость от внешнего API**
- **Ограниченная документация**

### Бизнес-ограничения:

- **Нет гарантий доступности**
- **Может быть медленнее** чем платные API
- **Ограниченная поддержка**

## 🔧 Разработка

### Добавление новых функций:

1. **Расширение типов** в `free-dictionary.types.ts`
2. **Реализация методов** в `free-dictionary.service.ts`
3. **Обновление нормализации** данных
4. **Добавление тестов**

### Пример расширения:

```typescript
// Добавление нового метода
async getSynonyms(word: string): Promise<string[]> {
  // Реализация
}

// Расширение типов
interface FreeDictionarySynonymsResponse {
  // Новые типы
}
```

## 📚 Документация

- [Free Dictionary API](https://dictionaryapi.dev/)
- [API Documentation](https://dictionaryapi.dev/)
- [GitHub Repository](https://github.com/meetDeveloper/freeDictionaryAPI)

## 🆚 Сравнение с другими провайдерами

### Преимущества:

- ✅ **Полностью бесплатный**
- ✅ **Без лимитов** запросов
- ✅ **Не требует регистрации**
- ✅ **Быстрая настройка**

### Недостатки:

- ❌ **Меньше авторитетности** чем Merriam-Webster
- ❌ **Ограниченная документация**
- ❌ **Нет гарантий доступности**
- ❌ **Только английский язык**
