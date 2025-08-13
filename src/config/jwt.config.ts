import { ConfigService } from '@nestjs/config';
import type { JwtModuleOptions } from '@nestjs/jwt';
import { EnvKeys } from './env/keys';
import type { EnvSchema } from './env/schema';

/**
 * JWT configuration factory for NestJS JWT module
 *
 * Creates JWT module options with environment-based configuration
 * Includes signing and verification options
 *
 * @param configService - NestJS ConfigService instance
 * @returns JWT module configuration options
 *
 * @example
 * // Use in auth.module.ts
 * JwtModule.registerAsync({
 *   imports: [ConfigModule],
 *   useFactory: getJwtConfig,
 *   inject: [ConfigService]
 * })
 */
export function getJwtConfig(
  configService: ConfigService<EnvSchema>
): JwtModuleOptions {
  return {
    secret: configService.getOrThrow<string>(EnvKeys.JWT_SECRET),
    signOptions: {
      algorithm: 'HS256',
      expiresIn: configService.getOrThrow<string>(EnvKeys.JWT_ACCESS_TOKEN_TTL),
    },
    verifyOptions: {
      algorithms: ['HS256'],
      ignoreExpiration: false,
    },
  };
}
