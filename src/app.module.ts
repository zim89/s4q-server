import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { ThrottlerModule } from '@nestjs/throttler';
import { z } from 'zod';
import { AppController } from './app.controller';
import { envLoader, envSchema } from './config';
import { PrismaModule } from './infrastructure/database';
import { AuthModule } from './modules/auth/auth.module';
import { SetModule } from './modules/set/set.module';
import { UserModule } from './modules/user/user.module';
import { AppThrottlerGuard } from './shared/guards';
import { LoggingInterceptor } from './shared/interceptors';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [envLoader.load[0]],
      envFilePath: ['.env.local', '.env'],
      validate: (config: Record<string, unknown>) => {
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
    // 🛡️ Rate Limiting: защита от DDoS атак
    ThrottlerModule.forRoot([
      {
        ttl: 60000, // 1 минута
        limit: 100, // максимум 100 запросов в минуту
      },
    ]),
    PrismaModule,
    AuthModule,
    SetModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [
    // 🛡️ Глобальный Rate Limiting Guard
    {
      provide: APP_GUARD,
      useClass: AppThrottlerGuard,
    },
    // 📝 Глобальный Logging Interceptor
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
  ],
})
export class AppModule {}
