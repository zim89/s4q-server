import { ConfigService } from '@nestjs/config'

export const isDevEnv = (cfg: ConfigService) => cfg.getOrThrow('NODE_ENV') === 'development'

export const isProdEnv = (cfg: ConfigService) => cfg.getOrThrow('NODE_ENV') === 'production'
