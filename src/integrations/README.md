# Integrations

Интеграционные компоненты для внешних сервисов.

## 📁 Структура

```
src/integrations/
├── dictionary/      # Dictionary API интеграция
│   ├── types/           # Типы и интерфейсы
│   ├── dictionary.service.ts
│   ├── dictionary.module.ts
│   └── index.ts
├── email/          # Email интеграция (зарезервировано)
├── s3/             # AWS S3 интеграция (зарезервировано)
├── stripe/         # Stripe платежи (зарезервировано)
├── telegram/       # Telegram Bot (зарезервировано)
└── README.md       # Документация
```

## 🔧 Активные компоненты

### dictionary/

**Назначение**: Интеграция с API словарей для получения транскрипции и информации о словах

**Функциональность:**

- Получение транскрипции слов из Free Dictionary API
- Получение аудио файлов с произношением
- Определение части речи
- Получение определений и примеров использования
- Обработка ошибок и логирование

**Использование:**

```typescript
import { DictionaryService } from 'src/integrations/dictionary';

// В сервисе
constructor(private dictionaryService: DictionaryService) {}

// Получение информации о слове
const wordInfo = await this.dictionaryService.getWordInfo('hello');

// Получение транскрипции
const transcription = await this.dictionaryService.getTranscription('world');
```

## 📋 Зарезервированные папки

Следующие папки зарезервированы для будущих интеграций:

- **email/** - Email интеграция (SMTP, SendGrid, etc.)
- **s3/** - AWS S3 интеграция для хранения файлов
- **stripe/** - Stripe платежи
- **telegram/** - Telegram Bot интеграция

## 🚀 Добавление новых интеграций

### 1. Создайте папку для интеграции

```bash
mkdir src/integrations/new-integration
```

### 2. Создайте базовые файлы

```typescript
// src/integrations/new-integration/new-integration.service.ts
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class NewIntegrationService {
  constructor(private readonly configService: ConfigService) {}

  async someMethod(): Promise<void> {
    // Реализация
  }
}
```

```typescript
// src/integrations/new-integration/new-integration.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { NewIntegrationService } from './new-integration.service';

@Module({
  imports: [ConfigModule],
  providers: [NewIntegrationService],
  exports: [NewIntegrationService],
})
export class NewIntegrationModule {}
```

### 3. Создайте индексный файл

```typescript
// src/integrations/new-integration/index.ts
export { NewIntegrationService } from './new-integration.service';
export { NewIntegrationModule } from './new-integration.module';
```

### 4. Используйте в приложении

```typescript
// app.module.ts
import { NewIntegrationModule } from 'src/integrations/new-integration';

@Module({
  imports: [NewIntegrationModule],
})
export class AppModule {}
```

## ⚙️ Конфигурация

### Dictionary API

```env
# Free Dictionary API
FREE_DICTIONARY_API_URL=https://api.dictionaryapi.dev/api/v2/entries/en
FREE_DICTIONARY_API_TIMEOUT=5000
FREE_DICTIONARY_API_RETRIES=3
```

## ⚠️ Важные моменты

### Безопасность

- Никогда не коммитьте API ключи в репозиторий
- Используйте environment variables для конфиденциальных данных
- Валидируйте все входные данные от внешних сервисов
- Используйте HTTPS для всех внешних запросов

### Производительность

- Используйте кэширование для часто запрашиваемых данных
- Реализуйте retry логику для внешних API
- Мониторьте время ответа внешних сервисов
- Используйте connection pooling где возможно

### Надежность

- Обрабатывайте ошибки внешних сервисов
- Реализуйте fallback механизмы
- Логируйте все взаимодействия с внешними сервисами
- Используйте circuit breaker паттерн для критичных интеграций

## 📝 Принципы

### Названия файлов

- ✅ **Понятные названия** - `dictionary.service.ts`, `email.service.ts`
- ✅ **Консистентность** - единый стиль именования
- ✅ **Описательность** - название отражает назначение

### Названия классов

- ✅ **Суффикс Service** - для сервисов
- ✅ **Суффикс Module** - для модулей
- ✅ **Понятные названия** - описывают функциональность

### Архитектура

- ✅ **Разделение ответственности** - каждый компонент отвечает за свою интеграцию
- ✅ **Конфигурируемость** - настройка через environment variables
- ✅ **Обработка ошибок** - graceful handling of external service failures
- ✅ **Типизация** - строгая типизация для всех интеграций
