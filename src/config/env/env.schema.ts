import { z } from 'zod';
import { EnvKeys } from './env.constants';

export const envSchema = z.object({
  [EnvKeys.JWT_SECRET]: z.string().nonempty('JWT_SECRET is required'),
  [EnvKeys.JWT_ACCESS_TOKEN_TTL]: z.string().default('1h'),
  [EnvKeys.JWT_REFRESH_TOKEN_TTL]: z.string().default('7d'),
  [EnvKeys.COOKIE_DOMAIN]: z.string().nonempty('COOKIE_DOMAIN is required'),
  [EnvKeys.ALLOWED_ORIGINS]: z
    .string()
    .optional()
    .transform(val => (val ? val.split(',').map(url => url.trim()) : []))
    .pipe(z.array(z.string())),
  [EnvKeys.NODE_ENV]: z
    .enum(['development', 'production', 'test'])
    .default('development'),
});

export type EnvSchema = z.infer<typeof envSchema>;
