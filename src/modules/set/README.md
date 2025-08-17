# 📚 Модуль наборов (Sets)

Модуль для управления наборами карточек для изучения языков.

## 🎯 Функциональность

- Создание наборов карточек для изучения
- Управление метаданными наборов (название, описание, тип, уровень)
- Поддержка различных типов наборов (языковые, пользовательские)
- Пагинация и фильтрация коллекций
- Сортировка по различным полям
- Добавление/удаление карточек из наборов
- Swagger документация

## 🏗️ Структура

```
set/
├── dto/                    # Data Transfer Objects
│   ├── create-set.dto.ts   # DTO для создания набора
│   ├── update-set.dto.ts   # DTO для обновления набора
│   ├── set-query.dto.ts    # DTO для запросов с пагинацией и фильтрацией
│   └── index.ts           # Экспорты DTO
├── decorators/             # Swagger декораторы
│   ├── set-swagger.decorator.ts   # Документация API
│   └── index.ts           # Экспорты декораторов
├── set.controller.ts       # Контроллер API
├── set.service.ts          # Бизнес-логика
├── set.module.ts           # Модуль NestJS
└── README.md              # Документация
```

## 🔧 API Endpoints

### Создание набора

```http
POST /sets
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Базовые английские слова",
  "description": "Набор базовых английских слов для начинающих",
  "type": "LANGUAGE",
  "level": "A1",
  "contentCategory": "EDUCATIONAL",
  "isPublic": true
}
```

### Получение всех наборов (с пагинацией и фильтрацией)

```http
GET /sets?page=1&limit=10&search=english&type=LANGUAGE&level=A1&sort=createdAt&order=desc
```

**Query параметры:**

- `page` - номер страницы (по умолчанию: 1)
- `limit` - количество элементов на странице (по умолчанию: 10)
- `search` - поиск по названию (без учета регистра)
- `type` - фильтр по типу набора (`LANGUAGE`, `CUSTOM`)
- `level` - фильтр по уровню сложности (`A1`, `A2`, `B1`, `B2`, `C1`, `C2`)
- `contentCategory` - фильтр по категории контента
- `sort` - поле для сортировки (`createdAt`, `name`, `type`, `level`)
- `order` - порядок сортировки (`asc`, `desc`)

**Ответ:**

```json
{
  "data": [
    {
      "id": "clx1234567890abcdef",
      "name": "Базовые английские слова",
      "slug": "bazovye-angliyskie-slova",
      "description": "Набор базовых английских слов для начинающих",
      "type": "LANGUAGE",
      "isBase": false,
      "isPublic": true,
      "userId": "user123",
      "languageId": "lang123",
      "level": "A1",
      "contentCategory": "EDUCATIONAL",
      "contentStatus": "DRAFT",
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  ],
  "pagination": {
    "total": 50,
    "page": 1,
    "limit": 10,
    "totalPages": 5,
    "hasNext": true,
    "hasPrev": false
  }
}
```

### Получение набора по ID

```http
GET /sets/:id
```

### Обновление набора

```http
PATCH /sets/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Обновленное название",
  "description": "Обновленное описание",
  "level": "A2"
}
```

### Удаление набора

```http
DELETE /sets/:id
Authorization: Bearer <token>
```

### Добавление карточки в набор

```http
POST /sets/:id/cards/:cardId
Authorization: Bearer <token>
```

### Удаление карточки из набора

```http
DELETE /sets/:id/cards/:cardId
Authorization: Bearer <token>
```

## 🔐 Права доступа

- **Создание, обновление, удаление**: Только администраторы (`ADMIN` роль)
- **Просмотр**: Все пользователи (публичные наборы)
- **Управление карточками**: Только администраторы (`ADMIN` роль)

## 📊 Типы данных

### SetType (Тип набора)

- `LANGUAGE` - Языковой набор
- `CUSTOM` - Пользовательский набор

### LanguageLevel (Уровень сложности)

- `A1` - Начальный уровень
- `A2` - Элементарный уровень
- `B1` - Средний уровень
- `B2` - Выше среднего
- `C1` - Продвинутый уровень
- `C2` - В совершенстве

### ContentCategory (Категория контента)

- `EDUCATIONAL` - Образовательный
- `ENTERTAINMENT` - Развлекательный
- `BUSINESS` - Деловой
- `TECHNICAL` - Технический
- `MEDICAL` - Медицинский
- `LEGAL` - Юридический
- `OTHER` - Другое

### ContentStatus (Статус контента)

- `DRAFT` - Черновик
- `PUBLISHED` - Опубликован
- `ARCHIVED` - Архивирован

## 🚀 Использование

### Создание набора

```typescript
import { SetService } from './set.service';
import { SetType, LanguageLevel, ContentCategory } from '@prisma/client';

@Injectable()
export class SomeService {
  constructor(private setService: SetService) {}

  async createSet() {
    const set = await this.setService.create(
      {
        name: 'Базовые английские слова',
        description: 'Набор базовых английских слов для начинающих',
        type: SetType.LANGUAGE,
        level: LanguageLevel.A1,
        contentCategory: ContentCategory.EDUCATIONAL,
        isPublic: true,
      },
      userId
    );
  }
}
```

### Получение наборов с фильтрацией

```typescript
// Все наборы с пагинацией
const result = await this.setService.findAll({
  page: 1,
  limit: 20,
  search: 'english',
  type: SetType.LANGUAGE,
  level: LanguageLevel.A1,
  sort: 'createdAt',
  order: 'desc',
});

// Конкретный набор
const set = await this.setService.findOne('set-id');
```

### Управление карточками в наборе

```typescript
// Добавить карточку в набор
await this.setService.addCardToSet('set-id', 'card-id');

// Удалить карточку из набора
await this.setService.removeCardFromSet('set-id', 'card-id');
```

## 🔄 Автоматическая генерация

- **Slug**: Автоматически генерируется из `name`
- **Timestamps**: `createdAt` и `updatedAt` устанавливаются автоматически
- **Defaults**: `type` = `LANGUAGE`, `isBase` = `false`, `isPublic` = `false`, `contentStatus` = `DRAFT`

## 📝 Примеры

### Базовый набор

```json
{
  "id": "clx1234567890abcdef",
  "name": "Базовые английские слова",
  "slug": "bazovye-angliyskie-slova",
  "description": "Набор базовых английских слов для начинающих",
  "type": "LANGUAGE",
  "isBase": false,
  "isPublic": true,
  "userId": "user123",
  "languageId": "lang123",
  "level": "A1",
  "contentCategory": "EDUCATIONAL",
  "contentStatus": "DRAFT",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

### Пользовательский набор

```json
{
  "name": "Мои любимые слова",
  "description": "Персональная коллекция интересных слов",
  "type": "CUSTOM",
  "isPublic": false,
  "level": "B2",
  "contentCategory": "ENTERTAINMENT"
}
```

## 🔗 Зависимости

- **Prisma**: Для работы с базой данных
- **@nestjs/swagger**: Для API документации
- **class-validator**: Для валидации DTO
- **class-transformer**: Для трансформации данных
- **Auth Module**: Для аутентификации и авторизации

## 📚 Swagger документация

Все endpoints документированы через Swagger декораторы в `set-swagger.decorator.ts`. Документация доступна по адресу `/api` при запуске приложения.

## 🔗 Связи с другими модулями

- **Card Module**: Наборы содержат карточки
- **User Module**: Наборы принадлежат пользователям
- **Language Module**: Наборы связаны с языками
- **Folder Module**: Наборы могут быть организованы в папки
- **Tag Module**: Наборы могут иметь теги
