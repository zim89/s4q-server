import { ConfigService } from '@nestjs/config';
import { envKeys } from './env/keys';
import type { EnvSchema } from './env/schema';

/**
 * Интерфейсы для типизации конфигурации
 */
interface DatabaseConnectionConfig {
  url: string;
  ssl: boolean | { rejectUnauthorized: boolean };
}

interface DatabasePoolConfig {
  min: number;
  max: number;
  idleTimeoutMillis: number;
  connectionTimeoutMillis: number;
}

interface DatabaseLoggingConfig {
  enabled: boolean;
  slowQueryThreshold: number;
}

interface DatabaseMigrationsConfig {
  directory: string;
  tableName: string;
}

interface DatabaseSeedConfig {
  enabled: boolean;
  file: string;
}

interface DatabaseConfig {
  connection: DatabaseConnectionConfig;
  pool: DatabasePoolConfig;
  logging: DatabaseLoggingConfig;
  migrations: DatabaseMigrationsConfig;
  seed: DatabaseSeedConfig;
}

interface PrismaClientConfig {
  log: string[];
  errorFormat: string;
}

interface PrismaConfig {
  client: PrismaClientConfig;
  databaseUrl: string;
  shadowDatabaseUrl: string;
}

interface DatabaseMetricsConfig {
  enabled: boolean;
  interval: number;
}

interface DatabaseAlertsConfig {
  slowQueryThreshold: number;
  connectionErrorThreshold: number;
}

interface DatabaseMonitoringLoggingConfig {
  logQueries: boolean;
  logParameters: boolean;
  logQueryTime: boolean;
}

interface DatabaseMonitoringConfig {
  metrics: DatabaseMetricsConfig;
  alerts: DatabaseAlertsConfig;
  logging: DatabaseMonitoringLoggingConfig;
}

/**
 * Конфигурация базы данных
 *
 * Этот модуль отвечает за настройку всех аспектов работы с базой данных.
 * Включает конфигурацию подключения, пула соединений, логирования,
 * миграций и заполнения начальными данными.
 *
 * @description
 * Основные функции:
 * - Настройка подключения к PostgreSQL
 * - Управление пулом соединений
 * - Конфигурация логирования запросов
 * - Настройка миграций и сидинга
 * - Конфигурация Prisma Client
 *
 * @example
 * // Использование в модуле
 * const dbConfig = getDatabaseConfig(configService);
 * const prismaConfig = getPrismaConfig(configService);
 *
 * @example
 * // Получение настроек подключения
 * const connection = dbConfig.connection;
 * const pool = dbConfig.pool;
 *
 * @example
 * // Настройка логирования
 * const logging = dbConfig.logging;
 * if (logging.enabled) {
 *   // Включить логирование запросов
 * }
 */

/**
 * Получение конфигурации базы данных
 *
 * Создает объект конфигурации для всех аспектов работы с БД.
 * Настройки берутся из переменных окружения и адаптируются
 * под текущее окружение (development/production).
 *
 * @param configService - Сервис конфигурации NestJS
 * @returns Объект с настройками базы данных
 *
 * @description
 * Возвращает конфигурацию для:
 * - Подключения к базе данных
 * - Пул соединений
 * - Логирования запросов
 * - Миграций
 * - Заполнения начальными данными
 */
export function getDatabaseConfig(
  configService: ConfigService<EnvSchema>
): DatabaseConfig {
  const nodeEnv = configService.get(envKeys.NODE_ENV) as string;
  const isProduction = nodeEnv === 'production';

  return {
    // Настройки подключения к базе данных
    connection: {
      // URL подключения к PostgreSQL
      url: (configService.get(envKeys.POSTGRES_URI) as string) || '',
      // SSL настройки (требуются в production)
      ssl: isProduction ? { rejectUnauthorized: false } : false,
    },

    // Настройки пула соединений
    pool: {
      // Минимальное количество соединений в пуле
      min: (configService.get(envKeys.DB_POOL_MIN) as number) || 2,
      // Максимальное количество соединений в пуле
      max: (configService.get(envKeys.DB_POOL_MAX) as number) || 10,
      // Время неактивности соединения перед закрытием (мс)
      idleTimeoutMillis:
        (configService.get(envKeys.DB_IDLE_TIMEOUT) as number) || 30000,
      // Таймаут установки соединения (мс)
      connectionTimeoutMillis:
        (configService.get(envKeys.DB_CONNECTION_TIMEOUT) as number) || 2000,
    },

    // Настройки логирования запросов
    logging: {
      // Включить/выключить логирование
      enabled:
        (configService.get(envKeys.DB_LOGGING_ENABLED) as boolean) ?? true,
      // Порог для медленных запросов (мс)
      slowQueryThreshold:
        (configService.get(envKeys.DB_SLOW_QUERY_THRESHOLD) as number) || 1000,
    },

    // Настройки миграций
    migrations: {
      // Директория с миграциями (обновлено под новую структуру)
      directory: './src/infrastructure/database/schema/migrations',
      // Имя таблицы для отслеживания миграций
      tableName: '_prisma_migrations',
    },

    // Настройки заполнения начальными данными
    seed: {
      // Включить/выключить автоматическое заполнение
      enabled: (configService.get(envKeys.DB_SEED_ENABLED) as boolean) ?? false,
      // Путь к файлу с начальными данными
      file: './src/infrastructure/database/services/seed.service.ts',
    },
  };
}

