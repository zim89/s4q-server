# Prisma Infrastructure

Интеграция с базой данных через Prisma ORM.

## 📁 Структура

```
src/infrastructure/prisma/
├── prisma.module.ts    # Глобальный модуль Prisma
├── prisma.service.ts   # Сервис для работы с БД
├── index.ts           # Экспорты
└── README.md          # Документация
```

## 🔧 Компоненты

### PrismaModule

**Назначение**: Глобальный модуль для предоставления PrismaService

**Декораторы**: `@Global()`

**Функциональность:**

- Предоставляет PrismaService как глобальный провайдер
- Автоматически управляет жизненным циклом подключения
- Доступен во всех модулях приложения

**Использование:**

```typescript
import { PrismaModule } from 'src/infrastructure/prisma';

@Module({
  imports: [PrismaModule],
})
export class AppModule {}
```

### PrismaService

**Назначение**: Сервис для работы с базой данных

**Наследование**: `extends PrismaClient`

**Интерфейсы**: `OnModuleInit`, `OnModuleDestroy`

**Функциональность:**

- Расширяет PrismaClient с автоматическим управлением подключением
- Обрабатывает жизненный цикл подключения к БД
- Предоставляет типобезопасный доступ к базе данных

**Использование:**

```typescript
import { PrismaService } from 'src/infrastructure/prisma';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.user.findMany();
  }
}
```

## 📋 Примеры использования

### Базовые операции CRUD

```typescript
// user.service.ts
import { PrismaService } from 'src/infrastructure/prisma';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  // Создание
  async create(data: CreateUserDto) {
    return this.prisma.user.create({
      data: {
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        password: hashedPassword,
      },
    });
  }

  // Чтение
  async findById(id: string) {
    return this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        isActive: true,
        createdAt: true,
      },
    });
  }

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async findAll() {
    return this.prisma.user.findMany({
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        isActive: true,
        createdAt: true,
      },
    });
  }

  // Обновление
  async update(id: string, data: UpdateUserDto) {
    return this.prisma.user.update({
      where: { id },
      data,
    });
  }

  // Удаление
  async delete(id: string) {
    return this.prisma.user.delete({
      where: { id },
    });
  }
}
```

### Сложные запросы

```typescript
// user.service.ts
import { PrismaService } from 'src/infrastructure/prisma';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  // Поиск с фильтрацией и пагинацией
  async findWithFilters(filters: UserFiltersDto) {
    const { page = 1, limit = 10, search, isActive } = filters;
    const skip = (page - 1) * limit;

    return this.prisma.user.findMany({
      where: {
        AND: [
          search
            ? {
                OR: [
                  { firstName: { contains: search, mode: 'insensitive' } },
                  { lastName: { contains: search, mode: 'insensitive' } },
                  { email: { contains: search, mode: 'insensitive' } },
                ],
              }
            : {},
          isActive !== undefined ? { isActive } : {},
        ],
      },
      skip,
      take: limit,
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        isActive: true,
        createdAt: true,
      },
    });
  }

  // Подсчет общего количества
  async count(filters: UserFiltersDto) {
    const { search, isActive } = filters;

    return this.prisma.user.count({
      where: {
        AND: [
          search
            ? {
                OR: [
                  { firstName: { contains: search, mode: 'insensitive' } },
                  { lastName: { contains: search, mode: 'insensitive' } },
                  { email: { contains: search, mode: 'insensitive' } },
                ],
              }
            : {},
          isActive !== undefined ? { isActive } : {},
        ],
      },
    });
  }
}
```

### Транзакции

