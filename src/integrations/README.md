# Integrations

Интеграционные компоненты для внешних сервисов.

## 📁 Структура

```
src/integrations/
├── email/           # Email интеграция (SMTP, SendGrid, etc.)
│   ├── email.service.ts
│   ├── email.module.ts
│   ├── email.config.ts
│   └── index.ts
├── s3/              # AWS S3 интеграция
│   ├── s3.service.ts
│   ├── s3.module.ts
│   ├── s3.config.ts
│   └── index.ts
├── stripe/          # Stripe платежи
│   ├── stripe.service.ts
│   ├── stripe.module.ts
│   ├── stripe.config.ts
│   └── index.ts
├── telegram/        # Telegram Bot
│   ├── telegram.service.ts
│   ├── telegram.module.ts
│   ├── telegram.config.ts
│   └── index.ts
└── README.md        # Документация
```

## 🔧 Компоненты

### email/

**Назначение**: Отправка email сообщений

**Функциональность:**

- Отправка транзакционных email
- Email шаблоны
- Верификация email
- Сброс пароля
- Подписки на рассылку

**Использование:**

```typescript
import { EmailService } from 'src/integrations/email';

// В сервисе
constructor(private emailService: EmailService) {}

// Отправка welcome email
await this.emailService.sendWelcomeEmail(user.email, user.firstName);
```

### s3/

**Назначение**: Хранение файлов в AWS S3

**Функциональность:**

- Загрузка файлов в S3
- Скачивание файлов из S3
- Удаление файлов из S3
- Генерация presigned URL
- Управление метаданными

**Использование:**

```typescript
import { S3Service } from 'src/integrations/s3';

// В сервисе
constructor(private s3Service: S3Service) {}

// Загрузка файла
const url = await this.s3Service.uploadFile(file, 'avatars/user-123.jpg');
```

### stripe/

**Назначение**: Обработка платежей через Stripe

**Функциональность:**

- Обработка платежей
- Управление подписками
- Управление клиентами
- Обработка webhook'ов
- Создание payment intent'ов

**Использование:**

```typescript
import { StripeService } from 'src/integrations/stripe';

// В сервисе
constructor(private stripeService: StripeService) {}

// Создание payment intent
const paymentIntent = await this.stripeService.createPaymentIntent(amount, 'usd');
```

### telegram/

**Назначение**: Telegram Bot интеграция

**Функциональность:**

- Отправка сообщений пользователям
- Обработка команд бота
- Управление webhook'ами
- Уведомления пользователей
- Управление чатами

**Использование:**

```typescript
import { TelegramService } from 'src/integrations/telegram';

// В сервисе
constructor(private telegramService: TelegramService) {}

// Отправка сообщения
await this.telegramService.sendMessage(chatId, 'Hello from Space4Quiz!');
```

## 📋 Примеры использования

### Настройка интеграций в app.module.ts

```typescript
// app.module.ts
import { EmailModule } from 'src/integrations/email';
import { S3Module } from 'src/integrations/s3';
import { StripeModule } from 'src/integrations/stripe';
import { TelegramModule } from 'src/integrations/telegram';

@Module({
  imports: [
    EmailModule,
    S3Module,
    StripeModule,
    TelegramModule,
    // другие модули
  ],
})
export class AppModule {}
```

### Использование в сервисах

```typescript
// user.service.ts
import { EmailService } from 'src/integrations/email';
import { S3Service } from 'src/integrations/s3';

@Injectable()
export class UserService {
  constructor(
    private emailService: EmailService,
    private s3Service: S3Service
  ) {}

  async registerUser(userData: CreateUserDto) {
    // Создание пользователя
    const user = await this.createUser(userData);

    // Отправка welcome email
    await this.emailService.sendWelcomeEmail(user.email, user.firstName);

    // Загрузка аватара в S3
    if (userData.avatar) {
      const avatarUrl = await this.s3Service.uploadFile(
        userData.avatar,
        `avatars/${user.id}.jpg`
      );
      await this.updateUserAvatar(user.id, avatarUrl);
    }

    return user;
  }
}
```

### Обработка платежей

```typescript
// payment.service.ts
import { StripeService } from 'src/integrations/stripe';
import { EmailService } from 'src/integrations/email';

@Injectable()
export class PaymentService {
  constructor(
    private stripeService: StripeService,
    private emailService: EmailService
  ) {}

  async processPayment(userId: string, amount: number) {
    // Создание payment intent
    const paymentIntent = await this.stripeService.createPaymentIntent(
      amount,
      'usd'
    );

    // Отправка email с подтверждением
    await this.emailService.sendEmail(
      user.email,
      'Payment Confirmation',
      'payment-confirmation',
      { amount, paymentId: paymentIntent.id }
    );

    return paymentIntent;
  }

  async handlePaymentSuccess(paymentIntent: any) {
    // Обработка успешного платежа
    await this.updateUserSubscription(
      paymentIntent.customer,
      paymentIntent.amount
    );

    // Отправка уведомления
    await this.emailService.sendEmail(
      user.email,
      'Payment Successful',
      'payment-success',
      { amount: paymentIntent.amount }
    );
  }
}
```

### Telegram Bot интеграция

