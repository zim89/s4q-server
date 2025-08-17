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
      // Application Configuration
      [envKeys.NODE_ENV]: process.env[envKeys.NODE_ENV],
      [envKeys.PORT]: process.env[envKeys.PORT],
      [envKeys.GLOBAL_PREFIX]: process.env[envKeys.GLOBAL_PREFIX],

      // JWT Configuration
      [envKeys.JWT_SECRET]: process.env[envKeys.JWT_SECRET],
      [envKeys.JWT_ACCESS_TOKEN_TTL]: process.env[envKeys.JWT_ACCESS_TOKEN_TTL],
      [envKeys.JWT_REFRESH_TOKEN_TTL]:
        process.env[envKeys.JWT_REFRESH_TOKEN_TTL],
      [envKeys.COOKIE_DOMAIN]: process.env[envKeys.COOKIE_DOMAIN],
      [envKeys.ALLOWED_ORIGINS]: process.env[envKeys.ALLOWED_ORIGINS],

      // Database Configuration
      [envKeys.POSTGRES_URI]: process.env[envKeys.POSTGRES_URI],
      [envKeys.POSTGRES_SHADOW_URI]: process.env[envKeys.POSTGRES_SHADOW_URI],
      [envKeys.DB_POOL_MIN]: process.env[envKeys.DB_POOL_MIN],
      [envKeys.DB_POOL_MAX]: process.env[envKeys.DB_POOL_MAX],
      [envKeys.DB_IDLE_TIMEOUT]: process.env[envKeys.DB_IDLE_TIMEOUT],
      [envKeys.DB_CONNECTION_TIMEOUT]:
        process.env[envKeys.DB_CONNECTION_TIMEOUT],
      [envKeys.DB_LOGGING_ENABLED]: process.env[envKeys.DB_LOGGING_ENABLED],
      [envKeys.DB_SLOW_QUERY_THRESHOLD]:
        process.env[envKeys.DB_SLOW_QUERY_THRESHOLD],
      [envKeys.DB_SEED_ENABLED]: process.env[envKeys.DB_SEED_ENABLED],

      // Database Monitoring Configuration
      [envKeys.DB_METRICS_ENABLED]: process.env[envKeys.DB_METRICS_ENABLED],
      [envKeys.DB_METRICS_INTERVAL]: process.env[envKeys.DB_METRICS_INTERVAL],
      [envKeys.DB_ALERT_SLOW_QUERY]: process.env[envKeys.DB_ALERT_SLOW_QUERY],
      [envKeys.DB_ALERT_CONNECTION_ERRORS]:
        process.env[envKeys.DB_ALERT_CONNECTION_ERRORS],
      [envKeys.DB_LOG_QUERIES]: process.env[envKeys.DB_LOG_QUERIES],
      [envKeys.DB_LOG_PARAMETERS]: process.env[envKeys.DB_LOG_PARAMETERS],
      [envKeys.DB_LOG_QUERY_TIME]: process.env[envKeys.DB_LOG_QUERY_TIME],

      // Integrations Configuration
      [envKeys.FREE_DICTIONARY_API_URL]:
        process.env[envKeys.FREE_DICTIONARY_API_URL],
      [envKeys.FREE_DICTIONARY_API_TIMEOUT]:
        process.env[envKeys.FREE_DICTIONARY_API_TIMEOUT],
      [envKeys.FREE_DICTIONARY_API_RETRIES]:
        process.env[envKeys.FREE_DICTIONARY_API_RETRIES],
    }),
  ],
};
