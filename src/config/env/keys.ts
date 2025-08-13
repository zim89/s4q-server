/**
 * Environment variable keys
 *
 * Centralized constants for environment variable names
 * Used throughout the application for type-safe access to env vars
 *
 * @example
 * // Use in config service
 * const jwtSecret = configService.getOrThrow<string>(EnvKeys.JWT_SECRET);
 */
export const EnvKeys = {
  JWT_SECRET: 'JWT_SECRET',
  JWT_ACCESS_TOKEN_TTL: 'JWT_ACCESS_TOKEN_TTL',
  JWT_REFRESH_TOKEN_TTL: 'JWT_REFRESH_TOKEN_TTL',
  COOKIE_DOMAIN: 'COOKIE_DOMAIN',
  ALLOWED_ORIGINS: 'ALLOWED_ORIGINS',
  NODE_ENV: 'NODE_ENV',
  PORT: 'PORT',
  GLOBAL_PREFIX: 'GLOBAL_PREFIX',
} as const;
