import { ConfigService } from '@nestjs/config';
import { EnvKeys } from 'src/config/env/env.constants';
import type { EnvSchema } from 'src/config/env/env.schema';

export const getSameSiteConfig = (
  cfg: ConfigService<EnvSchema>
): 'lax' | 'none' => {
  const env: string = cfg.getOrThrow(EnvKeys.NODE_ENV);
  return env === 'production' ? 'lax' : 'none';
};

export const isDevEnv = (cfg: ConfigService<EnvSchema>) =>
  cfg.getOrThrow<string>(EnvKeys.NODE_ENV) === 'development';

export const isProdEnv = (cfg: ConfigService<EnvSchema>) =>
  cfg.getOrThrow<string>(EnvKeys.NODE_ENV) === 'production';
