import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import type { Request, Response } from 'express';
import { apiVersions } from 'src/shared/constants';
import { BodyRequiredPipe } from 'src/shared/pipes';
import { AuthService } from './auth.service';
import { AuthSwaggerDocs } from './decorators';
import { LoginDto, RegisterDto } from './dto';

/**
 * Authentication controller for user registration, login, and session management
 *
 * Provides endpoints for:
 * - User registration (with automatic login)
 * - User login
 * - Token refresh
 * - User logout
 * - Logout from all devices
 *
 * @example
 * // Register new user (automatically logs in)
 * POST /v0/auth/register
 * {
 *   "firstName": "John",
 *   "lastName": "Doe",
 *   "email": "john@example.com",
 *   "password": "password123"
 * }
 *
 * @example
 * // Login user
 * POST /v0/auth/login
 * {
 *   "email": "john@example.com",
 *   "password": "password123"
 * }
 */
@ApiTags('Auth')
@Controller({ path: 'auth', version: apiVersions.v0 })
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @AuthSwaggerDocs.register()
  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(
    @Res({ passthrough: true }) res: Response,
    @Body(BodyRequiredPipe) dto: RegisterDto
  ) {
    return await this.authService.register(res, dto);
  }

  @AuthSwaggerDocs.login()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(
    @Res({ passthrough: true }) res: Response,
    @Body(BodyRequiredPipe) dto: LoginDto
  ) {
    return await this.authService.login(res, dto);
  }

  @AuthSwaggerDocs.refresh()
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  async refresh(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response
  ) {
    return await this.authService.refresh(req, res);
  }

  @AuthSwaggerDocs.logout()
  @Post('logout')
  @HttpCode(HttpStatus.OK)
  async logout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const user = req.user as { id: string } | undefined;

    if (!user) {
      throw new UnauthorizedException('User not authorized');
    }
    return await this.authService.logout(res, user.id);
  }

  @AuthSwaggerDocs.logout()
  @Post('logout-all')
  @HttpCode(HttpStatus.OK)
  async logoutAllDevices(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response
  ) {
    const user = req.user as { id: string } | undefined;
    if (!user) {
      throw new UnauthorizedException('User not authorized');
    }
    return await this.authService.logoutAllDevices(res, user.id);
  }
}
