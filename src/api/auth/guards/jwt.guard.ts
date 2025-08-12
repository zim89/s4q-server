import { AuthGuard } from '@nestjs/passport';

/**
 * JWT Authentication Guard
 *
 * Validates JWT tokens and authenticates users.
 * Extends Passport's AuthGuard with 'jwt' strategy.
 *
 * @example
 * @UseGuards(JwtGuard)
 * @Get('protected')
 * getProtectedData() {
 *   return 'This endpoint requires authentication';
 * }
 */
export class JwtGuard extends AuthGuard('jwt') {}
