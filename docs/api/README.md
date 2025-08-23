# 🔌 API документация

Документация API для Space4Quizlet Server.

## 🎯 Обзор

Space4Quizlet Server предоставляет RESTful API для работы с:

- **Пользователями** - регистрация, аутентификация, профили
- **Карточками** - создание, изучение, управление карточками
- **Наборами** - создание и управление наборами карточек
- **Прогрессом** - отслеживание прогресса изучения

## 🚀 Быстрый старт

### Базовый URL

```
http://localhost:4000/v1
```

### Аутентификация

API использует JWT токены для аутентификации:

```bash
# Получение токена
curl -X POST http://localhost:4000/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "user@example.com", "password": "password"}'

# Использование токена
curl -X GET http://localhost:4000/v1/users/me \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## 📋 Endpoints

### Аутентификация

| Метод  | Endpoint         | Описание                 |
| ------ | ---------------- | ------------------------ |
| `POST` | `/auth/register` | Регистрация пользователя |
| `POST` | `/auth/login`    | Вход в систему           |
| `POST` | `/auth/logout`   | Выход из системы         |
| `POST` | `/auth/refresh`  | Обновление токена        |

### Пользователи

| Метод    | Endpoint    | Описание           |
| -------- | ----------- | ------------------ |
| `GET`    | `/users/me` | Получение профиля  |
| `PUT`    | `/users/me` | Обновление профиля |
| `DELETE` | `/users/me` | Удаление аккаунта  |

### Карточки

| Метод    | Endpoint     | Описание            |
| -------- | ------------ | ------------------- |
| `GET`    | `/cards`     | Список карточек     |
| `POST`   | `/cards`     | Создание карточки   |
| `GET`    | `/cards/:id` | Получение карточки  |
| `PUT`    | `/cards/:id` | Обновление карточки |
| `DELETE` | `/cards/:id` | Удаление карточки   |

### Наборы

| Метод    | Endpoint    | Описание          |
| -------- | ----------- | ----------------- |
| `GET`    | `/sets`     | Список наборов    |
| `POST`   | `/sets`     | Создание набора   |
| `GET`    | `/sets/:id` | Получение набора  |
| `PUT`    | `/sets/:id` | Обновление набора |
| `DELETE` | `/sets/:id` | Удаление набора   |

### Сидинг данных

| Метод  | Endpoint             | Описание               |
| ------ | -------------------- | ---------------------- |
| `POST` | `/seed/languages`    | Заполнение языков      |
| `POST` | `/seed/initial-data` | Заполнение всех данных |
| `GET`  | `/seed/stats`        | Статистика сидинга     |

## 🔐 Аутентификация и авторизация

### JWT токены

API использует два типа токенов:

- **Access Token** - для доступа к API (короткий срок жизни)
- **Refresh Token** - для обновления access токена (долгий срок жизни)

### Роли пользователей

- **USER** - обычный пользователь
- **PREMIUM** - премиум пользователь
- **MANAGER** - менеджер
- **ADMIN** - администратор

## 📊 Коды ответов

| Код   | Описание                  |
| ----- | ------------------------- |
| `200` | Успешный запрос           |
| `201` | Ресурс создан             |
| `400` | Неверный запрос           |
| `401` | Не авторизован            |
| `403` | Доступ запрещен           |
| `404` | Ресурс не найден          |
| `409` | Конфликт                  |
| `500` | Внутренняя ошибка сервера |

## 📝 Примеры запросов

### Регистрация пользователя

```bash
curl -X POST http://localhost:4000/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "securepassword123",
    "firstName": "John",
    "lastName": "Doe"
  }'
```

### Создание карточки

```bash
curl -X POST http://localhost:4000/v1/cards \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "wordOrPhrase": "beautiful",
    "languageId": "en"
  }'
```

### Получение списка карточек

```bash
curl -X GET "http://localhost:4000/v1/cards?page=1&limit=10" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## 🔗 Swagger документация

Интерактивная документация доступна по адресу:
http://localhost:4000/v1/docs

## 📚 Дополнительно

- **[Версионирование API](versioning/README.md)** - Система версионирования
- **[Аутентификация](authentication.md)** - Подробная информация об аутентификации
- **[Endpoints](endpoints/)** - Детальная документация по каждому endpoint

## 🆘 Поддержка

Если у вас есть вопросы по API:

1. Проверьте [Swagger документацию](http://localhost:4000/v1/docs)
2. Ознакомьтесь с [примерами](versioning/versioning-examples.md)
3. Создайте issue в GitHub репозитории
