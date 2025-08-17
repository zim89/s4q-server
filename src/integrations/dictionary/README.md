# 📚 Модуль интеграции с API словарей

Модуль для работы с внешними API словарей и получения информации о словах.

## 🎯 Функциональность

- Получение транскрипции слов из Free Dictionary API
- Получение аудио файлов с произношением
- Определение части речи
- Получение определений и примеров использования
- Обработка ошибок и логирование

## 🏗️ Структура

```
dictionary/
├── types/                  # Типы и интерфейсы
│   ├── dictionary.types.ts     # Основные типы для API
│   ├── transcription.types.ts  # Типы для транскрипции
│   └── index.ts               # Экспорты всех типов
├── dictionary.service.ts    # Основной сервис для работы с API
├── dictionary.module.ts     # Модуль NestJS
├── index.ts                # Экспорты модуля
└── README.md              # Документация
```

## ⚙️ Конфигурация

Модуль использует переменные окружения для настройки API:

```bash
# Free Dictionary API
FREE_DICTIONARY_API_URL=https://api.dictionaryapi.dev/api/v2/entries/en
FREE_DICTIONARY_API_TIMEOUT=5000
FREE_DICTIONARY_API_RETRIES=3
```

Все переменные имеют значения по умолчанию и не являются обязательными.

## 🔧 API Endpoints

### Free Dictionary API

Модуль использует [Free Dictionary API](https://dictionaryapi.dev/) для получения информации о словах.

**Базовый URL:** Настраивается через переменную окружения `FREE_DICTIONARY_API_URL` (по умолчанию: `https://api.dictionaryapi.dev/api/v2/entries/en/{word}`)

**Пример запроса:**

```http
GET https://api.dictionaryapi.dev/api/v2/entries/en/hello
```

**Пример ответа:**

```json
[
  {
    "word": "hello",
    "phonetic": "həˈloʊ",
    "phonetics": [
      {
        "text": "həˈloʊ",
        "audio": "https://api.dictionaryapi.dev/media/pronunciations/en/hello-au.mp3"
      }
    ],
    "meanings": [
      {
        "partOfSpeech": "interjection",
        "definitions": [
          {
            "definition": "Used as a greeting or to begin a phone conversation.",
            "example": "hello there, Katie!"
          }
        ]
      }
    ]
  }
]
```

## 🚀 Использование

### В сервисах

```typescript
import { DictionaryService } from 'src/integrations/dictionary';

@Injectable()
export class SomeService {
  constructor(private dictionaryService: DictionaryService) {}

  async getWordInfo(word: string) {
    // Получить полную информацию о слове
    const wordInfo = await this.dictionaryService.getWordInfo(word);

    if (wordInfo) {
      console.log('Транскрипция:', wordInfo.transcription);
      console.log('Аудио URL:', wordInfo.audioUrl);
      console.log('Часть речи:', wordInfo.partOfSpeech);
    }
  }

  async getTranscription(word: string) {
    // Получить только транскрипцию
    const result = await this.dictionaryService.getTranscription(word);

    if (result) {
      console.log('Транскрипция:', result.transcription);
      console.log('Аудио URL:', result.audioUrl);
    }
  }
}
```

### В модулях

```typescript
import { Module } from '@nestjs/common';
import { DictionaryModule } from 'src/integrations/dictionary';

@Module({
  imports: [DictionaryModule],
  // ... остальные настройки
})
export class SomeModule {}
```

## 📊 Типы данных

### WordInfo

```typescript
interface WordInfo {
  transcription?: string; // Фонетическая транскрипция
  audioUrl?: string; // URL аудио файла
  partOfSpeech?: string; // Часть речи
  source: string; // Источник данных
}
```

### TranscriptionResult

```typescript
interface TranscriptionResult {
  transcription: string; // Фонетическая транскрипция
  audioUrl?: string; // URL аудио файла
  source: string; // Источник данных
}
```

### DictionaryResponse

```typescript
interface DictionaryResponse {
  word: string;
  phonetic?: string;
  phonetics?: Array<{
    text?: string;
    audio?: string;
  }>;
  meanings?: Array<{
    partOfSpeech?: string;
    definitions?: Array<{
      definition: string;
      example?: string;
    }>;
  }>;
}
```

### Импорт типов

```typescript
import {
  WordInfo,
  TranscriptionResult,
  DictionaryResponse,
} from 'src/integrations/dictionary';
```

## 🔗 Зависимости

- **@nestjs/axios**: Для HTTP запросов к внешним API
- **@nestjs/common**: Для декораторов и базовых классов
- **@nestjs/config**: Для работы с конфигурацией

## 📝 Примеры

### Получение информации о слове

```typescript
const wordInfo = await this.dictionaryService.getWordInfo('hello');

// Результат:
{
  transcription: 'həˈloʊ',
  audioUrl: 'https://api.dictionaryapi.dev/media/pronunciations/en/hello-au.mp3',
  partOfSpeech: 'interjection',
  source: 'Free Dictionary API'
}
```

### Получение транскрипции

```typescript
const result = await this.dictionaryService.getTranscription('world');

// Результат:
{
  transcription: 'wɜːld',
  audioUrl: 'https://api.dictionaryapi.dev/media/pronunciations/en/world-au.mp3',
  source: 'Free Dictionary API'
}
```

## ⚠️ Обработка ошибок

Сервис автоматически обрабатывает ошибки и возвращает `null` в случае:

- Слова не найдено в API
- Ошибки сети
- Неверного формата ответа
- Превышения лимитов API
- Ошибок конфигурации

Все ошибки логируются с помощью встроенного логгера NestJS.

## 🔧 Настройка

### Переменные окружения

Добавьте в ваш `.env` файл:

```bash
# Free Dictionary API (опционально)
FREE_DICTIONARY_API_URL=https://api.dictionaryapi.dev/api/v2/entries/en
FREE_DICTIONARY_API_TIMEOUT=5000
FREE_DICTIONARY_API_RETRIES=3
```

### Использование в коде

```typescript
// Получение URL из конфигурации
const baseUrl = this.configService.get<string>('FREE_DICTIONARY_API_URL');
```

## 🔄 Планы развития

- [ ] Поддержка других языков (не только английский)
- [ ] Интеграция с Oxford API
- [ ] Кэширование результатов
- [ ] Поддержка фраз и идиом
- [ ] Получение синонимов и антонимов
- [ ] Грамматическая информация
