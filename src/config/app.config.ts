import { ConfigService } from '@nestjs/config';
import { EnvKeys } from './env/keys';
import type { EnvSchema } from './env/schema';

/**
 * Application configuration factory
 *
 * Creates application-level configuration options
 * Includes server settings, logging, and other app-specific configs
 *
 * @param configService - NestJS ConfigService instance
 * @returns Application configuration options
 *
 * @example
 * // Use in main.ts
 * const appConfig = getAppConfig(configService);
 * app.setGlobalPrefix(appConfig.globalPrefix);
 */
export function getAppConfig(configService: ConfigService<EnvSchema>) {
  return {
    // Application configuration options
    port: configService.get<number>(EnvKeys.PORT, 3000),
    globalPrefix: configService.get<string>(EnvKeys.GLOBAL_PREFIX, 'api'),
    // Add more app-specific configurations as needed
  };
}
