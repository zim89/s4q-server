import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common'
import { PrismaService } from 'src/infrastructure/prisma/prisma.service'
import { argon2id, hash, verify } from 'argon2'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { isDevEnv, isProdEnv } from 'src/shared/utils/env.utils'
import { CookieNames, ErrorMsgs } from 'src/shared/constants'
import type { RegisterDto } from './dto/register.dto'
import type { LoginDto } from './dto/login.dto'
import type { Request, Response } from 'express'
import type { JwtPayload } from './types/jwt-payload'
import { EnvKeys } from 'src/config/env/env.constants'

@Injectable()
export class AuthService {
  private readonly JWT_ACCESS_TOKEN_TTL: string
  private readonly JWT_REFRESH_TOKEN_TTL: string
  private readonly COOKIE_DOMAIN: string

  constructor(
    private readonly prismaService: PrismaService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {
    this.JWT_ACCESS_TOKEN_TTL = configService.getOrThrow<string>(EnvKeys.JWT_ACCESS_TOKEN_TTL)
    this.JWT_REFRESH_TOKEN_TTL = configService.getOrThrow<string>(EnvKeys.JWT_REFRESH_TOKEN_TTL)
    this.COOKIE_DOMAIN = configService.getOrThrow<string>(EnvKeys.COOKIE_DOMAIN)
  }

  async register(res: Response, dto: RegisterDto) {
    const existingUser = await this.prismaService.user.findUnique({
      where: { email: dto.email },
    })

    if (existingUser) {
      throw new ConflictException(ErrorMsgs.user.alreadyExists(dto.email))
    }

    const user = await this.prismaService.user.create({
      data: {
        email: dto.email,
        firstName: dto.firstName,
        lastName: dto.lastName,
        passwordHash: await hash(dto.password, { type: argon2id }),
      },
    })

    return this.auth(res, user.id)
  }

  async login(res: Response, dto: LoginDto) {
    const user = await this.prismaService.user.findUnique({
      where: {
        email: dto.email,
      },
      select: {
        id: true,
        passwordHash: true,
      },
    })

    if (!user) {
      throw new NotFoundException(ErrorMsgs.user.invalidCredentials)
    }

    const isValidPassword = await verify(user.passwordHash, dto.password)

    if (!isValidPassword) {
      throw new NotFoundException(ErrorMsgs.user.invalidCredentials)
    }

    return this.auth(res, user.id)
  }

  async refresh(req: Request, res: Response): Promise<{ accessToken: string }> {
    const token = req.cookies[CookieNames.REFRESH] as string | undefined

    if (typeof token !== 'string' || token.trim() === '') {
      throw new UnauthorizedException(ErrorMsgs.auth.refreshTokenMissing)
    }

    let payload: JwtPayload

    try {
      payload = await this.jwtService.verifyAsync<JwtPayload>(token)
    } catch {
      throw new UnauthorizedException(ErrorMsgs.auth.refreshTokenInvalid)
    }

    const user = await this.prismaService.user.findUnique({
      where: { id: payload.id },
      select: { id: true },
    })

    if (!user) {
      throw new NotFoundException(ErrorMsgs.user.notFound)
    }

    return this.auth(res, user.id)
  }

  async validate(id: string) {
    const user = await this.prismaService.user.findUnique({
      where: {
        id,
      },
    })

    if (!user) {
      throw new NotFoundException(ErrorMsgs.user.notFound)
    }

    return user
  }

  logout(res: Response) {
    res.clearCookie(CookieNames.REFRESH)
    return true
  }

  private auth(res: Response, id: string) {
    const { accessToken, refreshToken } = this.generateTokens(id)

    this.setCookies(res, refreshToken, new Date(Date.now() + 1000 * 60 * 60 * 24 * 7))

    return { accessToken }
  }

  private generateTokens(id: string) {
    const payload: JwtPayload = { id }

    const accessToken = this.jwtService.sign(payload, {
      expiresIn: this.JWT_ACCESS_TOKEN_TTL,
    })

    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: this.JWT_REFRESH_TOKEN_TTL,
    })

    return {
      accessToken,
      refreshToken,
    }
  }

  private setCookies(res: Response, token: string, expires: Date) {
    res.cookie(CookieNames.REFRESH, token, {
      httpOnly: true,
      domain: this.COOKIE_DOMAIN,
      expires,
      secure: isProdEnv(this.configService),
      sameSite: isDevEnv(this.configService) ? 'none' : 'lax',
    })
  }
}
