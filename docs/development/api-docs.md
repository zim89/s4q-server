# 📚 API Documentation

## 🎯 Обзор

Space4Quizlet Server использует Swagger/OpenAPI для автоматической генерации API документации.

## 🔗 Доступ к документации

### Development

- **URL**: http://localhost:3001/api-docs
- **JSON**: http://localhost:3001/api-docs/swagger.json
- **YAML**: http://localhost:3001/api-docs/swagger.yaml

### Production

- **URL**: https://yourdomain.com/api-docs
- **JSON**: https://yourdomain.com/api-docs/swagger.json
- **YAML**: https://yourdomain.com/api-docs/swagger.yaml

## 🔧 Конфигурация

### Swagger настройки

```typescript
// src/config/swagger.config.ts
export function setupSwaggerDocs(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('Space4Quiz API')
    .setDescription('API documentation for Space4Quiz')
    .setVersion('1.0.0')
    .setContact('zim89', 'https://github.com/zim89', 'zi89.dev@gmail.com')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
    jsonDocumentUrl: '/api-docs/swagger.json',
    yamlDocumentUrl: '/api-docs/swagger.yaml',
  });
}
```

### Использование в main.ts

```typescript
// src/main.ts
import { setupSwaggerDocs } from './config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Настройка Swagger документации
  setupSwaggerDocs(app);

  await app.listen(3001);
}
```

## 📝 Документирование API

### Контроллеры

```typescript
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class UserController {
  @ApiOperation({ summary: 'Get user by ID' })
  @ApiResponse({ status: 200, description: 'User found' })
  @ApiResponse({ status: 404, description: 'User not found' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }
}
```

### DTO классы

```typescript
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    description: 'User email address',
    example: 'user@example.com',
  })
  email: string;

  @ApiProperty({
    description: 'User password',
    minLength: 8,
    example: 'password123',
  })
  password: string;
}
```

### Модели

```typescript
import { ApiProperty } from '@nestjs/swagger';

export class User {
  @ApiProperty({ description: 'User unique identifier' })
  id: string;

  @ApiProperty({ description: 'User email address' })
  email: string;

  @ApiProperty({ description: 'User creation date' })
  createdAt: Date;
}
```

## 🔐 Аутентификация

### Bearer Token

```typescript
@ApiBearerAuth()
@Controller('protected')
export class ProtectedController {
  @Get()
  getProtectedData() {
    return { message: 'This is protected data' };
  }
}
```

### JWT Token

```typescript
@ApiSecurity('jwt')
@Controller('auth')
export class AuthController {
  @Post('login')
  @ApiResponse({
    status: 200,
    description: 'Login successful',
    schema: {
      type: 'object',
      properties: {
        accessToken: { type: 'string' },
        refreshToken: { type: 'string' },
      },
    },
  })
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
}
```

## 🎨 Кастомизация

### Темы и стили

```typescript
SwaggerModule.setup('api-docs', app, document, {
  customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle: 'Space4Quiz API Documentation',
  swaggerOptions: {
    persistAuthorization: true,
    docExpansion: 'list',
    filter: true,
    showRequestDuration: true,
  },
});
```

### Группировка API

```typescript
@ApiTags('Authentication')
@Controller('auth')
export class AuthController {}

@ApiTags('Users')
@Controller('users')
export class UserController {}

@ApiTags('Sets')
@Controller('sets')
export class SetController {}
```

## 🚀 Использование

### 1. Запуск сервера

```bash
bun run dev
```

### 2. Открытие документации

Откройте браузер и перейдите по адресу: http://localhost:3001/api-docs

### 3. Тестирование API

- Используйте встроенный Swagger UI для тестирования
- Авторизуйтесь через "Authorize" кнопку
- Выполняйте запросы прямо из браузера

## 📚 Дополнительные ресурсы

- [NestJS Swagger](https://docs.nestjs.com/openapi/introduction)
- [Swagger UI](https://swagger.io/tools/swagger-ui/)
- [OpenAPI Specification](https://swagger.io/specification/)
