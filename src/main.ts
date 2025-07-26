import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe, VersioningType } from '@nestjs/common'
import * as cookieParser from 'cookie-parser'
import { setupSwaggerDocs } from './config/swagger.config'
import { ConfigService } from '@nestjs/config'
import { EnvKeys } from './config/env/env.constants'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  const config = app.get(ConfigService)

  app.use(cookieParser())

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      // forbidNonWhitelisted: false,
      // forbidUnknownValues: false,
    }),
  )

  setupSwaggerDocs(app)

  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  })

  app.enableCors({
    origin: config.getOrThrow<string>(EnvKeys.ALLOWED_ORIGINS).split(','),
    credentials: true,
    methods: ['GET', 'POST', 'DELETE', 'PUT'],
    exposedHeaders: ['Set-Cookie', 'Content-Disposition'],
    allowedHeaders: ['Authorization', 'X-Api-Key'],
  })

  await app.listen(process.env.PORT ?? 4000)
}

void bootstrap()
