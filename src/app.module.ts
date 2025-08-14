import {
  type MiddlewareConsumer,
  Module,
  type NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { z } from 'zod';
import { AuthModule } from './api/auth/auth.module';
import { CronModule } from './api/cron/cron.module';
import { SetModule } from './api/set/set.module';
import { UserModule } from './api/user/user.module';
import { AppController } from './app.controller';
import { envLoader, envSchema } from './config';
import { PrismaModule } from './infrastructure/database';
import { LoggerMiddleware } from './shared/middlewares';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [envLoader.load[0]],
      envFilePath: ['.env.local', '.env'],
      validate: (config: Record<string, any>) => {
        try {
          const validatedConfig = envSchema.parse(config);
          return validatedConfig;
        } catch (error) {
          if (error instanceof z.ZodError) {
            throw new Error(`Config validation error: ${error.message}`);
          }
          throw error;
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
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
