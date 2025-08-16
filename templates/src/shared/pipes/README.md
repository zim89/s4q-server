# Pipes

Кастомные pipes для валидации и трансформации данных в NestJS.

## 📁 Структура

```
src/shared/pipes/
├── body-required.ts  # Pipe для проверки наличия тела запроса
├── index.ts          # Централизованный экспорт
└── README.md         # Документация
```

## 🔧 Pipes

### body-required.ts

**Назначение**: Pipe для валидации наличия и непустоты тела запроса

**Функциональность:**

- Проверяет, что тело запроса не null/undefined
- Проверяет, что тело запроса не пустая строка
- Проверяет, что тело запроса не пустой массив
- Проверяет, что тело запроса не пустой объект

**Использование:**

#### 1. На уровне метода (рекомендуется)

```typescript
import { BodyRequiredPipe } from 'src/shared/pipes';

@Post('create')
createUser(@Body(BodyRequiredPipe) createUserDto: CreateUserDto) {
  return this.userService.create(createUserDto);
}
```

#### 2. На уровне контроллера

```typescript
import { BodyRequiredPipe } from 'src/shared/pipes';

@Controller('users')
@UsePipes(BodyRequiredPipe)
export class UserController {
  @Post('create')
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }
}
```

#### 3. Глобально (в main.ts)

```typescript
import { BodyRequiredPipe } from 'src/shared/pipes';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new BodyRequiredPipe());
  await app.listen(3000);
}
```

## 📝 Принципы

### Названия файлов

- ✅ **kebab-case** - `body-required.ts`, `validation-pipe.ts`
- ✅ **Понятные названия** - сразу ясно назначение
- ✅ **Без суффиксов** - не `body-required.pipe.ts`

### Названия классов

- ✅ **PascalCase** - `BodyRequiredPipe`, `ValidationPipe`
- ✅ **Суффикс Pipe** - обязательно для pipes
- ✅ **Понятные названия** - `BodyRequiredPipe`, `EmailValidationPipe`

### Документация

- ✅ **JSDoc для всех pipes**
- ✅ **Примеры использования**
- ✅ **Описание функциональности**

### Обработка ошибок

- ✅ **Использование констант** - `errorMessages.common.badRequestBody`
- ✅ **Понятные сообщения** - на английском языке
- ✅ **Appropriate HTTP status** - 400 Bad Request

## 🚀 Добавление новых pipes

### 1. Создайте файл

```typescript
// src/shared/pipes/email-validation.ts
import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

/**
 * Pipe to validate email format
 */
@Injectable()
export class EmailValidationPipe implements PipeTransform {
  transform(value: unknown): unknown {
    if (typeof value === 'string' && !this.isValidEmail(value)) {
      throw new BadRequestException('Invalid email format');
    }
    return value;
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}
```

### 2. Добавьте в index.ts

```typescript
// src/shared/pipes/index.ts
export * from './body-required';
export * from './email-validation';
```

### 3. Добавьте документацию

```typescript
/**
 * Pipe to validate email format
 *
 * @example
 * @Post('register')
 * register(@Body('email', EmailValidationPipe) email: string) {
 *   return this.authService.register(email);
 * }
 */
```

## 📋 Примеры pipes

### validation-pipe.ts

```typescript
/**
 * Generic validation pipe for DTOs
 */
@Injectable()
export class ValidationPipe implements PipeTransform {
  transform(value: unknown, metadata: ArgumentMetadata): unknown {
    // Validation logic
    return value;
  }
}
```

### transform-pipe.ts

```typescript
/**
 * Pipe to transform data before processing
 */
@Injectable()
export class TransformPipe implements PipeTransform {
  transform(value: unknown): unknown {
    // Transformation logic
    return value;
  }
}
```

## 🔄 Импорты

### Централизованный импорт (рекомендуется)

```typescript
import { BodyRequiredPipe } from 'src/shared/pipes';
```

### Прямой импорт

```typescript
import { BodyRequiredPipe } from 'src/shared/pipes/body-required';
```

## ⚠️ Важные моменты

### Производительность

- Pipes выполняются для каждого запроса
- Избегайте тяжелых операций в pipes
- Используйте кэширование при необходимости

### Типизация

- Всегда типизируйте параметры и возвращаемые значения
- Используйте `unknown` для входных значений
- Приводите к нужному типу после валидации

### Обработка ошибок

- Используйте подходящие HTTP статусы
- Предоставляйте понятные сообщения об ошибках
- Логируйте ошибки для отладки
