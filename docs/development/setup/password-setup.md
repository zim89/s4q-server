# 🔐 Настройка паролей

## 🎯 Обзор

Этот документ описывает, как безопасно настроить пароли для разных окружений.

## 📋 Политика безопасности

### Development (локальная разработка)

- **Пользователь**: `postgres` (стандартный)
- **Пароль**: `dev_password` (простой для разработки)
- **База данных**: `s4q_db_dev`

### Production

- **Пользователь**: уникальное имя (например, `s4q_app`)
- **Пароль**: сложный пароль (минимум 16 символов)
- **База данных**: `s4q_db_prod`

## 🔧 Настройка личного пароля

### 1. Создание .env.local

```bash
# Скопируйте пример файла
cp env.example .env.local
```

### 2. Обновление пароля

Отредактируйте `.env.local` и замените `dev_password` на ваш пароль:

```env
# Ваш личный пароль для разработки
POSTGRES_URI=postgresql://postgres:YOUR_PASSWORD@localhost:5433/s4q_db_dev
```

### 3. Обновление Docker конфигурации

Если хотите использовать свой пароль в Docker, обновите `docker-compose.override.yml`:

```yaml
services:
  postgres:
    environment:
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=YOUR_PASSWORD # Ваш пароль
      - POSTGRES_DB=s4q_db_dev
```

## 🚨 Важные замечания

### ✅ Что делать:

- Используйте `.env.local` для личных настроек
- Добавьте `.env.local` в `.gitignore`
- Используйте сложные пароли в production
- Регулярно меняйте пароли

### ❌ Что НЕ делать:

- Не коммитьте пароли в Git
- Не используйте простые пароли в production
- Не передавайте пароли через незащищенные каналы
- Не храните пароли в открытом виде

## 🔄 Обновление паролей

### Development

```bash
# Остановка контейнеров
docker-compose down

# Обновление .env.local
# Перезапуск с новым паролем
docker-compose up -d
```

### Production

```bash
# Обновление переменных окружения
export POSTGRES_PASSWORD="new_secure_password"

# Перезапуск с новыми настройками
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d
```

## 📚 Дополнительные ресурсы

- [Docker Security](https://docs.docker.com/engine/security/)
- [PostgreSQL Security](https://www.postgresql.org/docs/current/security.html)
- [Environment Variables Best Practices](https://12factor.net/config)
