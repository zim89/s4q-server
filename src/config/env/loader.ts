import { EnvKeys } from './keys';

/**
 * Environment variables loader configuration
 *
 * Defines which environment variables to load and how to process them
 * Used by NestJS ConfigModule for loading environment variables
 *
 * @example
 * // Use in app.module.ts
 * ConfigModule.forRoot({
 *   load: [envLoader.load[0]],
 *   validate: (config) => envSchema.parse(config)
 * })
 */
export const envLoader = {
  load: [
    () => ({
      [EnvKeys.JWT_SECRET]: process.env[EnvKeys.JWT_SECRET],
      [EnvKeys.JWT_ACCESS_TOKEN_TTL]: process.env[EnvKeys.JWT_ACCESS_TOKEN_TTL],
      [EnvKeys.JWT_REFRESH_TOKEN_TTL]:
        process.env[EnvKeys.JWT_REFRESH_TOKEN_TTL],
      [EnvKeys.COOKIE_DOMAIN]: process.env[EnvKeys.COOKIE_DOMAIN],
      [EnvKeys.ALLOWED_ORIGINS]: process.env[EnvKeys.ALLOWED_ORIGINS],
      [EnvKeys.PORT]: process.env[EnvKeys.PORT],
      [EnvKeys.GLOBAL_PREFIX]: process.env[EnvKeys.GLOBAL_PREFIX],
      // Email Configuration
      [EnvKeys.SMTP_HOST]: process.env[EnvKeys.SMTP_HOST],
      [EnvKeys.SMTP_PORT]: process.env[EnvKeys.SMTP_PORT],
      [EnvKeys.SMTP_SECURE]: process.env[EnvKeys.SMTP_SECURE],
      [EnvKeys.SMTP_USER]: process.env[EnvKeys.SMTP_USER],
      [EnvKeys.SMTP_PASS]: process.env[EnvKeys.SMTP_PASS],
      [EnvKeys.EMAIL_FROM]: process.env[EnvKeys.EMAIL_FROM],
      [EnvKeys.EMAIL_REPLY_TO]: process.env[EnvKeys.EMAIL_REPLY_TO],
      [EnvKeys.EMAIL_TEMPLATE_DIR]: process.env[EnvKeys.EMAIL_TEMPLATE_DIR],
      // S3 Configuration
      [EnvKeys.AWS_REGION]: process.env[EnvKeys.AWS_REGION],
      [EnvKeys.AWS_ACCESS_KEY_ID]: process.env[EnvKeys.AWS_ACCESS_KEY_ID],
      [EnvKeys.AWS_SECRET_ACCESS_KEY]:
        process.env[EnvKeys.AWS_SECRET_ACCESS_KEY],
      [EnvKeys.S3_BUCKET_NAME]: process.env[EnvKeys.S3_BUCKET_NAME],
      [EnvKeys.S3_ENDPOINT]: process.env[EnvKeys.S3_ENDPOINT],
      [EnvKeys.S3_MAX_FILE_SIZE]: process.env[EnvKeys.S3_MAX_FILE_SIZE],
      [EnvKeys.S3_ALLOWED_MIME_TYPES]:
        process.env[EnvKeys.S3_ALLOWED_MIME_TYPES],
      // Stripe Configuration
      [EnvKeys.STRIPE_PUBLISHABLE_KEY]:
        process.env[EnvKeys.STRIPE_PUBLISHABLE_KEY],
      [EnvKeys.STRIPE_SECRET_KEY]: process.env[EnvKeys.STRIPE_SECRET_KEY],
      [EnvKeys.STRIPE_WEBHOOK_SECRET]:
        process.env[EnvKeys.STRIPE_WEBHOOK_SECRET],
      [EnvKeys.STRIPE_CURRENCY]: process.env[EnvKeys.STRIPE_CURRENCY],
      [EnvKeys.STRIPE_PAYMENT_METHODS]:
        process.env[EnvKeys.STRIPE_PAYMENT_METHODS],
      [EnvKeys.STRIPE_DEFAULT_TRIAL_DAYS]:
        process.env[EnvKeys.STRIPE_DEFAULT_TRIAL_DAYS],
      [EnvKeys.STRIPE_ENABLE_SUBSCRIPTIONS]:
        process.env[EnvKeys.STRIPE_ENABLE_SUBSCRIPTIONS],
      [EnvKeys.STRIPE_ENABLE_ONE_TIME_PAYMENTS]:
        process.env[EnvKeys.STRIPE_ENABLE_ONE_TIME_PAYMENTS],
      // Telegram Configuration
      [EnvKeys.TELEGRAM_BOT_TOKEN]: process.env[EnvKeys.TELEGRAM_BOT_TOKEN],
      [EnvKeys.TELEGRAM_BOT_USERNAME]:
        process.env[EnvKeys.TELEGRAM_BOT_USERNAME],
      [EnvKeys.TELEGRAM_WEBHOOK_URL]: process.env[EnvKeys.TELEGRAM_WEBHOOK_URL],
      [EnvKeys.TELEGRAM_WEBHOOK_SECRET]:
        process.env[EnvKeys.TELEGRAM_WEBHOOK_SECRET],
      [EnvKeys.TELEGRAM_ENABLE_WEBHOOK]:
        process.env[EnvKeys.TELEGRAM_ENABLE_WEBHOOK],
      [EnvKeys.TELEGRAM_ENABLE_POLLING]:
        process.env[EnvKeys.TELEGRAM_ENABLE_POLLING],
      [EnvKeys.TELEGRAM_DEFAULT_PARSE_MODE]:
        process.env[EnvKeys.TELEGRAM_DEFAULT_PARSE_MODE],
      [EnvKeys.TELEGRAM_ENABLE_NOTIFICATIONS]:
        process.env[EnvKeys.TELEGRAM_ENABLE_NOTIFICATIONS],
      [EnvKeys.TELEGRAM_ENABLE_COMMANDS]:
        process.env[EnvKeys.TELEGRAM_ENABLE_COMMANDS],
    }),
  ],
};
