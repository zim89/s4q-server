# Base Dictionary Provider

Базовый абстрактный класс для всех провайдеров словарей.

## 🎯 Назначение

Предоставляет общую функциональность и интерфейс для всех провайдеров словарей, обеспечивая единообразие и переиспользование кода.

## 🏗️ Архитектура

### Наследование:

```typescript
export abstract class BaseDictionaryProvider implements DictionaryProvider {
  // Общая функциональность
}

// Использование в провайдерах
export class FreeDictionaryService extends BaseDictionaryProvider {
  // Специфичная реализация
}
```

## 🚀 Возможности

### Основные функции:

- ✅ **HTTP запросы** через `makeRequest()`
- ✅ **Управление статусом** (активация/деактивация)
- ✅ **Логирование** и обработка ошибок
- ✅ **Отслеживание метрик** (время ответа, количество ошибок)
- ✅ **Реализация интерфейса** `DictionaryProvider`

### Предоставляемые методы:

- `isAvailable()` - проверка доступности
- `getName()` - получение названия провайдера
- `getStatus()` - получение статуса с метриками
- `activate()` - активация провайдера
- `deactivate()` - деактивация провайдера

## 📝 Интерфейс DictionaryProvider

```typescript
interface DictionaryProvider {
  getWordInfo(word: string): Promise<WordInfo | null>;
  getTranscription(word: string): Promise<TranscriptionResult | null>;
  isAvailable(): boolean;
  getName(): string;
  getStatus(): ProviderStatus;
}
```

## 🔧 Использование

### Создание нового провайдера:

```typescript
@Injectable()
export class NewDictionaryService extends BaseDictionaryProvider {
  constructor(httpService: HttpService, configService: ConfigService) {
    super(httpService, configService, dictionaryProviders.newProvider);

    // Инициализация провайдера
    this.initialize();
  }

  async getWordInfo(word: string): Promise<WordInfo | null> {
    // Реализация получения информации о слове
  }

  async getTranscription(word: string): Promise<TranscriptionResult | null> {
    // Реализация получения транскрипции
  }

  private initialize() {
    // Проверка конфигурации
    if (!this.isConfigured()) {
      this.deactivate();
    } else {
      this.activate();
    }
  }
}
```

## 📊 Метрики и мониторинг

### Отслеживаемые метрики:

- **errorCount** - количество ошибок
- **successCount** - количество успешных запросов
- **averageResponseTime** - среднее время ответа
- **lastCheck** - последняя проверка доступности

### Обновление метрик:

```typescript
// Автоматическое обновление при каждом запросе
protected async makeRequest<T>(url: string, options?: AxiosRequestConfig): Promise<T> {
  const startTime = Date.now();
  try {
    const response = await firstValueFrom(this.httpService.get<T>(url, options));
    const responseTime = Date.now() - startTime;
    this.updateStatus(true, responseTime);
    return response.data;
  } catch (error) {
    this.updateStatus(false);
    throw error;
  }
}
```

## 🔄 Обработка ошибок

### Автоматическая обработка:

- ✅ **Сетевые ошибки** - логирование и обновление метрик
- ✅ **Таймауты** - обработка через Axios
- ✅ **HTTP ошибки** - обработка статус кодов
- ✅ **Парсинг ошибок** - безопасная обработка JSON

### Логирование:

```typescript
protected readonly logger = new Logger(this.constructor.name);

// Автоматическое логирование ошибок
this.logger.error('Request failed:', error);
```

## 📁 Структура файлов

```
base/
├── base-dictionary-provider.ts      # Основной абстрактный класс
├── dictionary-provider.types.ts     # Интерфейсы и типы
├── index.ts                        # Экспорты
└── README.md                       # Документация
```

## 🔧 Конфигурация

### Конструктор:

```typescript
constructor(
  protected readonly httpService: HttpService,
  protected readonly configService: ConfigService,
  protected readonly providerType: DictionaryProviderType
)
```

### Параметры:

- **httpService** - сервис для HTTP запросов
- **configService** - сервис для работы с конфигурацией
- **providerType** - тип провайдера (free-dictionary, merriam-webster, etc.)

## 🚨 Ограничения

### Абстрактный класс:

- ❌ **Нельзя создать экземпляр** напрямую
- ❌ **Требует наследования** для использования
- ❌ **Абстрактные методы** должны быть реализованы

### Обязательные методы:

- `getWordInfo()` - получение информации о слове
- `getTranscription()` - получение транскрипции

## 🔧 Разработка

### Добавление новой функциональности:

1. **Расширение базового класса** в `base-dictionary-provider.ts`
2. **Обновление интерфейса** в `dictionary-provider.types.ts`
3. **Обновление всех провайдеров** для совместимости
4. **Добавление тестов**

### Пример расширения:

```typescript
// Добавление нового метода в базовый класс
protected async makeAuthenticatedRequest<T>(
  url: string,
  authConfig: AuthConfig
): Promise<T> {
  // Реализация аутентифицированных запросов
}

// Использование в провайдерах
const response = await this.makeAuthenticatedRequest(url, {
  apiKey: this.apiKey,
  headers: { 'Authorization': `Bearer ${this.token}` }
});
```

## 📚 Документация

- [NestJS HttpModule](https://docs.nestjs.com/techniques/http-module)
- [Axios Documentation](https://axios-http.com/docs/intro)
- [TypeScript Abstract Classes](https://www.typescriptlang.org/docs/handbook/classes.html#abstract-classes)
