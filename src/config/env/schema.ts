import { z } from 'zod';
import { envKeys } from './keys';

/**
 * Environment variables validation schema
 *
 * Defines validation rules for all environment variables
 * Uses Zod for runtime validation and type inference
 *
 * @example
 * // Validate environment variables
 * const validatedConfig = envSchema.parse(process.env);
 *
 * @example
 * // Use in ConfigModule
 * ConfigModule.forRoot({
 *   validate: (config) => envSchema.parse(config)
 * })
 */
export const envSchema = z.object({
  [envKeys.JWT_SECRET]: z.string().nonempty('JWT_SECRET is required'),
  [envKeys.JWT_ACCESS_TOKEN_TTL]: z.string().default('1h'),
  [envKeys.JWT_REFRESH_TOKEN_TTL]: z.string().default('7d'),
  [envKeys.COOKIE_DOMAIN]: z.string().nonempty('COOKIE_DOMAIN is required'),
  [envKeys.ALLOWED_ORIGINS]: z
    .string()
    .optional()
    .transform(val => (val ? val.split(',').map(url => url.trim()) : []))
    .pipe(z.array(z.string())),
  [envKeys.NODE_ENV]: z
    .enum(['development', 'production', 'test'])
    .default('development'),
  [envKeys.PORT]: z.coerce.number().default(3000),
  [envKeys.GLOBAL_PREFIX]: z.string().default('api'),
  // Email Configuration
  [envKeys.SMTP_HOST]: z.string().default('smtp.gmail.com'),
  [envKeys.SMTP_PORT]: z.coerce.number().default(587),
  [envKeys.SMTP_SECURE]: z.coerce.boolean().default(false),
  [envKeys.SMTP_USER]: z.string().optional(),
  [envKeys.SMTP_PASS]: z.string().optional(),
  [envKeys.EMAIL_FROM]: z.string().default('noreply@space4quiz.com'),
  [envKeys.EMAIL_REPLY_TO]: z.string().optional(),
  [envKeys.EMAIL_TEMPLATE_DIR]: z.string().default('./templates/emails'),
  // S3 Configuration
  [envKeys.AWS_REGION]: z.string().default('us-east-1'),
  [envKeys.AWS_ACCESS_KEY_ID]: z.string().optional(),
  [envKeys.AWS_SECRET_ACCESS_KEY]: z.string().optional(),
  [envKeys.S3_BUCKET_NAME]: z.string().optional(),
  [envKeys.S3_ENDPOINT]: z.string().optional(),
  [envKeys.S3_MAX_FILE_SIZE]: z.coerce.number().default(10 * 1024 * 1024),
  [envKeys.S3_ALLOWED_MIME_TYPES]: z
    .string()
    .optional()
    .transform(val =>
      val
        ? val.split(',').map(type => type.trim())
        : ['image/jpeg', 'image/png', 'image/gif', 'application/pdf']
    )
    .pipe(z.array(z.string())),
  // Stripe Configuration
  [envKeys.STRIPE_PUBLISHABLE_KEY]: z.string().optional(),
  [envKeys.STRIPE_SECRET_KEY]: z.string().optional(),
  [envKeys.STRIPE_WEBHOOK_SECRET]: z.string().optional(),
  [envKeys.STRIPE_CURRENCY]: z.string().default('usd'),
  [envKeys.STRIPE_PAYMENT_METHODS]: z
    .string()
    .optional()
    .transform(val =>
      val ? val.split(',').map(method => method.trim()) : ['card', 'sepa_debit']
    )
    .pipe(z.array(z.string())),
  [envKeys.STRIPE_DEFAULT_TRIAL_DAYS]: z.coerce.number().default(7),
  [envKeys.STRIPE_ENABLE_SUBSCRIPTIONS]: z.coerce.boolean().default(true),
  [envKeys.STRIPE_ENABLE_ONE_TIME_PAYMENTS]: z.coerce.boolean().default(true),
  // Telegram Configuration
  [envKeys.TELEGRAM_BOT_TOKEN]: z.string().optional(),
  [envKeys.TELEGRAM_BOT_USERNAME]: z.string().optional(),
  [envKeys.TELEGRAM_WEBHOOK_URL]: z.string().optional(),
  [envKeys.TELEGRAM_WEBHOOK_SECRET]: z.string().optional(),
  [envKeys.TELEGRAM_ENABLE_WEBHOOK]: z.coerce.boolean().default(true),
  [envKeys.TELEGRAM_ENABLE_POLLING]: z.coerce.boolean().default(false),
  [envKeys.TELEGRAM_DEFAULT_PARSE_MODE]: z
    .enum(['HTML', 'Markdown', 'MarkdownV2'])
    .default('HTML'),
  [envKeys.TELEGRAM_ENABLE_NOTIFICATIONS]: z.coerce.boolean().default(true),
  [envKeys.TELEGRAM_ENABLE_COMMANDS]: z.coerce.boolean().default(true),
  // Database Configuration
  [envKeys.POSTGRES_URI]: z.string().nonempty('POSTGRES_URI is required'),
  [envKeys.POSTGRES_SHADOW_URI]: z.string().optional(),
  [envKeys.DB_POOL_MIN]: z.coerce.number().default(2),
  [envKeys.DB_POOL_MAX]: z.coerce.number().default(10),
  [envKeys.DB_IDLE_TIMEOUT]: z.coerce.number().default(30000),
  [envKeys.DB_CONNECTION_TIMEOUT]: z.coerce.number().default(2000),
  [envKeys.DB_LOGGING_ENABLED]: z.coerce.boolean().default(true),
  [envKeys.DB_SLOW_QUERY_THRESHOLD]: z.coerce.number().default(1000),
  [envKeys.DB_SEED_ENABLED]: z.coerce.boolean().default(false),
  // Database Monitoring Configuration
  [envKeys.DB_METRICS_ENABLED]: z.coerce.boolean().default(false),
  [envKeys.DB_METRICS_INTERVAL]: z.coerce.number().default(60),
  [envKeys.DB_ALERT_SLOW_QUERY]: z.coerce.number().default(5000),
  [envKeys.DB_ALERT_CONNECTION_ERRORS]: z.coerce.number().default(10),
  [envKeys.DB_LOG_QUERIES]: z.coerce.boolean().default(false),
  [envKeys.DB_LOG_PARAMETERS]: z.coerce.boolean().default(false),
  [envKeys.DB_LOG_QUERY_TIME]: z.coerce.boolean().default(true),
});

export type EnvSchema = z.infer<typeof envSchema>;
