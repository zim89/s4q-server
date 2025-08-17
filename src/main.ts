import { ValidationPipe, VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import helmet from 'helmet';
import { AppModule } from './app.module';
import {
  envKeys,
  getDatabaseConfig,
  getPrismaConfig,
  setupSwaggerDocs,
} from './config';
// eslint-disable-next-line @typescript-eslint/no-var-requires, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-require-imports
const compression = require('compression');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = app.get(ConfigService);

  // 🔒 Безопасность: HTTP заголовки безопасности
  app.use(helmet());

  // 🗜️ Сжатие: используем compression пакет
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  app.use(compression());

  // Инициализация конфигурации базы данных
  const dbConfig = getDatabaseConfig(config);
  const prismaConfig = getPrismaConfig(config);

  // Логирование настроек БД (только в development)
  if (config.get(envKeys.NODE_ENV) === 'development') {
    console.log('📊 Database Configuration:', {
      connection: dbConfig.connection,
      pool: dbConfig.pool,
      logging: dbConfig.logging,
    });
    console.log('🔧 Prisma Configuration:', {
      client: prismaConfig.client,
      databaseUrl: prismaConfig.databaseUrl ? 'configured' : 'not configured',
    });
  }

  app.use(cookieParser());

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      // forbidNonWhitelisted: false,
      // forbidUnknownValues: false,
    })
  );

  setupSwaggerDocs(app);

  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '0',
  });

  app.enableCors({
    origin: config.getOrThrow<string[]>(envKeys.ALLOWED_ORIGINS),
    credentials: true,
    methods: ['GET', 'POST', 'DELETE', 'PUT'],
    exposedHeaders: ['Set-Cookie', 'Content-Disposition'],
    allowedHeaders: ['Authorization', 'X-Api-Key'],
  });

  const port = config.get<number>(envKeys.PORT, 4040);
  await app.listen(port);

  console.log(`🚀 Application is running on: http://localhost:${port}`);

  // Graceful shutdown
  const signals = ['SIGTERM', 'SIGINT'];
  signals.forEach(signal => {
    process.on(signal, () => {
      console.log(`\n📴 Received ${signal}, starting graceful shutdown...`);

      void (async () => {
        try {
          // Закрываем приложение
          await app.close();
          console.log('✅ Application closed successfully');

          // Закрываем процесс
          process.exit(0);
        } catch (error: unknown) {
          console.error('❌ Error during graceful shutdown:', error);
          process.exit(1);
        }
      })();
    });
  });

  // Обработка необработанных ошибок
  process.on('unhandledRejection', (reason, promise) => {
    console.error('❌ Unhandled Rejection at:', promise, 'reason:', reason);
  });

  process.on('uncaughtException', error => {
    console.error('❌ Uncaught Exception:', error);
    process.exit(1);
  });
}

void bootstrap();
