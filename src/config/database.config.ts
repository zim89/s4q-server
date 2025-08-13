import { ConfigService } from '@nestjs/config';
import { EnvKeys } from './env/keys';
import type { EnvSchema } from './env/schema';

/**
 * Database configuration factory
 *
 * Creates database connection options based on environment variables
 * Can be extended for different database types (PostgreSQL, MySQL, etc.)
 *
 * @param configService - NestJS ConfigService instance
 * @returns Database configuration options
 *
 * @example
 * // Use in prisma.module.ts
 * const dbConfig = getDatabaseConfig(configService);
 */
export function getDatabaseConfig(configService: ConfigService<EnvSchema>) {
  const nodeEnv = configService.get(EnvKeys.NODE_ENV) as string;
  const isProduction = nodeEnv === 'production';

  return {
    // Database connection settings
    connection: {
      url: configService.get(EnvKeys.POSTGRES_URI) as string,
      ssl: isProduction ? { rejectUnauthorized: false } : false,
    },

    // Connection pooling settings
    pool: {
      min: configService.get(EnvKeys.DB_POOL_MIN) as number,
      max: configService.get(EnvKeys.DB_POOL_MAX) as number,
      idleTimeoutMillis: configService.get(EnvKeys.DB_IDLE_TIMEOUT) as number,
      connectionTimeoutMillis: configService.get(
        EnvKeys.DB_CONNECTION_TIMEOUT
      ) as number,
    },

    // Query logging settings
    logging: {
      enabled: configService.get(EnvKeys.DB_LOGGING_ENABLED) as boolean,
      slowQueryThreshold: configService.get(
        EnvKeys.DB_SLOW_QUERY_THRESHOLD
      ) as number,
    },

    // Migration settings
    migrations: {
      directory: './prisma/migrations',
      tableName: '_prisma_migrations',
    },

    // Seed settings
    seed: {
      enabled: configService.get(EnvKeys.DB_SEED_ENABLED) as boolean,
      file: './prisma/seed.ts',
    },
  };
}

/**
 * Prisma client configuration
 */
export function getPrismaConfig(configService: ConfigService<EnvSchema>) {
  const isProduction = configService.get(EnvKeys.NODE_ENV) === 'production';

  return {
    // Prisma client settings
    client: {
      log: isProduction
        ? ['error', 'warn']
        : ['query', 'info', 'warn', 'error'],
      errorFormat: 'pretty',
    },

    // Database URL
    databaseUrl: configService.get(EnvKeys.POSTGRES_URI) as string,

    // Shadow database URL for migrations (optional)
    shadowDatabaseUrl: configService.get(EnvKeys.POSTGRES_SHADOW_URI) as string,
  };
}
