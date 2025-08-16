import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { getJwtConfig } from 'src/config/jwt.config';
import { PrismaModule } from 'src/infrastructure/database';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { RefreshTokenService } from './refresh-token.service';
import { JwtStrategy } from './strategies/jwt.strategy';

/**
 * Authentication module for user authentication and authorization
 *
 * Provides:
 * - User registration and login
 * - JWT token management
 * - Refresh token handling
 * - Authentication guards and strategies
 *
 * @example
 * // Import in app.module.ts
 * imports: [AuthModule]
 */
@Module({
  imports: [
    PrismaModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: getJwtConfig,
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, RefreshTokenService],
  exports: [AuthService, RefreshTokenService, JwtStrategy],
})
export class AuthModule {}
