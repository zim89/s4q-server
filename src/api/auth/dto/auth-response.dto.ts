import { ApiProperty } from '@nestjs/swagger';
import type { AuthenticatedUser } from '../types/auth.types';

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
