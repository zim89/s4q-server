# Dictionary Integration

Интеграция с внешними API словарей для получения информации о словах, транскрипции и аудио произношения.

## 🎯 Назначение

Модуль предоставляет единый интерфейс для работы с различными API словарей:

- **Merriam-Webster Collegiate API** - авторитетный словарь с 225,000+ определениями и аудио (основной провайдер)
- **Free Dictionary API** - бесплатный API без лимитов (fallback провайдер)

## 🏗️ Архитектура

```
src/integrations/dictionary/
├── constants/                    # Константы и конфигурация
├── types/                       # Общие типы данных
├── providers/                   # Провайдеры словарей
│   ├── base/                   # Базовый класс для провайдеров
│   ├── free-dictionary/        # Free Dictionary API провайдер
│   └── merriam-webster/        # Merriam-Webster провайдер
├── dictionary.module.ts         # Основной модуль
├── dictionary.service.ts        # Фасад сервис
├── dictionary.controller.ts     # API контроллер
└── index.ts                    # Экспорты
```

## 🚀 Возможности

### Основные функции:

- ✅ **Получение информации о словах** (определения, части речи, примеры)
- ✅ **Транскрипция слов** (IPA)
- ✅ **Аудио произношение** (ссылки на аудио файлы)
- ✅ **Автоматический fallback** между провайдерами
- ✅ **Управление провайдерами** через API

### API эндпоинты:

- `GET /dictionary/word/:word` - информация о слове
- `GET /dictionary/transcription/:word` - транскрипция слова
- `GET /dictionary/providers/status` - статус всех провайдеров
- `GET /dictionary/providers/current` - текущий активный провайдер
- `POST /dictionary/providers/switch` - переключение провайдера
- `GET /dictionary/providers/available` - список доступных провайдеров

## ⚙️ Конфигурация

### Переменные окружения:

```env
# Активный провайдер по умолчанию
DICTIONARY_PROVIDER=merriam-webster

# Merriam-Webster API
MERRIAM_API_KEY=your_api_key
MERRIAM_API_URL=https://www.dictionaryapi.com/api/v3/references/collegiate/json

# Free Dictionary API
FREE_DICTIONARY_API_URL=https://api.dictionaryapi.dev/api/v2/entries/en
FREE_DICTIONARY_API_TIMEOUT=5000
FREE_DICTIONARY_API_RETRIES=3
```

## 📦 Использование

### Подключение модуля:

```typescript
import { DictionaryModule } from './integrations/dictionary';

@Module({
  imports: [DictionaryModule],
})
export class AppModule {}
```

### Использование сервиса:

```typescript
import { DictionaryService } from './integrations/dictionary';

@Injectable()
export class MyService {
  constructor(private readonly dictionaryService: DictionaryService) {}

  async getWordInfo(word: string) {
    return await this.dictionaryService.getWordInfo(word);
  }

  async switchProvider(providerName: string) {
    this.dictionaryService.switchProvider(providerName);
  }
}
```

## 🔄 Fallback механизм

Система автоматически переключается между провайдерами:

1. **Попытка текущего провайдера** - если активен Merriam-Webster, пробуем его
2. **Fallback на другие провайдеры** - если Merriam-Webster недоступен, пробуем Free Dictionary
3. **Автоматическое переключение** - при успешном fallback провайдер становится активным

## 📊 Мониторинг

### Статус провайдеров:

- **isAvailable** - доступность API
- **isActive** - активный провайдер
- **errorCount** - количество ошибок
- **successCount** - количество успешных запросов
- **averageResponseTime** - среднее время ответа

## 🔧 Разработка

### Добавление нового провайдера:

1. Создать папку в `providers/`
2. Наследоваться от `BaseDictionaryProvider`
3. Реализовать методы `getWordInfo()` и `getTranscription()`
4. Добавить в `dictionary.service.ts`
5. Создать модуль провайдера

### Структура провайдера:

```
providers/new-provider/
├── new-provider.service.ts
├── new-provider.types.ts
├── new-provider.module.ts
└── index.ts
```

## 📝 Примеры ответов

### Информация о слове:

```json
{
  "word": "hello",
  "phonetic": "/həˈloʊ/",
  "meanings": [
    {
      "partOfSpeech": "noun",
      "definitions": [
        {
          "definition": "An expression of greeting",
          "example": "Hello, how are you?"
        }
      ]
    }
  ],
  "audio": "https://example.com/audio/hello.mp3"
}
```

### Транскрипция:

```json
{
  "word": "hello",
  "phonetic": "/həˈloʊ/",
  "audio": "https://example.com/audio/hello.mp3"
}
```

## 🚨 Ограничения

### Merriam-Webster Collegiate API:

- **Лимит**: Бесплатно для некоммерческого использования
- **Языки**: Английский (американский)
- **Требует**: API ключ
- **Особенности**: 225,000+ определений, 100,000+ аудио файлов
- **Статус**: Основной провайдер по умолчанию

### Free Dictionary API:

- **Лимит**: Без ограничений
- **Языки**: Английский
- **Требует**: Нет
- **Статус**: Fallback провайдер
