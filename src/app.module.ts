import { Module, RequestMethod, type MiddlewareConsumer, type NestModule } from '@nestjs/common'
import { AppController } from './app.controller'
import { LoggerMiddleware } from './shared/middlewares'
import { AuthModule } from './api/auth/auth.module'
import { SetModule } from './api/set/set.module'
import { UserModule } from './api/user/user.module'
import { PrismaModule } from './infrastructure/prisma/prisma.module'
import { ConfigModule } from '@nestjs/config'
import { CronModule } from './api/cron/cron.module'
import { envConfig } from './config/env/env.config'
import { envSchema } from './config/env/env.schema'
import { z } from 'zod'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [envConfig.load[0]],
      envFilePath: ['.env.local', '.env'],
      validate: (config: Record<string, any>) => {
        try {
          // Валидация с помощью Zod
          const validatedConfig = envSchema.parse(config)
          return validatedConfig
        } catch (error) {
          if (error instanceof z.ZodError) {
            throw new Error(`Config validation error: ${error.message}`)
          }
          throw error
        }
      },
    }),
    PrismaModule,
    AuthModule,
    SetModule,
    UserModule,
    CronModule,
  ],
  controllers: [AppController],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes({ path: '*', method: RequestMethod.ALL })
  }
}
