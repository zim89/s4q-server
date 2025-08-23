# 🔄 Автоматическое получение версии

## 🎯 Принцип

Автоматическое получение версии приложения из константы без чтения `package.json`.

## 📝 Реализация

### Константа версии

```typescript
// src/shared/constants/api-versions.ts
export const APP_VERSION = '0.1.0' as const;
```

### VersionService

```typescript
// src/shared/services/version.service.ts
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { APP_VERSION } from 'src/shared/constants';

@Injectable()
export class VersionService {
  constructor(private readonly configService: ConfigService) {}

  getVersion(): string {
    return APP_VERSION; // '0.1.0'
  }

  getVersionInfo() {
    return {
      version: this.getVersion(),
      build: this.configService.get<string>('BUILD_ID', 'local'),
    };
  }
}
```

## 🔧 Использование в API

### Эндпоинт версии

```typescript
// GET /v0/version
{
  "version": "0.1.0",
  "build": "local"
}
```

### Эндпоинт состояния

```typescript
// GET /v0/health
{
  "status": "ok",
  "version": "0.1.0",
  "timestamp": "2024-01-15T10:30:00.000Z",
  "uptime": 3600,
  "environment": "development",
  "memory": {
    "used": 45,
    "total": 128
  }
}
```

## 🎯 Преимущества

1. **Простота** - одна константа для версии
2. **Производительность** - нет чтения файлов
3. **Типизация** - строгая типизация версии
4. **Консистентность** - единый источник истины
5. **Безопасность** - нет доступа к файловой системе

## 🚀 Изменение версии

Для изменения версии достаточно обновить константу:

```typescript
// src/shared/constants/api-versions.ts
export const APP_VERSION = '0.1.1' as const;
```

Все API эндпоинты автоматически будут возвращать новую версию.

---

_Простое и эффективное получение версии!_ 🚀
