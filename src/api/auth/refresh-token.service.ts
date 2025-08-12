import { Injectable, UnauthorizedException } from '@nestjs/common';
import type { ConfigService } from '@nestjs/config';
import { argon2id, hash, verify } from 'argon2';
import type { Response } from 'express';
import { EnvKeys } from 'src/config/env/env.constants';
import type { EnvSchema } from 'src/config/env/env.schema';
import type { PrismaService } from 'src/infrastructure/prisma/prisma.service';
import { CookieNames } from 'src/shared/constants';
import { getSameSiteConfig, isProdEnv } from 'src/shared/utils/env.utils';

/**
 * Service for managing refresh tokens and user sessions
 *
 * Handles:
 * - Adding refresh tokens to HTTP-only cookies
 * - Validating refresh tokens against database
 * - Invalidating refresh tokens on logout
 * - Managing user sessions with IP and User-Agent tracking
 *
 * @example
 * // Add refresh token to response
 * await refreshTokenService.addToResponse(res, token, expires);
 *
 * // Validate refresh token
 * const isValid = await refreshTokenService.validate(userId, token);
 *
 * // Invalidate refresh token on logout
 * await refreshTokenService.invalidate(userId, token);
 */
@Injectable()
export class RefreshTokenService {
  private readonly REFRESH_TOKEN_KEY = CookieNames.REFRESH;
  private readonly COOKIE_DOMAIN: string;

  constructor(
    private readonly prismaService: PrismaService,
    private readonly configService: ConfigService<EnvSchema>
  ) {
    this.COOKIE_DOMAIN = configService.getOrThrow<string>(
      EnvKeys.COOKIE_DOMAIN
    );
  }

  /**
   * Adds refresh token to HTTP-only cookie and saves session to database
   * @param res - Express response object
   * @param refreshToken - Plain refresh token to store
   * @param expires - Expiration date for the token
   * @throws UnauthorizedException if user ID is missing or invalid
   */
  async addToResponse(
    res: Response,
    refreshToken: string,
    expires: Date
  ): Promise<void> {
    const userId = res.locals.userId as string | undefined;

    if (!userId || typeof userId !== 'string') {
      throw new UnauthorizedException('User ID is missing or invalid');
    }

    try {
      // Hash the refresh token for secure storage
      const refreshTokenHash = await hash(refreshToken, { type: argon2id });

      // Save session to database
      await this.prismaService.session.create({
        data: {
          userId,
          refreshToken: refreshTokenHash,
          expiresAt: expires,
          ipAddress: res.req.ip || 'unknown',
          userAgent: res.req.get('User-Agent') || 'unknown',
        },
      });

      // Set HTTP-only cookie
      res.cookie(
        this.REFRESH_TOKEN_KEY,
        refreshToken,
        this.getCookieConfig(expires)
      );
    } catch (error) {
      console.error('Failed to add refresh token to response:', error);
      throw new UnauthorizedException('Failed to create session');
    }
  }

  /**
   * Validates refresh token against stored hash in database
   * @param userId - User ID to validate token for
   * @param refreshToken - Plain refresh token to validate
   * @returns true if token is valid, false otherwise
   */
  async validate(userId: string, refreshToken: string): Promise<boolean> {
    try {
      const session = await this.prismaService.session.findFirst({
        where: {
          userId,
          isActive: true,
          expiresAt: { gt: new Date() }, // Check if not expired
        },
      });

      if (!session?.refreshToken) {
        return false;
      }

      return await verify(session.refreshToken, refreshToken);
    } catch (error) {
      console.error('Failed to validate refresh token:', error);
      return false;
    }
  }

  /**
   * Invalidates refresh token by marking session as inactive
   * @param userId - User ID to invalidate token for
   * @param refreshToken - Plain refresh token to invalidate
   */
  async invalidate(userId: string, refreshToken: string): Promise<void> {
    try {
      const refreshTokenHash = await hash(refreshToken, { type: argon2id });

      await this.prismaService.session.updateMany({
        where: {
          userId,
          refreshToken: refreshTokenHash,
          isActive: true,
        },
        data: { isActive: false },
      });
    } catch (error) {
      console.error('Failed to invalidate refresh token:', error);
      // Don't throw error to avoid breaking logout flow
    }
  }

  /**
   * Removes refresh token cookie from response
   * @param res - Express response object
   */
  removeFromResponse(res: Response): void {
    res.clearCookie(this.REFRESH_TOKEN_KEY, this.getCookieConfig());
  }

  /**
   * Gets cookie configuration for refresh tokens
   * @returns Cookie configuration object
   */
  private getCookieConfig(expires?: Date) {
    return {
      httpOnly: true,
      domain: this.COOKIE_DOMAIN,
      secure: isProdEnv(this.configService),
      sameSite: getSameSiteConfig(this.configService),
      ...(expires && { expires }),
    };
  }
}
