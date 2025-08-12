# Auth DTOs

Data Transfer Objects для аутентификации в auth модуле.

## DTOs

### AuthResponseDto

**Назначение**: Ответ API для аутентификации

**Используется в:**

- `POST /auth/register` - ответ после регистрации
- `POST /auth/login` - ответ после входа
- `POST /auth/refresh` - ответ после обновления токена

**Структура:**

```typescript
{
  accessToken: string; // JWT токен для API
  user: AuthenticatedUser; // Данные пользователя
}
```

### LoginDto

**Назначение**: Входные данные для входа в систему

**Используется в:**

- `POST /auth/login` - вход в систему

**Структура:**

```typescript
{
  email: string; // Email пользователя
  password: string; // Пароль пользователя
}
```

**Валидация:**

- `email` - обязательное, формат email
- `password` - обязательное, 6-20 символов

### RegisterDto

**Назначение**: Входные данные для регистрации

**Используется в:**

- `POST /auth/register` - регистрация нового пользователя

**Структура:**

```typescript
{
  firstName: string; // Имя пользователя
  lastName: string; // Фамилия пользователя
  email: string; // Email пользователя
  password: string; // Пароль пользователя
}
```

**Валидация:**

- `firstName` - обязательное, строка, максимум 50 символов
- `lastName` - обязательное, строка, максимум 50 символов
- `email` - обязательное, формат email
- `password` - обязательное, 6-20 символов

## Использование

### В контроллерах:

```typescript
import { LoginDto, RegisterDto } from '../dto';

@Controller('auth')
export class AuthController {
  @Post('login')
  async login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @Post('register')
  async register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }
}
```

### В сервисах:

```typescript
import type { LoginDto, RegisterDto } from '../dto';

@Injectable()
export class AuthService {
  async login(dto: LoginDto) {
    // Логика входа
  }

  async register(dto: RegisterDto) {
    // Логика регистрации
  }
}
```

### В Swagger документации:

```typescript
import { AuthResponseDto } from '../dto';

@ApiOkResponse({ type: AuthResponseDto })
@Post('login')
async login(@Body() dto: LoginDto) {
  // ...
}
```

## Импорт

```typescript
// Импорт всех DTO
import { AuthResponseDto, LoginDto, RegisterDto } from '../dto';

// Или импорт по отдельности
import { LoginDto } from '../dto/login.dto';
import { RegisterDto } from '../dto/register.dto';
import { AuthResponseDto } from '../dto/auth-response.dto';
```

## Валидация

Все DTO используют `class-validator` для валидации:

```typescript
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class LoginDto {
  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(20)
  password!: string;
}
```

## Swagger документация

Все DTO имеют `@ApiProperty` декораторы для автоматической генерации Swagger документации:

```typescript
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({
    description: 'Email address of the user',
    example: 'john.doe@example.com',
  })
  email!: string;
}
```
