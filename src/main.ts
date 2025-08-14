import { ValidationPipe, VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';
import {
  EnvKeys,
  getDatabaseConfig,
  getPrismaConfig,
  setupSwaggerDocs,
} from './config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = app.get(ConfigService);

  // Инициализация конфигурации базы данных
  const dbConfig = getDatabaseConfig(config);
  const prismaConfig = getPrismaConfig(config);

  // Логирование настроек БД (только в development)
  if (config.get(EnvKeys.NODE_ENV) === 'development') {
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
    defaultVersion: '1',
  });

  app.enableCors({
    origin: config.getOrThrow<string[]>(EnvKeys.ALLOWED_ORIGINS),
    credentials: true,
    methods: ['GET', 'POST', 'DELETE', 'PUT'],
    exposedHeaders: ['Set-Cookie', 'Content-Disposition'],
    allowedHeaders: ['Authorization', 'X-Api-Key'],
  });

  await app.listen(process.env.PORT ?? 4000);
}

void bootstrap();
