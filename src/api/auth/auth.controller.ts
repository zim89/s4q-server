import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UnauthorizedException,
  Version,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import type { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { AuthSwaggerDocs } from './decorators';
import { LoginDto, RegisterDto } from './dto';

/**
 * Authentication controller for user registration, login, and session management
 *
 * Provides endpoints for:
 * - User registration
 * - User login
 * - Token refresh
 * - User logout
 *
 * @example
 * // Register new user
 * POST /v1/auth/register
 * {
 *   "firstName": "John",
 *   "lastName": "Doe",
 *   "email": "john@example.com",
 *   "password": "password123"
 * }
 *
 * @example
 * // Login user
 * POST /v2/auth/login
 * {
 *   "email": "john@example.com",
 *   "password": "password123"
 * }
 */
@ApiTags('Auth')
@Controller({ path: 'auth', version: '1' })
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @AuthSwaggerDocs.register()
  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(
    @Res({ passthrough: true }) res: Response,
    @Body() dto: RegisterDto
  ) {
    return await this.authService.register(res, dto);
  }

  @Version('2')
  @AuthSwaggerDocs.login()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(
    @Res({ passthrough: true }) res: Response,
    @Body() dto: LoginDto
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
}
