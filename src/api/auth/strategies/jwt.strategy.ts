import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { EnvKeys } from 'src/config/env/env.constants';
import type { EnvSchema } from 'src/config/env/env.schema';
import { AuthService } from '../auth.service';
import type { AuthenticatedUser, JwtPayload } from '../types/auth.types';

/**
 * JWT Strategy for Passport authentication
 *
 * Validates JWT tokens and extracts user information.
 * Used by JwtGuard to authenticate requests.
 *
 * @example
 * // Automatically used by JwtGuard
 * @UseGuards(JwtGuard)
 * @Get('protected')
 * getProtectedData(@CurrentUser() user: AuthenticatedUser) {
 *   return user;
 * }
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService<EnvSchema>
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.getOrThrow<string>(EnvKeys.JWT_SECRET),
      algorithms: ['HS256'],
    });
  }

  /**
   * Validates JWT payload and returns user data
   * @param payload - JWT payload containing user ID and roles
   * @returns Authenticated user data
   * @throws UnauthorizedException if user not found or inactive
   */
  async validate(payload: JwtPayload): Promise<AuthenticatedUser> {
    try {
      const user = await this.authService.validate(payload.id);

      // Additional validation checks
      if (!user.isActive) {
        throw new UnauthorizedException('User account is deactivated');
      }

      return user;
    } catch (error) {
      // Log the error for debugging (in production, use proper logger)
      console.error('JWT validation failed:', error);

      if (error instanceof UnauthorizedException) {
        throw error;
      }

      throw new UnauthorizedException('Invalid token or user not found');
    }
  }
}
