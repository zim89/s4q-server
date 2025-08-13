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
    }),
  ],
};
