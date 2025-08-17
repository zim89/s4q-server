# 📝 Модуль карточек

Модуль для управления карточками с английскими словами и фразами.

## 🎯 Функциональность

- Создание карточек с английскими словами и фразами
- Управление метаданными карточек (транскрипция, часть речи, сложность)
- Поддержка медиа-контента (изображения, аудио)
- Глобальные и пользовательские карточки
- Автоматическая генерация slug'ов
- Пагинация и фильтрация коллекций
- Сортировка по различным полям
- Swagger документация

## 🏗️ Структура

```
card/
├── dto/                    # Data Transfer Objects
│   ├── create-card.dto.ts  # DTO для создания карточки
│   ├── update-card.dto.ts  # DTO для обновления карточки
│   ├── card-query.dto.ts   # DTO для запросов с пагинацией и фильтрацией
│   └── index.ts           # Экспорты DTO
├── decorators/             # Swagger декораторы
│   ├── card-swagger.decorator.ts  # Документация API
│   └── index.ts           # Экспорты декораторов
├── card.controller.ts      # Контроллер API
├── card.service.ts         # Бизнес-логика
├── card.module.ts          # Модуль NestJS
└── README.md              # Документация
```

## 🔧 API Endpoints

### Создание карточки

```http
POST /cards
Authorization: Bearer <token>
Content-Type: application/json

{
  "wordOrPhrase": "hello",
  "transcription": "həˈloʊ",
  "partOfSpeech": "INTERJECTION",
  "difficulty": "EASY",
  "contentType": "TEXT",
  "isGlobal": true
}
```

### Получение всех карточек (с пагинацией и фильтрацией)

```http
GET /cards?page=1&limit=10&search=hello&difficulty=EASY&partOfSpeech=NOUN&sort=createdAt&order=desc
```

**Query параметры:**

- `page` - номер страницы (по умолчанию: 1)
- `limit` - количество элементов на странице (по умолчанию: 10)
- `search` - поиск по слову или фразе (без учета регистра)
- `difficulty` - фильтр по сложности (`EASY`, `MEDIUM`, `HARD`, `EXPERT`)
- `partOfSpeech` - фильтр по части речи
- `sort` - поле для сортировки (`createdAt`, `wordOrPhrase`, `difficulty`)
- `order` - порядок сортировки (`asc`, `desc`)

**Ответ:**

```json
{
  "data": [
    {
      "id": "clx1234567890abcdef",
      "wordOrPhrase": "hello",
      "slug": "hello",
      "transcription": "həˈloʊ",
      "partOfSpeech": "INTERJECTION",
      "difficulty": "EASY",
      "contentType": "TEXT",
      "isGlobal": true,
      "studyCount": 0,
      "viewCount": 0,
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  ],
  "pagination": {
    "total": 100,
    "page": 1,
    "limit": 10,
    "totalPages": 10,
    "hasNext": true,
    "hasPrev": false
  }
}
```

### Получение карточки по ID

```http
GET /cards/:id
```

### Обновление карточки

```http
PATCH /cards/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "transcription": "həˈloʊ",
  "difficulty": "MEDIUM"
}
```

### Удаление карточки

```http
DELETE /cards/:id
Authorization: Bearer <token>
```

## 🔐 Права доступа

- **Создание, обновление, удаление**: Только администраторы (`ADMIN` роль)
- **Просмотр**: Все пользователи (публичные карточки)

## 📊 Типы данных

### PartOfSpeech (Части речи)

- `NOUN` - Существительное
- `PRONOUN` - Местоимение
- `VERB` - Глагол
- `ADJECTIVE` - Прилагательное
- `ADVERB` - Наречие
- `PREPOSITION` - Предлог
- `CONJUNCTION` - Союз
- `INTERJECTION` - Междометие
- `ARTICLE` - Артикль
- `PARTICLE` - Частица
- `PHRASE` - Фраза

### CardDifficulty (Сложность)

- `EASY` - Легкий уровень
- `MEDIUM` - Средний уровень
- `HARD` - Сложный уровень
- `EXPERT` - Экспертный уровень

### ContentType (Тип контента)

- `TEXT` - Текстовый контент
- `IMAGE` - Изображение
- `AUDIO` - Аудио
- `VIDEO` - Видео
- `INTERACTIVE` - Интерактивный контент

## 🚀 Использование

### Создание карточки

```typescript
import { CardService } from './card.service';
import { PartOfSpeech, CardDifficulty, ContentType } from '@prisma/client';

@Injectable()
export class SomeService {
  constructor(private cardService: CardService) {}

  async createCard() {
    const card = await this.cardService.create(
      {
        wordOrPhrase: 'hello',
        transcription: 'həˈloʊ',
        partOfSpeech: PartOfSpeech.INTERJECTION,
        difficulty: CardDifficulty.EASY,
        contentType: ContentType.TEXT,
        isGlobal: true,
      },
      userId
    );
  }
}
```

### Получение карточек с фильтрацией

```typescript
// Все карточки с пагинацией
const result = await this.cardService.findAll({
  page: 1,
  limit: 20,
  search: 'hello',
  difficulty: CardDifficulty.EASY,
  sort: 'createdAt',
  order: 'desc',
});

// Конкретная карточка
const card = await this.cardService.findOne('card-id');
```

## 🔄 Автоматическая генерация

- **Slug**: Автоматически генерируется из `wordOrPhrase`
- **Timestamps**: `createdAt` и `updatedAt` устанавливаются автоматически
- **Counters**: `studyCount` и `viewCount` инициализируются как 0

## 📝 Примеры

### Базовая карточка

```json
{
  "id": "clx1234567890abcdef",
  "wordOrPhrase": "hello",
  "slug": "hello",
  "transcription": "həˈloʊ",
  "partOfSpeech": "INTERJECTION",
  "difficulty": "EASY",
  "contentType": "TEXT",
  "isGlobal": true,
  "studyCount": 0,
  "viewCount": 0,
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

### Карточка с медиа

```json
{
  "wordOrPhrase": "house",
  "transcription": "haʊs",
  "partOfSpeech": "NOUN",
  "imageUrl": "https://example.com/house.jpg",
  "audioUrl": "https://example.com/house.mp3",
  "difficulty": "EASY",
  "contentType": "TEXT"
}
```

## 🔗 Зависимости

- **Prisma**: Для работы с базой данных
- **@nestjs/swagger**: Для API документации
- **class-validator**: Для валидации DTO
- **class-transformer**: Для трансформации данных
- **Auth Module**: Для аутентификации и авторизации

## 📚 Swagger документация

Все endpoints документированы через Swagger декораторы в `card-swagger.decorator.ts`. Документация доступна по адресу `/api` при запуске приложения.