```typescript
// notification.service.ts
import { TelegramService } from 'src/integrations/telegram';
import { EmailService } from 'src/integrations/email';

@Injectable()
export class NotificationService {
  constructor(
    private telegramService: TelegramService,
    private emailService: EmailService
  ) {}

  async sendQuizNotification(userId: string, quizId: string) {
    const user = await this.getUser(userId);

    // Отправка уведомления в Telegram
    if (user.telegramChatId) {
      await this.telegramService.sendNotification(
        user.telegramChatId,
        '🎉 New quiz available! Check it out now!'
      );
    }

    // Отправка email уведомления
    await this.emailService.sendEmail(
      user.email,
      'New Quiz Available',
      'new-quiz-notification',
      { quizId, quizTitle: quiz.title }
    );
  }
}
```

## 📝 Принципы

### Названия файлов

- ✅ **Понятные названия** - `email.service.ts`, `stripe.service.ts`
- ✅ **Консистентность** - единый стиль именования
- ✅ **Описательность** - название отражает назначение

### Названия классов

- ✅ **Суффикс Service** - для сервисов
- ✅ **Суффикс Module** - для модулей
- ✅ **Суффикс Config** - для конфигураций
- ✅ **Понятные названия** - описывают функциональность

### Архитектура

- ✅ **Разделение ответственности** - каждый компонент отвечает за свою интеграцию
- ✅ **Конфигурируемость** - настройка через environment variables
- ✅ **Обработка ошибок** - graceful handling of external service failures

## 🚀 Добавление новых интеграций

### 1. Создайте папку для интеграции

```bash
mkdir src/integrations/new-integration
```

### 2. Создайте базовые файлы

```typescript
// src/integrations/new-integration/new-integration.service.ts
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class NewIntegrationService {
  constructor(private readonly configService: ConfigService) {}

  async someMethod(): Promise<void> {
    // Реализация
  }
}
```

```typescript
// src/integrations/new-integration/new-integration.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { NewIntegrationService } from './new-integration.service';

@Module({
  imports: [ConfigModule],
  providers: [NewIntegrationService],
  exports: [NewIntegrationService],
})
export class NewIntegrationModule {}
```

```typescript
// src/integrations/new-integration/new-integration.config.ts
import { ConfigService } from '@nestjs/config';
import type { EnvSchema } from 'src/config/env/schema';

export function getNewIntegrationConfig(
  configService: ConfigService<EnvSchema>
) {
  return {
    // Конфигурация
  };
}
```

### 3. Создайте индексный файл

```typescript
// src/integrations/new-integration/index.ts
export { NewIntegrationService } from './new-integration.service';
export { NewIntegrationModule } from './new-integration.module';
export { getNewIntegrationConfig } from './new-integration.config';
```

### 4. Используйте в приложении

```typescript
// app.module.ts
import { NewIntegrationModule } from 'src/integrations/new-integration';

@Module({
  imports: [NewIntegrationModule],
})
export class AppModule {}
```

## ⚠️ Важные моменты

### Безопасность

- Никогда не коммитьте API ключи в репозиторий
- Используйте environment variables для конфиденциальных данных
- Валидируйте все входные данные от внешних сервисов
- Используйте HTTPS для всех внешних запросов

### Производительность

- Используйте кэширование для часто запрашиваемых данных
- Реализуйте retry логику для внешних API
- Мониторьте время ответа внешних сервисов
- Используйте connection pooling где возможно

### Надежность

- Обрабатывайте ошибки внешних сервисов
- Реализуйте fallback механизмы
- Логируйте все взаимодействия с внешними сервисами
- Используйте circuit breaker паттерн для критичных интеграций

## 🔧 Environment Variables

### Email Configuration

```env
# SMTP Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

# Email Configuration
EMAIL_FROM=noreply@space4quiz.com
EMAIL_REPLY_TO=support@space4quiz.com
EMAIL_TEMPLATE_DIR=./templates/emails
```

### S3 Configuration

```env
# AWS Configuration
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key

# S3 Configuration
S3_BUCKET_NAME=space4quiz-files
S3_ENDPOINT=https://s3.amazonaws.com
S3_MAX_FILE_SIZE=10485760
S3_ALLOWED_MIME_TYPES=image/jpeg,image/png,image/gif,application/pdf
```

### Stripe Configuration

```env
# Stripe API Keys
STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Stripe Configuration
STRIPE_CURRENCY=usd
STRIPE_PAYMENT_METHODS=card,sepa_debit
STRIPE_DEFAULT_TRIAL_DAYS=7
STRIPE_ENABLE_SUBSCRIPTIONS=true
STRIPE_ENABLE_ONE_TIME_PAYMENTS=true
```

### Telegram Configuration

```env
# Telegram Bot Configuration
TELEGRAM_BOT_TOKEN=1234567890:ABCdefGHIjklMNOpqrsTUVwxyz
TELEGRAM_BOT_USERNAME=space4quiz_bot

# Webhook Configuration
TELEGRAM_WEBHOOK_URL=https://yourdomain.com/webhook/telegram
TELEGRAM_WEBHOOK_SECRET=your-webhook-secret

# Bot Settings
TELEGRAM_ENABLE_WEBHOOK=true
TELEGRAM_ENABLE_POLLING=false
TELEGRAM_DEFAULT_PARSE_MODE=HTML
TELEGRAM_ENABLE_NOTIFICATIONS=true
TELEGRAM_ENABLE_COMMANDS=true
```
