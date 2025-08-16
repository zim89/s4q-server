# Auth Decorators

Коллекция декораторов для аутентификации и авторизации в auth модуле.

## Декораторы

### @Auth(roles?)

Защищает эндпоинт аутентификацией и авторизацией по ролям.

```typescript
import { Auth, CurrentUser } from '../decorators';
import { UserRole } from '@prisma/client';

@Controller('profile')
export class ProfileController {
  // Защита по умолчанию (роль USER)
  @Get()
  @Auth()
  getProfile(@CurrentUser() user: AuthenticatedUser) {
    return user;
  }

  // Защита конкретной ролью
  @Get('admin')
  @Auth(UserRole.ADMIN)
  getAdminData() {
    return 'Admin only data';
  }

  // Защита несколькими ролями
  @Get('moderator')
  @Auth([UserRole.MODERATOR, UserRole.ADMIN])
  getModeratorData() {
    return 'Moderator or Admin data';
  }
}
```

### @CurrentUser(field?)

Извлекает текущего аутентифицированного пользователя из запроса.

```typescript
import { CurrentUser } from '../decorators';

@Controller('user')
export class UserController {
  // Получить полный объект пользователя
  @Get('profile')
  @Auth()
  getProfile(@CurrentUser() user: AuthenticatedUser) {
    return user;
  }

  // Получить конкретное поле
  @Get('id')
  @Auth()
  getUserId(@CurrentUser('id') userId: string) {
    return { userId };
  }

  // Получить email
  @Get('email')
  @Auth()
  getUserEmail(@CurrentUser('email') email: string) {
    return { email };
  }
}
```

### @Roles(roles)

Устанавливает требуемые роли для доступа к эндпоинту (используется внутри @Auth).

```typescript
import { Roles } from '../decorators';

// Прямое использование (не рекомендуется, используйте @Auth)
@Get('admin')
@Roles(UserRole.ADMIN)
@UseGuards(JwtGuard, RolesGuard)
getAdminData() {
  return 'Admin only';
}
```

### @AuthSwaggerDocs

Документация Swagger для auth эндпоинтов.

```typescript
import { AuthSwaggerDocs } from '../decorators';

@Controller('auth')
export class AuthController {
  @AuthSwaggerDocs.register()
  @Post('register')
  register(@Body() dto: RegisterDto) {
    // ...
  }

  @AuthSwaggerDocs.login()
  @Post('login')
  login(@Body() dto: LoginDto) {
    // ...
  }
}
```

## Импорт

```typescript
// Импорт всех декораторов
import { Auth, CurrentUser, AuthSwaggerDocs } from '../decorators';

// Или импорт по отдельности
import { Auth } from '../decorators/auth.decorator';
import { CurrentUser } from '../decorators/user.decorator';
```
