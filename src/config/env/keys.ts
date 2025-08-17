/**
 * Ключи переменных окружения
 *
 * Централизованные константы для имен переменных окружения
 * Используются во всем приложении для типобезопасного доступа к env переменным
 *
 * @example
 * // Использование в config service
 * const jwtSecret = configService.getOrThrow<string>(envKeys.JWT_SECRET);
 */
export const envKeys = {
  JWT_SECRET: 'JWT_SECRET',
  JWT_ACCESS_TOKEN_TTL: 'JWT_ACCESS_TOKEN_TTL',
  JWT_REFRESH_TOKEN_TTL: 'JWT_REFRESH_TOKEN_TTL',
  COOKIE_DOMAIN: 'COOKIE_DOMAIN',
  ALLOWED_ORIGINS: 'ALLOWED_ORIGINS',
  NODE_ENV: 'NODE_ENV',
  PORT: 'PORT',
  GLOBAL_PREFIX: 'GLOBAL_PREFIX',

  // Конфигурация базы данных
  POSTGRES_URI: 'POSTGRES_URI',
  POSTGRES_SHADOW_URI: 'POSTGRES_SHADOW_URI',
  DB_POOL_MIN: 'DB_POOL_MIN',
  DB_POOL_MAX: 'DB_POOL_MAX',
  DB_IDLE_TIMEOUT: 'DB_IDLE_TIMEOUT',
  DB_CONNECTION_TIMEOUT: 'DB_CONNECTION_TIMEOUT',
  DB_LOGGING_ENABLED: 'DB_LOGGING_ENABLED',
  DB_SLOW_QUERY_THRESHOLD: 'DB_SLOW_QUERY_THRESHOLD',
  DB_SEED_ENABLED: 'DB_SEED_ENABLED',
  // Конфигурация мониторинга базы данных
  DB_METRICS_ENABLED: 'DB_METRICS_ENABLED',
  DB_METRICS_INTERVAL: 'DB_METRICS_INTERVAL',
  DB_ALERT_SLOW_QUERY: 'DB_ALERT_SLOW_QUERY',
  DB_ALERT_CONNECTION_ERRORS: 'DB_ALERT_CONNECTION_ERRORS',
  DB_LOG_QUERIES: 'DB_LOG_QUERIES',
  DB_LOG_PARAMETERS: 'DB_LOG_PARAMETERS',
  DB_LOG_QUERY_TIME: 'DB_LOG_QUERY_TIME',
  // Конфигурация интеграций
  FREE_DICTIONARY_API_URL: 'FREE_DICTIONARY_API_URL',
  FREE_DICTIONARY_API_TIMEOUT: 'FREE_DICTIONARY_API_TIMEOUT',
  FREE_DICTIONARY_API_RETRIES: 'FREE_DICTIONARY_API_RETRIES',
} as const;

/**
 * Тип для ключей переменных окружения
 */
export type EnvKey = (typeof envKeys)[keyof typeof envKeys];
