import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Role } from '@prisma/client';
import { argon2id, hash, verify } from 'argon2';
import type { Request, Response } from 'express';
import { EnvKeys } from 'src/config/env/env.constants';
import type { EnvSchema } from 'src/config/env/env.schema';
import { PrismaService } from 'src/infrastructure/prisma/prisma.service';
import { CookieNames, ErrorMsgs } from 'src/shared/constants';
import type { LoginDto, RegisterDto } from './dto';
import type { RefreshTokenService } from './refresh-token.service';
import type { AuthenticatedUser, JwtPayload } from './types/auth.types';

@Injectable()
export class AuthService {
  private readonly JWT_ACCESS_TOKEN_TTL: string;
  private readonly JWT_REFRESH_TOKEN_TTL: string;

  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
    private readonly refreshTokenService: RefreshTokenService,
    readonly configService: ConfigService<EnvSchema>
  ) {
    this.JWT_ACCESS_TOKEN_TTL = configService.getOrThrow<string>(
      EnvKeys.JWT_ACCESS_TOKEN_TTL
    );
    this.JWT_REFRESH_TOKEN_TTL = configService.getOrThrow<string>(
      EnvKeys.JWT_REFRESH_TOKEN_TTL
    );
  }

  async register(res: Response, dto: RegisterDto) {
    // Проверяем существование пользователя
    const existingUser = await this.prismaService.user.findUnique({
      where: { email: dto.email.toLowerCase() },
    });

    if (existingUser) {
      throw new ConflictException(ErrorMsgs.user.alreadyExists(dto.email));
    }

    const user = await this.prismaService.user.create({
      data: {
        email: dto.email.toLowerCase(),
        firstName: dto.firstName,
        lastName: dto.lastName,
        passwordHash: await hash(dto.password, { type: argon2id }),
      },
      select: {
        id: true,
        rights: true,
        email: true,
        firstName: true,
        lastName: true,
        avatarUrl: true,
        isActive: true,
        lastLogin: true,
        createdAt: true,
      },
    });

    return this.auth(res, user);
  }

  async login(res: Response, dto: LoginDto) {
    const user = await this.prismaService.user.findUnique({
      where: {
        email: dto.email.toLowerCase(),
      },
      select: {
        id: true,
        passwordHash: true,
        email: true,
        rights: true,
        firstName: true,
        lastName: true,
        avatarUrl: true,
        isActive: true,
        lastLogin: true,
        createdAt: true,
      },
    });

    if (!user) {
      throw new NotFoundException(ErrorMsgs.user.invalidCredentials);
    }

    // Проверяем активность пользователя
    if (!user.isActive) {
      throw new UnauthorizedException('Account is deactivated');
    }

    const isValidPassword = await verify(user.passwordHash, dto.password);

    if (!isValidPassword) {
      throw new NotFoundException(ErrorMsgs.user.invalidCredentials);
    }

    // Обновляем время последнего входа
    await this.prismaService.user.update({
      where: { id: user.id },
      data: { lastLogin: new Date() },
    });

    return this.auth(res, user);
  }

  async refresh(req: Request, res: Response) {
    const token = req.cookies[CookieNames.REFRESH] as string | undefined;

    if (typeof token !== 'string' || token.trim() === '') {
      throw new UnauthorizedException(ErrorMsgs.auth.refreshTokenMissing);
    }

    let payload: JwtPayload;

    try {
      payload = await this.jwtService.verifyAsync<JwtPayload>(token);
    } catch {
      throw new UnauthorizedException(ErrorMsgs.auth.refreshTokenInvalid);
    }

    const isValid = await this.refreshTokenService.validate(payload.id, token);

    if (!isValid) {
      throw new UnauthorizedException(ErrorMsgs.auth.refreshTokenInvalid);
    }

    const user = await this.prismaService.user.findUnique({
      where: { id: payload.id },
      select: {
        id: true,
        rights: true,
        email: true,
        firstName: true,
        lastName: true,
        avatarUrl: true,
        isActive: true,
        lastLogin: true,
        createdAt: true,
      },
    });

    if (!user) {
      throw new NotFoundException(ErrorMsgs.user.notFound);
    }

    return this.auth(res, user);
  }

  async logout(res: Response, userId: string) {
    // Получаем refresh token из cookies
    const token = (res.req.cookies as Record<string, string>)[
      CookieNames.REFRESH
    ];

    if (token) {
      await this.refreshTokenService.invalidate(userId, token);
    }

    this.refreshTokenService.removeFromResponse(res);
    return { message: 'Successfully logged out' };
  }

  async validate(id: string) {
    const user = await this.prismaService.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      throw new NotFoundException(ErrorMsgs.user.notFound);
    }

    return user;
  }

  private async auth(res: Response, user: AuthenticatedUser) {
    const { accessToken, refreshToken } = this.generateTokens(
      user.id,
      user.rights
    );

    res.locals.userId = user.id; // Для RefreshTokenService

    await this.refreshTokenService.addToResponse(
      res,
      refreshToken,
      new Date(Date.now() + 1000 * 60 * 60 * 24 * 7)
    );

    return {
      accessToken,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        avatarUrl: user.avatarUrl || null,
        rights: user.rights,
        isActive: user.isActive,
        lastLogin: user.lastLogin,
        createdAt: user.createdAt,
      },
    };
  }

  private generateTokens(id: string, rights: Role[]) {
    const payload: JwtPayload = { id, rights };

    const accessToken = this.jwtService.sign(payload, {
      expiresIn: this.JWT_ACCESS_TOKEN_TTL,
    });

    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: this.JWT_REFRESH_TOKEN_TTL,
    });

    return {
      accessToken,
      refreshToken,
    };
  }
}
