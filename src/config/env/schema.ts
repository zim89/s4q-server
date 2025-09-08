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
 * const validatedConfig = envSchema.parse(config);
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
  // Конфигурация интеграций
  [envKeys.FREE_DICTIONARY_API_URL]: z
    .string()
    .default('https://api.dictionaryapi.dev/api/v2/entries/en'),
  [envKeys.FREE_DICTIONARY_API_TIMEOUT]: z.coerce.number().default(5000),
  [envKeys.FREE_DICTIONARY_API_RETRIES]: z.coerce.number().default(3),
  // Конфигурация словарей
  [envKeys.DICTIONARY_PROVIDER]: z.string().default('free-dictionary'),
  [envKeys.MERRIAM_API_KEY]: z.string().optional(),
  [envKeys.MERRIAM_API_URL]: z.string().optional(),
});

export type EnvSchema = z.infer<typeof envSchema>;
