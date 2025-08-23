# ⚙️ Настройка окружения

Руководство по настройке переменных окружения для Space4Quizlet Server.

## 📋 Обзор переменных

Проект использует следующие категории переменных окружения:

- **Основные настройки** - порт, окружение, домены
- **База данных** - подключение к PostgreSQL
- **JWT** - настройки токенов аутентификации
- **Интеграции** - внешние API (словарь)

## 🚀 Быстрая настройка

### 1. Создание файла .env

```bash
# Скопируйте пример файла
cp env.example .env
```

### 2. Редактирование .env

Откройте `.env` файл и настройте переменные:

```bash
# Основные настройки
NODE_ENV=development
PORT=4000
GLOBAL_PREFIX=v1

# Домены и CORS
COOKIE_DOMAIN=localhost
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:3001

# База данных
POSTGRES_USER=postgres
POSTGRES_PASSWORD=dev_password
POSTGRES_HOST=localhost
POSTGRES_PORT=5433
POSTGRES_DB=s4q_db
POSTGRES_URI=postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${POSTGRES_HOST}:${POSTGRES_PORT}/${POSTGRES_DB}?schema=public

# JWT токены
JWT_SECRET=your-super-secret-jwt-key-here
JWT_ACCESS_TOKEN_TTL=1h
JWT_REFRESH_TOKEN_TTL=7d

# Интеграции
FREE_DICTIONARY_API_BASE_URL=https://api.dictionaryapi.dev/api/v2/entries
```

## 🔧 Детальная настройка

### Основные настройки

| Переменная      | Описание                 | Значение по умолчанию |
| --------------- | ------------------------ | --------------------- |
| `NODE_ENV`      | Окружение приложения     | `development`         |
| `PORT`          | Порт для запуска сервера | `4000`                |
| `GLOBAL_PREFIX` | Префикс API              | `v1`                  |

### База данных

| Переменная          | Описание               | Пример           |
| ------------------- | ---------------------- | ---------------- |
| `POSTGRES_USER`     | Пользователь БД        | `postgres`       |
| `POSTGRES_PASSWORD` | Пароль БД              | `dev_password`   |
| `POSTGRES_HOST`     | Хост БД                | `localhost`      |
| `POSTGRES_PORT`     | Порт БД                | `5433`           |
| `POSTGRES_DB`       | Имя базы данных        | `s4q_db`         |
| `POSTGRES_URI`      | Полный URI подключения | Автогенерируется |

### JWT аутентификация

| Переменная              | Описание                   | Пример                     |
| ----------------------- | -------------------------- | -------------------------- |
| `JWT_SECRET`            | Секретный ключ для JWT     | Генерируется автоматически |
| `JWT_ACCESS_TOKEN_TTL`  | Время жизни access токена  | `1h`                       |
| `JWT_REFRESH_TOKEN_TTL` | Время жизни refresh токена | `7d`                       |

### CORS и домены

| Переменная        | Описание                | Пример                                        |
| ----------------- | ----------------------- | --------------------------------------------- |
| `COOKIE_DOMAIN`   | Домен для cookies       | `localhost`                                   |
| `ALLOWED_ORIGINS` | Разрешенные CORS домены | `http://localhost:3000,http://localhost:3001` |

## 🔐 Безопасность

### Генерация JWT_SECRET

```bash
# Генерация безопасного секрета
openssl rand -hex 32
```

### Production настройки

Для production окружения:

```bash
NODE_ENV=production
PORT=4000
GLOBAL_PREFIX=v1

# Используйте реальные домены
COOKIE_DOMAIN=yourdomain.com
ALLOWED_ORIGINS=https://yourdomain.com

# Используйте переменные окружения Docker/сервера
POSTGRES_URI=${DATABASE_URL}
JWT_SECRET=${JWT_SECRET}
```

## ✅ Проверка настроек

### 1. Валидация схемы

```bash
# Проверка валидности переменных
bun run start:dev
```

### 2. Тест подключения к БД

```bash
# Проверка подключения
bun run prisma:generate
bun run prisma:db:push
```

### 3. Проверка API

```bash
# Health check
curl http://localhost:4000/v1/health
```

## 🆘 Проблемы

### Частые ошибки

1. **"Invalid database URL"**
   - Проверьте `POSTGRES_URI`
   - Убедитесь, что БД запущена

2. **"JWT_SECRET is required"**
   - Установите `JWT_SECRET`
   - Используйте безопасный секрет

3. **"Port already in use"**
   - Измените `PORT`
   - Остановите другие сервисы

### Отладка

```bash
# Просмотр всех переменных (только для разработки)
node -e "console.log(process.env)"

# Проверка конкретной переменной
echo $POSTGRES_URI
```

## 📚 Дополнительно

- [Конфигурация приложения](../architecture/README.md#конфигурация)
- [Docker настройки](../deployment/docker.md)
- [Production развертывание](../deployment/production.md)
