import { ApiProperty } from '@nestjs/swagger';
import type { AuthenticatedUser } from '../types/auth.types';

/**
 * Response DTO for authentication operations
 *
 * Returned after successful login, register, or token refresh
 * Contains JWT access token and user profile information
 *
 * @example
 * // Authentication response
 * const response: AuthResponseDto = {
 *   accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
 *   user: {
 *     id: 'cuid_123',
 *     email: 'john.doe@example.com',
 *     firstName: 'John',
 *     lastName: 'Doe',
 *     avatarUrl: null,
 *     rights: ['USER'],
 *     isActive: true,
 *     lastLogin: '2024-01-15T10:30:00.000Z',
 *     createdAt: '2024-01-01T00:00:00.000Z'
 *   }
 * };
 */
export class AuthResponseDto {
  @ApiProperty({
    description: 'JWT access token for API authentication',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  })
  accessToken!: string;

  @ApiProperty({
    description: 'User profile information with extended data',
    example: {
      id: 'cuid_123',
      email: 'john.doe@example.com',
      firstName: 'John',
      lastName: 'Doe',
      avatarUrl: null,
      rights: ['USER'],
      isActive: true,
      lastLogin: '2024-01-15T10:30:00.000Z',
      createdAt: '2024-01-01T00:00:00.000Z',
    },
  })
  user!: AuthenticatedUser;
}