/**
 * Конфигурация Prisma Client
 *
 * Создает настройки для Prisma Client, включая логирование,
 * форматирование ошибок и URL базы данных.
 *
 * @param configService - Сервис конфигурации NestJS
 * @returns Объект с настройками Prisma Client
 *
 * @description
 * Настройки включают:
 * - Уровни логирования (зависят от окружения)
 * - Форматирование ошибок
 * - URL основной и shadow базы данных
 *
 * @example
 * // Использование в PrismaService
 * const prismaConfig = getPrismaConfig(configService);
 * this.prisma = new PrismaClient(prismaConfig);
 */
export function getPrismaConfig(
  configService: ConfigService<EnvSchema>
): PrismaConfig {
  const isProduction = configService.get(envKeys.NODE_ENV) === 'production';

  return {
    // Настройки Prisma Client
    client: {
      // Уровни логирования (в production только ошибки и предупреждения)
      log: isProduction
        ? ['error', 'warn']
        : ['query', 'info', 'warn', 'error'],
      // Форматирование ошибок (красивое в development)
      errorFormat: 'pretty',
    },

    // URL основной базы данных
    databaseUrl: (configService.get(envKeys.POSTGRES_URI) as string) || '',

    // URL shadow базы данных для миграций (опционально)
    shadowDatabaseUrl:
      (configService.get(envKeys.POSTGRES_SHADOW_URI) as string) || '',
  };
}

/**
 * Получение конфигурации для мониторинга базы данных
 *
 * Создает настройки для мониторинга производительности БД,
 * включая метрики, алерты и логирование.
 *
 * @param configService - Сервис конфигурации NestJS
 * @returns Объект с настройками мониторинга
 *
 * @description
 * Мониторинг включает:
 * - Метрики производительности
 * - Алерты на медленные запросы
 * - Логирование ошибок подключения
 * - Статистику использования пула соединений
 */
export function getDatabaseMonitoringConfig(
  configService: ConfigService<EnvSchema>
): DatabaseMonitoringConfig {
  return {
    // Настройки метрик
    metrics: {
      // Включить сбор метрик
      enabled:
        (configService.get(envKeys.DB_METRICS_ENABLED) as boolean) ?? false,
      // Интервал сбора метрик (секунды)
      interval:
        (configService.get(envKeys.DB_METRICS_INTERVAL) as number) || 60,
    },

    // Настройки алертов
    alerts: {
      // Порог для алерта на медленные запросы (мс)
      slowQueryThreshold:
        (configService.get(envKeys.DB_ALERT_SLOW_QUERY) as number) || 5000,
      // Порог для алерта на ошибки подключения
      connectionErrorThreshold:
        (configService.get(envKeys.DB_ALERT_CONNECTION_ERRORS) as number) || 10,
    },

    // Настройки логирования
    logging: {
      // Логировать все SQL запросы
      logQueries:
        (configService.get(envKeys.DB_LOG_QUERIES) as boolean) ?? false,
      // Логировать параметры запросов
      logParameters:
        (configService.get(envKeys.DB_LOG_PARAMETERS) as boolean) ?? false,
      // Логировать время выполнения запросов
      logQueryTime:
        (configService.get(envKeys.DB_LOG_QUERY_TIME) as boolean) ?? true,
    },
  };
}
