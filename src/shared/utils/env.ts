import { ConfigService } from '@nestjs/config';
import { EnvKeys } from 'src/config/env/keys';
import type { EnvSchema } from 'src/config/env/schema';

/**
 * Gets the SameSite configuration for cookies based on environment
 * @param cfg - ConfigService instance
 * @returns 'lax' for production, 'none' for development
 *
 * @example
 * const sameSite = getCookieSameSite(configService);
 * // Returns 'lax' in production, 'none' in development
 */
export const getCookieSameSite = (
  cfg: ConfigService<EnvSchema>
): 'lax' | 'none' => {
  const env: string = cfg.getOrThrow(EnvKeys.NODE_ENV);
  return env === 'production' ? 'lax' : 'none';
};

/**
 * Checks if the current environment is development
 * @param cfg - ConfigService instance
 * @returns true if environment is development
 *
 * @example
 * // Check if running in development mode
 * if (isDevelopment(configService)) {
 *   console.log('Running in development mode');
 * }
 */
export const isDevelopment = (cfg: ConfigService<EnvSchema>): boolean =>
  cfg.getOrThrow<string>(EnvKeys.NODE_ENV) === 'development';

/**
 * Checks if the current environment is production
 * @param cfg - ConfigService instance
 * @returns true if environment is production
 *
 * @example
 * // Check if running in production mode
 * if (isProduction(configService)) {
 *   console.log('Running in production mode');
 * }
 */
export const isProduction = (cfg: ConfigService<EnvSchema>): boolean =>
  cfg.getOrThrow<string>(EnvKeys.NODE_ENV) === 'production';

/**
 * Checks if the current environment is test
 * @param cfg - ConfigService instance
 * @returns true if environment is test
 *
 * @example
 * // Check if running in test mode
 * if (isTest(configService)) {
 *   console.log('Running in test mode');
 * }
 */
export const isTest = (cfg: ConfigService<EnvSchema>): boolean =>
  cfg.getOrThrow<string>(EnvKeys.NODE_ENV) === 'test';

/**
 * Gets the current environment name
 * @param cfg - ConfigService instance
 * @returns current environment name
 *
 * @example
 * // Get current environment name
 * const env = getEnvironment(configService);
 * console.log(`Current environment: ${env}`);
 */
export const getEnvironment = (cfg: ConfigService<EnvSchema>): string =>
  cfg.getOrThrow<string>(EnvKeys.NODE_ENV);