```typescript
// auth.service.ts
import { PrismaService } from 'src/infrastructure/prisma';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async registerWithProfile(
    userData: CreateUserDto,
    profileData: CreateProfileDto
  ) {
    return this.prisma.$transaction(async tx => {
      // Создаем пользователя
      const user = await tx.user.create({
        data: {
          email: userData.email,
          firstName: userData.firstName,
          lastName: userData.lastName,
          password: userData.password,
        },
      });

      // Создаем профиль
      const profile = await tx.profile.create({
        data: {
          ...profileData,
          userId: user.id,
        },
      });

      // Создаем сессию
      const session = await tx.session.create({
        data: {
          userId: user.id,
          refreshToken: generateRefreshToken(),
          expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 дней
        },
      });

      return { user, profile, session };
    });
  }

  async updateUserWithProfile(
    userId: string,
    userData: UpdateUserDto,
    profileData: UpdateProfileDto
  ) {
    return this.prisma.$transaction(async tx => {
      const [user, profile] = await Promise.all([
        tx.user.update({
          where: { id: userId },
          data: userData,
        }),
        tx.profile.update({
          where: { userId },
          data: profileData,
        }),
      ]);

      return { user, profile };
    });
  }
}
```

### Отношения и включения

```typescript
// user.service.ts
import { PrismaService } from 'src/infrastructure/prisma';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  // Получение пользователя с профилем
  async findByIdWithProfile(id: string) {
    return this.prisma.user.findUnique({
      where: { id },
      include: {
        profile: true,
        sessions: {
          where: { expiresAt: { gt: new Date() } },
          orderBy: { createdAt: 'desc' },
        },
      },
    });
  }

  // Получение пользователя с активными сессиями
  async findByIdWithActiveSessions(id: string) {
    return this.prisma.user.findUnique({
      where: { id },
      include: {
        sessions: {
          where: {
            expiresAt: { gt: new Date() },
          },
          orderBy: { createdAt: 'desc' },
        },
      },
    });
  }

  // Получение всех пользователей с профилями
  async findAllWithProfiles() {
    return this.prisma.user.findMany({
      include: {
        profile: true,
        _count: {
          select: {
            sessions: true,
          },
        },
      },
    });
  }
}
```

## 📝 Принципы

### Названия файлов

- ✅ **Понятные названия** - `prisma.module.ts`, `prisma.service.ts`
- ✅ **Консистентность** - единый стиль именования
- ✅ **Описательность** - название отражает назначение

### Названия классов

- ✅ **Суффикс Service** - для сервисов
- ✅ **Суффикс Module** - для модулей
- ✅ **Понятные названия** - описывают функциональность

### Архитектура

- ✅ **Глобальный модуль** - доступен во всех частях приложения
- ✅ **Автоматическое управление** - подключение/отключение
- ✅ **Типобезопасность** - строгая типизация

## ⚠️ Важные моменты

### Производительность

- Используйте `select` для выбора только нужных полей
- Применяйте `include` для загрузки связанных данных
- Используйте пагинацию для больших наборов данных
- Кэшируйте часто используемые запросы

### Безопасность

- Всегда валидируйте входные данные
- Используйте параметризованные запросы
- Ограничивайте доступ к чувствительным данным
- Логируйте важные операции

### Транзакции

- Используйте транзакции для атомарных операций
- Обрабатывайте ошибки в транзакциях
- Избегайте длительных транзакций
- Используйте `$transaction` для сложных операций

## 🔧 Конфигурация

### Prisma Schema

```prisma
// prisma/schema.prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id        String   @id @default(cuid())
  email     String   @unique
  firstName String
  lastName  String
  password  String
  isActive  Boolean  @default(true)
  role      Role     @default(USER)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  // Отношения
  profile Profile?
  sessions Session[]

  @@map("users")
}

model Profile {
  id       String @id @default(cuid())
  userId   String @unique
  avatar   String?
  bio      String?
  location String?
  website  String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  // Отношения
  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@map("profiles")
}

model Session {
  id           String   @id @default(cuid())
  userId       String
  refreshToken String   @unique
  expiresAt    DateTime
  ipAddress    String?
  userAgent    String?
  createdAt    DateTime @default(now())

  // Отношения
  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@map("sessions")
}

enum Role {
  USER
  MODERATOR
  ADMIN
}
```

### Environment Variables

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/s4q_db"

# Prisma
PRISMA_LOG_LEVEL=info
```

## 🚀 Миграции

### Создание миграции

```bash
npx prisma migrate dev --name add_user_profile
```

### Применение миграций

```bash
npx prisma migrate deploy
```

### Сброс базы данных

```bash
npx prisma migrate reset
```

### Генерация клиента

```bash
npx prisma generate
```
