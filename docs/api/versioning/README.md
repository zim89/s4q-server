# 🔢 Версионирование

## 📋 Обзор

Документация по версионированию приложения и API.

## 📚 Разделы

- [Руководство по версионированию](versioning-guide.md) - принципы семантического версионирования
- [Примеры версионирования](versioning-examples.md) - практические примеры
- [Простое версионирование API](simple-versioning.md) - текущий подход к версионированию API
- [Автоматическое получение версии](auto-versioning.md) - как работает автоматическое получение версии

## 🎯 Текущий подход

### Версия приложения

- **Константа:** `APP_VERSION = '0.1.0'`
- **Расположение:** `src/shared/constants/api-versions.ts`
- **Использование:** Через `VersionService.getVersion()`

### Версии API

- **Текущая версия:** `v0` (все контроллеры)
- **Константы:** `apiVersions.v0 = '0'`
- **Использование:** `@Controller({ path: 'auth', version: apiVersions.v0 })`

## 🚀 Быстрый старт

### Изменение версии приложения

```typescript
// src/shared/constants/api-versions.ts
export const APP_VERSION = '0.1.1' as const;
```

### Изменение версии API

```typescript
// src/shared/constants/api-versions.ts
export const apiVersions = {
  v0: '0', // Текущая версия
  v1: '1', // Будущая версия
};
```

## 📊 Эндпоинты

Все эндпоинты доступны по версии `v0`:

- `GET /v0/health` - состояние приложения
- `GET /v0/info` - информация о приложении
- `GET /v0/version` - версия приложения
- `POST /v0/auth/register` - регистрация
- `POST /v0/auth/login` - вход

---

_Простое и понятное версионирование для разработки!_ 🚀
