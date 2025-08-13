# Infrastructure

Инфраструктурные компоненты для приложения.

## 📁 Структура

```
src/infrastructure/
├── prisma/           # База данных (Prisma ORM)
│   ├── prisma.module.ts
│   ├── prisma.service.ts
│   ├── index.ts
│   └── README.md
├── file-upload/      # Загрузка файлов (TODO)
│   └── index.ts
├── logger/           # Логирование (TODO)
│   └── index.ts
├── database/         # Дополнительная БД функциональность (TODO)
│   └── index.ts

└── README.md         # Документация
```

## 🔧 Компоненты

### prisma/

**Назначение**: Интеграция с базой данных через Prisma ORM

**Файлы:**

- `prisma.module.ts` - Глобальный модуль для Prisma
- `prisma.service.ts` - Сервис для работы с базой данных
- `index.ts` - Экспорты

**Использование:**

```typescript
import { PrismaModule, PrismaService } from 'src/infrastructure/prisma';

// В app.module.ts
imports: [PrismaModule]

// В сервисе
constructor(private prisma: PrismaService) {}
```

### file-upload/ (TODO)

**Назначение**: Загрузка и управление файлами

**Планируемая функциональность:**

- Загрузка файлов на сервер
- Интеграция с облачными хранилищами (S3, Cloudinary)
- Валидация файлов
- Управление метаданными

### logger/ (TODO)

**Назначение**: Кастомное логирование

**Планируемая функциональность:**

- Структурированное логирование
- Ротация логов
- Интеграция с внешними сервисами
- Уровни логирования

### database/ (TODO)

**Назначение**: Дополнительная функциональность для работы с БД

**Планируемая функциональность:**

- Миграции
- Бэкапы
- Мониторинг производительности
- Кэширование

## 📋 Примеры использования

### Настройка Prisma модуля

```typescript
// app.module.ts
import { PrismaModule } from 'src/infrastructure/prisma';

@Module({
  imports: [
    PrismaModule, // Глобальный модуль
    // другие модули
  ],
})
export class AppModule {}
```

### Использование PrismaService

```typescript
// user.service.ts
import { PrismaService } from 'src/infrastructure/prisma';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.user.findMany();
  }

  async findById(id: string) {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  async create(data: CreateUserDto) {
    return this.prisma.user.create({
      data,
    });
  }

  async update(id: string, data: UpdateUserDto) {
    return this.prisma.user.update({
      where: { id },
      data,
    });
  }

  async delete(id: string) {
    return this.prisma.user.delete({
      where: { id },
    });
  }
}
```

### Транзакции

```typescript
// complex.service.ts
import { PrismaService } from 'src/infrastructure/prisma';

@Injectable()
export class ComplexService {
  constructor(private prisma: PrismaService) {}

  async createUserWithProfile(
    userData: CreateUserDto,
    profileData: CreateProfileDto
  ) {
    return this.prisma.$transaction(async tx => {
      const user = await tx.user.create({
        data: userData,
      });

      const profile = await tx.profile.create({
        data: {
          ...profileData,
          userId: user.id,
        },
      });

      return { user, profile };
    });
  }
}
```

## 📝 Принципы

### Названия файлов

- ✅ **Понятные названия** - `prisma.service.ts`, `file-upload.service.ts`
- ✅ **Консистентность** - единый стиль именования
- ✅ **Описательность** - название отражает назначение

### Названия классов

- ✅ **Суффикс Service** - для сервисов
- ✅ **Суффикс Module** - для модулей
- ✅ **Понятные названия** - описывают функциональность

### Архитектура

- ✅ **Разделение ответственности** - каждый компонент отвечает за свою область
- ✅ **Глобальные модули** - для часто используемых сервисов
- ✅ **Интерфейсы** - для абстракции

## 🚀 Добавление новых компонентов

### 1. Создайте папку для компонента

```bash
mkdir src/infrastructure/new-component
```

### 2. Создайте базовые файлы

```typescript
// src/infrastructure/new-component/new-component.service.ts
import { Injectable } from '@nestjs/common';

@Injectable()
export class NewComponentService {
  // Реализация
}
```

```typescript
// src/infrastructure/new-component/new-component.module.ts
import { Module } from '@nestjs/common';
import { NewComponentService } from './new-component.service';

@Module({
  providers: [NewComponentService],
  exports: [NewComponentService],
})
export class NewComponentModule {}
```

### 3. Создайте индексный файл

```typescript
// src/infrastructure/new-component/index.ts
export { NewComponentService } from './new-component.service';
export { NewComponentModule } from './new-component.module';
```

### 4. Используйте в приложении

```typescript
// app.module.ts
import { NewComponentModule } from 'src/infrastructure/new-component';

@Module({
  imports: [NewComponentModule],
})
export class AppModule {}
```

## ⚠️ Важные моменты

### Производительность

- Используйте connection pooling для базы данных
- Кэшируйте часто используемые данные
- Оптимизируйте запросы к БД

### Безопасность

- Валидируйте все входные данные
- Используйте prepared statements
- Ограничивайте доступ к файловой системе

### Масштабируемость

- Используйте асинхронные операции
- Поддерживайте горизонтальное масштабирование
- Мониторьте производительность

## 🔧 Конфигурация

### Prisma

```typescript
// prisma/schema.prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// Модели данных
model User {
  id        String   @id @default(cuid())
  email     String   @unique
  name      String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

### Environment Variables

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/dbname"

# File Upload (TODO)
UPLOAD_PATH="./uploads"
MAX_FILE_SIZE=10485760

# Logging (TODO)
LOG_LEVEL=info
LOG_FILE="./logs/app.log"
```
