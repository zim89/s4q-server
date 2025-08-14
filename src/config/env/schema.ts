import { z } from 'zod';
import { EnvKeys } from './keys';

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
  [EnvKeys.JWT_SECRET]: z.string().nonempty('JWT_SECRET is required'),
  [EnvKeys.JWT_ACCESS_TOKEN_TTL]: z.string().default('1h'),
  [EnvKeys.JWT_REFRESH_TOKEN_TTL]: z.string().default('7d'),
  [EnvKeys.COOKIE_DOMAIN]: z.string().nonempty('COOKIE_DOMAIN is required'),
  [EnvKeys.ALLOWED_ORIGINS]: z
    .string()
    .optional()
    .transform(val => (val ? val.split(',').map(url => url.trim()) : []))
    .pipe(z.array(z.string())),
  [EnvKeys.NODE_ENV]: z
    .enum(['development', 'production', 'test'])
    .default('development'),
  [EnvKeys.PORT]: z.coerce.number().default(3000),
  [EnvKeys.GLOBAL_PREFIX]: z.string().default('api'),
  // Email Configuration
  [EnvKeys.SMTP_HOST]: z.string().default('smtp.gmail.com'),
  [EnvKeys.SMTP_PORT]: z.coerce.number().default(587),
  [EnvKeys.SMTP_SECURE]: z.coerce.boolean().default(false),
  [EnvKeys.SMTP_USER]: z.string().optional(),
  [EnvKeys.SMTP_PASS]: z.string().optional(),
  [EnvKeys.EMAIL_FROM]: z.string().default('noreply@space4quiz.com'),
  [EnvKeys.EMAIL_REPLY_TO]: z.string().optional(),
  [EnvKeys.EMAIL_TEMPLATE_DIR]: z.string().default('./templates/emails'),
  // S3 Configuration
  [EnvKeys.AWS_REGION]: z.string().default('us-east-1'),
  [EnvKeys.AWS_ACCESS_KEY_ID]: z.string().optional(),
  [EnvKeys.AWS_SECRET_ACCESS_KEY]: z.string().optional(),
  [EnvKeys.S3_BUCKET_NAME]: z.string().optional(),
  [EnvKeys.S3_ENDPOINT]: z.string().optional(),
  [EnvKeys.S3_MAX_FILE_SIZE]: z.coerce.number().default(10 * 1024 * 1024),
  [EnvKeys.S3_ALLOWED_MIME_TYPES]: z
    .string()
    .optional()
    .transform(val =>
      val
        ? val.split(',').map(type => type.trim())
        : ['image/jpeg', 'image/png', 'image/gif', 'application/pdf']
    )
    .pipe(z.array(z.string())),
  // Stripe Configuration
  [EnvKeys.STRIPE_PUBLISHABLE_KEY]: z.string().optional(),
  [EnvKeys.STRIPE_SECRET_KEY]: z.string().optional(),
  [EnvKeys.STRIPE_WEBHOOK_SECRET]: z.string().optional(),
  [EnvKeys.STRIPE_CURRENCY]: z.string().default('usd'),
  [EnvKeys.STRIPE_PAYMENT_METHODS]: z
    .string()
    .optional()
    .transform(val =>
      val ? val.split(',').map(method => method.trim()) : ['card', 'sepa_debit']
    )
    .pipe(z.array(z.string())),
  [EnvKeys.STRIPE_DEFAULT_TRIAL_DAYS]: z.coerce.number().default(7),
  [EnvKeys.STRIPE_ENABLE_SUBSCRIPTIONS]: z.coerce.boolean().default(true),
  [EnvKeys.STRIPE_ENABLE_ONE_TIME_PAYMENTS]: z.coerce.boolean().default(true),
  // Telegram Configuration
  [EnvKeys.TELEGRAM_BOT_TOKEN]: z.string().optional(),
  [EnvKeys.TELEGRAM_BOT_USERNAME]: z.string().optional(),
  [EnvKeys.TELEGRAM_WEBHOOK_URL]: z.string().optional(),
  [EnvKeys.TELEGRAM_WEBHOOK_SECRET]: z.string().optional(),
  [EnvKeys.TELEGRAM_ENABLE_WEBHOOK]: z.coerce.boolean().default(true),
  [EnvKeys.TELEGRAM_ENABLE_POLLING]: z.coerce.boolean().default(false),
  [EnvKeys.TELEGRAM_DEFAULT_PARSE_MODE]: z
    .enum(['HTML', 'Markdown', 'MarkdownV2'])
    .default('HTML'),
  [EnvKeys.TELEGRAM_ENABLE_NOTIFICATIONS]: z.coerce.boolean().default(true),
  [EnvKeys.TELEGRAM_ENABLE_COMMANDS]: z.coerce.boolean().default(true),
  // Database Configuration
  [EnvKeys.POSTGRES_URI]: z.string().nonempty('POSTGRES_URI is required'),
  [EnvKeys.POSTGRES_SHADOW_URI]: z.string().optional(),
  [EnvKeys.DB_POOL_MIN]: z.coerce.number().default(2),
  [EnvKeys.DB_POOL_MAX]: z.coerce.number().default(10),
  [EnvKeys.DB_IDLE_TIMEOUT]: z.coerce.number().default(30000),
  [EnvKeys.DB_CONNECTION_TIMEOUT]: z.coerce.number().default(2000),
  [EnvKeys.DB_LOGGING_ENABLED]: z.coerce.boolean().default(true),
  [EnvKeys.DB_SLOW_QUERY_THRESHOLD]: z.coerce.number().default(1000),
  [EnvKeys.DB_SEED_ENABLED]: z.coerce.boolean().default(false),
  // Database Monitoring Configuration
  [EnvKeys.DB_METRICS_ENABLED]: z.coerce.boolean().default(false),
  [EnvKeys.DB_METRICS_INTERVAL]: z.coerce.number().default(60),
  [EnvKeys.DB_ALERT_SLOW_QUERY]: z.coerce.number().default(5000),
  [EnvKeys.DB_ALERT_CONNECTION_ERRORS]: z.coerce.number().default(10),
  [EnvKeys.DB_LOG_QUERIES]: z.coerce.boolean().default(false),
  [EnvKeys.DB_LOG_PARAMETERS]: z.coerce.boolean().default(false),
  [EnvKeys.DB_LOG_QUERY_TIME]: z.coerce.boolean().default(true),
});

export type EnvSchema = z.infer<typeof envSchema>;
