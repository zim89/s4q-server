import { ConfigService } from '@nestjs/config';
import type { JwtModuleOptions } from '@nestjs/jwt';
import { EnvKeys } from './env/env.constants';
import type { EnvSchema } from './env/env.schema';

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
