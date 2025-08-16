import { envKeys } from './keys';

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
      [envKeys.JWT_SECRET]: process.env[envKeys.JWT_SECRET],
      [envKeys.JWT_ACCESS_TOKEN_TTL]: process.env[envKeys.JWT_ACCESS_TOKEN_TTL],
      [envKeys.JWT_REFRESH_TOKEN_TTL]:
        process.env[envKeys.JWT_REFRESH_TOKEN_TTL],
      [envKeys.COOKIE_DOMAIN]: process.env[envKeys.COOKIE_DOMAIN],
      [envKeys.ALLOWED_ORIGINS]: process.env[envKeys.ALLOWED_ORIGINS],
      [envKeys.PORT]: process.env[envKeys.PORT],
      [envKeys.GLOBAL_PREFIX]: process.env[envKeys.GLOBAL_PREFIX],
      // Email Configuration
      [envKeys.SMTP_HOST]: process.env[envKeys.SMTP_HOST],
      [envKeys.SMTP_PORT]: process.env[envKeys.SMTP_PORT],
      [envKeys.SMTP_SECURE]: process.env[envKeys.SMTP_SECURE],
      [envKeys.SMTP_USER]: process.env[envKeys.SMTP_USER],
      [envKeys.SMTP_PASS]: process.env[envKeys.SMTP_PASS],
      [envKeys.EMAIL_FROM]: process.env[envKeys.EMAIL_FROM],
      [envKeys.EMAIL_REPLY_TO]: process.env[envKeys.EMAIL_REPLY_TO],
      [envKeys.EMAIL_TEMPLATE_DIR]: process.env[envKeys.EMAIL_TEMPLATE_DIR],
      // S3 Configuration
      [envKeys.AWS_REGION]: process.env[envKeys.AWS_REGION],
      [envKeys.AWS_ACCESS_KEY_ID]: process.env[envKeys.AWS_ACCESS_KEY_ID],
      [envKeys.AWS_SECRET_ACCESS_KEY]:
        process.env[envKeys.AWS_SECRET_ACCESS_KEY],
      [envKeys.S3_BUCKET_NAME]: process.env[envKeys.S3_BUCKET_NAME],
      [envKeys.S3_ENDPOINT]: process.env[envKeys.S3_ENDPOINT],
      [envKeys.S3_MAX_FILE_SIZE]: process.env[envKeys.S3_MAX_FILE_SIZE],
      [envKeys.S3_ALLOWED_MIME_TYPES]:
        process.env[envKeys.S3_ALLOWED_MIME_TYPES],
      // Stripe Configuration
      [envKeys.STRIPE_PUBLISHABLE_KEY]:
        process.env[envKeys.STRIPE_PUBLISHABLE_KEY],
      [envKeys.STRIPE_SECRET_KEY]: process.env[envKeys.STRIPE_SECRET_KEY],
      [envKeys.STRIPE_WEBHOOK_SECRET]:
        process.env[envKeys.STRIPE_WEBHOOK_SECRET],
      [envKeys.STRIPE_CURRENCY]: process.env[envKeys.STRIPE_CURRENCY],
      [envKeys.STRIPE_PAYMENT_METHODS]:
        process.env[envKeys.STRIPE_PAYMENT_METHODS],
      [envKeys.STRIPE_DEFAULT_TRIAL_DAYS]:
        process.env[envKeys.STRIPE_DEFAULT_TRIAL_DAYS],
      [envKeys.STRIPE_ENABLE_SUBSCRIPTIONS]:
        process.env[envKeys.STRIPE_ENABLE_SUBSCRIPTIONS],
      [envKeys.STRIPE_ENABLE_ONE_TIME_PAYMENTS]:
        process.env[envKeys.STRIPE_ENABLE_ONE_TIME_PAYMENTS],
      // Telegram Configuration
      [envKeys.TELEGRAM_BOT_TOKEN]: process.env[envKeys.TELEGRAM_BOT_TOKEN],
      [envKeys.TELEGRAM_BOT_USERNAME]:
        process.env[envKeys.TELEGRAM_BOT_USERNAME],
      [envKeys.TELEGRAM_WEBHOOK_URL]: process.env[envKeys.TELEGRAM_WEBHOOK_URL],
      [envKeys.TELEGRAM_WEBHOOK_SECRET]:
        process.env[envKeys.TELEGRAM_WEBHOOK_SECRET],
      [envKeys.TELEGRAM_ENABLE_WEBHOOK]:
        process.env[envKeys.TELEGRAM_ENABLE_WEBHOOK],
      [envKeys.TELEGRAM_ENABLE_POLLING]:
        process.env[envKeys.TELEGRAM_ENABLE_POLLING],
      [envKeys.TELEGRAM_DEFAULT_PARSE_MODE]:
        process.env[envKeys.TELEGRAM_DEFAULT_PARSE_MODE],
      [envKeys.TELEGRAM_ENABLE_NOTIFICATIONS]:
        process.env[envKeys.TELEGRAM_ENABLE_NOTIFICATIONS],
      [envKeys.TELEGRAM_ENABLE_COMMANDS]:
        process.env[envKeys.TELEGRAM_ENABLE_COMMANDS],
    }),
  ],
};
