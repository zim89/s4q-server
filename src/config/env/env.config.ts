import { EnvKeys } from './env.constants'

export const envConfig = {
  load: [
    () => ({
      [EnvKeys.JWT_SECRET]: process.env[EnvKeys.JWT_SECRET],
      [EnvKeys.JWT_ACCESS_TOKEN_TTL]: process.env[EnvKeys.JWT_ACCESS_TOKEN_TTL],
      [EnvKeys.JWT_REFRESH_TOKEN_TTL]: process.env[EnvKeys.JWT_REFRESH_TOKEN_TTL],
      [EnvKeys.COOKIE_DOMAIN]: process.env[EnvKeys.COOKIE_DOMAIN],
      [EnvKeys.ALLOWED_ORIGINS]: process.env[EnvKeys.ALLOWED_ORIGINS],
    }),
  ],
}
