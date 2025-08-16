import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AuthResponseDto } from '../dto';

/**
 * Swagger documentation decorators for authentication endpoints
 *
 * Provides pre-configured Swagger decorators for:
 * - User registration
 * - User login
 * - Token refresh
 * - User logout
 *
 * @example
 * // Use in controller
 * @AuthSwaggerDocs.register()
 * @Post('register')
 * register(@Body() dto: RegisterDto) {
 *   return this.authService.register(dto);
 * }
 */
export const AuthSwaggerDocs = {
  register: () =>
    applyDecorators(
      ApiOperation({
        summary: 'Register a new account',
        description: 'Registers a new user account with the provided details.',
      }),
      ApiOkResponse({ type: AuthResponseDto }),
      ApiBadRequestResponse({ description: 'Invalid input data' }),
      ApiConflictResponse({ description: 'User already exists' })
    ),

  login: () =>
    applyDecorators(
      ApiOperation({
        summary: 'Login to an existing account',
        description: 'Logs in a user with the provided email and password.',
      }),
      ApiOkResponse({ type: AuthResponseDto }),
      ApiBadRequestResponse({ description: 'Invalid input data' }),
      ApiNotFoundResponse({ description: 'User not found' })
    ),

  refresh: () =>
    applyDecorators(
      ApiOperation({
        summary: 'Refresh access token',
        description:
          'Refreshes the access token using the refresh token provided in the request.',
      }),
      ApiOkResponse({ type: AuthResponseDto }),
      ApiUnauthorizedResponse({
        description: 'Refresh token is missing or invalid',
      })
    ),

  logout: () =>
    applyDecorators(
      ApiOperation({
        summary: 'Logout from the current session',
        description:
          'Logs out the current user and invalidates the refresh token',
      }),
      ApiOkResponse({ description: 'Successfully logged out' }),
      ApiUnauthorizedResponse({ description: 'User not authorized' })
    ),
};
