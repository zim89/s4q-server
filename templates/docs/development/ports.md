# 🔌 Порты и конфигурация

## 🎯 Обзор

Документация по настройке портов для разных окружений и компонентов.

## 📋 Конфигурация портов

### Development (локальная разработка)

| Сервис                | Порт   | Описание                     |
| --------------------- | ------ | ---------------------------- |
| **Frontend (клиент)** | `3000` | React/Vue/Angular приложение |
| **Backend (API)**     | `3001` | NestJS сервер                |
| **PostgreSQL**        | `5433` | База данных                  |
| **Prisma Studio**     | `5555` | GUI для работы с БД          |

### Production

| Сервис         | Порт     | Описание            |
| -------------- | -------- | ------------------- |
| **API**        | `3000`   | Основной API сервер |
| **Frontend**   | `80/443` | Через nginx/proxy   |
| **PostgreSQL** | `5432`   | Внутренний порт БД  |

## 🔧 Настройка портов

### Backend (NestJS)

#### Через переменные окружения

```env
# .env.local
PORT=3001
```

#### Через командную строку

```bash
# Запуск на конкретном порту
PORT=3001 bun run dev

# Или через npm/bun
bun run dev -- --port 3001
```

### Frontend (клиент)

#### React

```json
// package.json
{
  "scripts": {
    "dev": "vite --port 3000"
  }
}
```

#### Vue

```json
// package.json
{
  "scripts": {
    "dev": "vite --port 3000"
  }
}
```

#### Angular

```json
// angular.json
{
  "serve": {
    "options": {
      "port": 3000
    }
  }
}
```

## 🌐 CORS настройки

### Backend конфигурация

```typescript
// main.ts
app.enableCors({
  origin: [
    'http://localhost:3000', // Frontend
    'http://localhost:3001', // Backend (если нужно)
  ],
  credentials: true,
});
```

### Environment variables

```env
# .env.local
CORS_ORIGINS=http://localhost:3000,http://localhost:3001
```

## 🚀 Запуск полного стека

### Development

```bash
# Terminal 1: Backend
cd s4q-server
bun run dev

# Terminal 2: Frontend
cd s4q-client
npm run dev

# Terminal 3: База данных
docker-compose up -d
```

### Проверка работы

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:3001
- **Swagger**: http://localhost:3001/api-docs
- **Prisma Studio**: http://localhost:5555

## 🔍 Проверка занятых портов

### macOS/Linux

```bash
# Проверка порта 3000
lsof -i :3000

# Проверка порта 3001
lsof -i :3001

# Проверка всех портов
netstat -tulpn | grep LISTEN
```

### Windows

```bash
# Проверка портов
netstat -ano | findstr :3000
netstat -ano | findstr :3001
```

## 🐛 Troubleshooting

### Порт занят

```bash
# Найти процесс
lsof -i :3001

# Остановить процесс
kill -9 <PID>

# Или изменить порт
PORT=3002 bun run dev
```

### CORS ошибки

```bash
# Проверьте настройки CORS в main.ts
# Убедитесь, что frontend URL добавлен в origins
```

## 📚 Дополнительные ресурсы

- [NestJS CORS](https://docs.nestjs.com/security/cors)
- [Vite Configuration](https://vitejs.dev/config/)
- [Angular CLI](https://angular.io/cli)
