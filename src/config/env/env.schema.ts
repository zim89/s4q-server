import { z } from 'zod'
import { EnvKeys } from './env.constants'

export const envSchema = z.object({
  [EnvKeys.JWT_SECRET]: z.string().nonempty('JWT_SECRET is required'),
  [EnvKeys.JWT_ACCESS_TOKEN_TTL]: z.string().default('1h'),
  [EnvKeys.JWT_REFRESH_TOKEN_TTL]: z.string().default('7d'),
  [EnvKeys.COOKIE_DOMAIN]: z.string().optional(),
  [EnvKeys.ALLOWED_ORIGINS]: z.string().optional(),
})

export type EnvSchema = z.infer<typeof envSchema>
