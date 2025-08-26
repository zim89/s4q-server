# Merriam-Webster Collegiate Provider

Провайдер для работы с [Merriam-Webster's Collegiate® Dictionary with Audio](https://dictionaryapi.com/products/api-collegiate-dictionary).

## 🎯 Назначение

Авторитетный словарь с 225,000+ определениями, 100,000+ аудио произношений и подробными примерами использования слов.

## ⚙️ Конфигурация

### Переменные окружения:

```env
# Merriam-Webster Collegiate Dictionary API
MERRIAM_API_KEY=your_api_key
MERRIAM_API_URL=https://www.dictionaryapi.com/api/v3/references/collegiate/json
```

### Получение API ключа:

1. Зарегистрируйтесь на [Merriam-Webster Dictionary API](https://dictionaryapi.com/)
2. Выберите "Collegiate Dictionary with Audio" (бесплатный план)
3. Получите API ключ

## 🚀 Возможности

### Основные функции:

- ✅ **225,000+ определений** от Merriam-Webster
- ✅ **100,000+ аудио произношений** (американский акцент)
- ✅ **Фонетическая транскрипция** (IPA)
- ✅ **Подробные примеры** использования в контексте
- ✅ **Части речи** и грамматическая информация
- ✅ **Этимология** слов
- ✅ **Синонимы и антонимы**
- ✅ **Иллюстрации** и визуальные примеры
- ✅ **Предложения по правописанию**

### Поддерживаемые языки:

- 🇺🇸 **Английский** (американский)

## 📊 Лимиты

### Бесплатный план:

- **Без ограничений** для некоммерческого использования
- **Базовые эндпоинты**
- **Полная функциональность**

### Платные планы:

- **Коммерческое использование**
- **Расширенные эндпоинты**
- **Приоритетная поддержка**

## 🔧 API Endpoints

### Получение информации о слове:

```
GET /references/collegiate/json/{word}?key={api_key}
```

**Пример запроса:**

```
GET https://www.dictionaryapi.com/api/v3/references/collegiate/json/voluminous?key=your-api-key
```

### Получение транскрипции:

```
GET /references/collegiate/json/{word}?key={api_key}
```

### Примеры запросов:

```typescript
// Получение информации о слове
const wordInfo = await merriamService.getWordInfo('hello');

// Получение транскрипции
const transcription = await merriamService.getTranscription('world');
```

## 📝 Структура ответа

### Основные поля ответа:

```json
{
  "meta": {
    "id": "voluminous",
    "uuid": "0d01b967-971f-4ec5-8fe0-10513d29c39b",
    "stems": ["voluminous", "voluminously"],
    "offensive": false
  },
  "hwi": {
    "hw": "vo*lu*mi*nous",
    "prs": [{
      "mw": "və-ˈlü-mə-nəs",
      "sound": {
        "audio": "volumi02",
        "ref": "c",
        "stat": "1"
      }
    }]
  },
  "fl": "adjective",
  "def": [...],
  "et": [...],
  "shortdef": [
    "having or marked by great volume or bulk : large; also : full",
    "numerous",
    "filling or capable of filling a large volume or several volumes"
  ]
}
```

### WordInfo (нормализованный формат):

```typescript
interface WordInfo {
  word: string;
  phonetic: string;
  meanings: Array<{
    partOfSpeech: string;
    definitions: Array<{
      definition: string;
      example?: string;
    }>;
  }>;
  audio: string;
  source: string;
}
```

### TranscriptionResult (нормализованный формат):

```typescript
interface TranscriptionResult {
  word: string;
  phonetic: string;
  audio: string;
  source: string;
}
```

## 🏗️ Архитектура

### Файлы:

```
merriam-webster/
├── merriam-webster.service.ts      # Основной сервис
├── merriam-webster.types.ts        # Типы для Merriam-Webster API
├── merriam-webster.module.ts       # NestJS модуль
├── index.ts                       # Экспорты
└── README.md                      # Документация
```

### Наследование:

```typescript
export class MerriamWebsterDictionaryService extends BaseDictionaryProvider {
  // Реализация методов
}
```

## 🔄 Обработка ошибок

### Автоматическая обработка:

- ✅ **Неверный API ключ** - деактивация провайдера
- ✅ **Сетевые ошибки** - повторные попытки
- ✅ **Неверный формат ответа** - логирование ошибок
- ✅ **Слово не найдено** - возврат null

### Логирование:

```typescript
this.logger.warn('Merriam-Webster API key not configured');
this.logger.error('Error getting word info from Merriam-Webster API:', error);
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
  name: 'Merriam-Webster',
  isAvailable: true,
  isActive: false,
  errorCount: 0,
  successCount: 200,
  averageResponseTime: 180,
  lastCheck: '2024-01-15T10:30:00Z'
}
```

## 🚨 Ограничения

### Технические:

- **Требует API ключ**
- **Только английский язык**
- **Американский английский**
- **Ограниченная документация**

### Бизнес-ограничения:

- **Бесплатно только для некоммерческого использования**
- **Требует регистрации**
- **Ограниченная поддержка**

## 🔧 Разработка

### Добавление новых функций:

1. **Расширение типов** в `merriam-webster.types.ts`
2. **Реализация методов** в `merriam-webster.service.ts`
3. **Обновление нормализации** данных
4. **Добавление тестов**

### Пример расширения:

```typescript
// Добавление нового метода
async getEtymology(word: string): Promise<string> {
  // Реализация
}

// Расширение типов
interface MerriamWebsterEtymologyResponse {
  // Новые типы
}
```

## 📚 Документация

- [Merriam-Webster Dictionary API](https://dictionaryapi.com/)
- [API Documentation](https://dictionaryapi.com/products/api-collegiate-dictionary)
- [Getting Started](https://dictionaryapi.com/products/api-collegiate-dictionary)

## 🆚 Сравнение с другими провайдерами

### Преимущества:

- ✅ **Бесплатный** для некоммерческого использования
- ✅ **Авторитетный источник**
- ✅ **Без лимитов** запросов
- ✅ **Быстрый** API

### Недостатки:

- ❌ **Только американский английский**
- ❌ **Ограниченная документация**
- ❌ **Платный для коммерческого использования**
