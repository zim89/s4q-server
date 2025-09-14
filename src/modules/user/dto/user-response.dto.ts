import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { UserRole } from '@prisma/client';

/**
 * DTO для ответа с данными пользователя
 *
 * Используется в Swagger документации для описания структуры ответов API.
 * Содержит все поля модели User с подробными описаниями.
 *
 * @example
 * ```typescript
 * const userResponse: UserResponseDto = {
 *   id: 'cmfier0t20000p4hnsruuys01',
 *   createdAt: '2025-01-13T15:15:11.702Z',
 *   updatedAt: '2025-01-13T15:15:11.702Z',
 *   email: 'user@example.com',
 *   username: 'john_doe',
 *   firstName: 'John',
 *   lastName: 'Doe',
 *   role: UserRole.USER,
 *   isActive: true
 * };
 * ```
 */
export class UserResponseDto {
  @ApiProperty({
    description: 'Уникальный идентификатор пользователя',
    example: 'cmfier0t20000p4hnsruuys01',
  })
  id!: string;

  @ApiProperty({
    description: 'Дата и время создания пользователя',
    example: '2025-01-13T15:15:11.702Z',
  })
  createdAt!: Date;

  @ApiProperty({
    description: 'Дата и время последнего обновления пользователя',
    example: '2025-01-13T15:15:11.702Z',
  })
  updatedAt!: Date;

  @ApiProperty({
    description: 'Email адрес пользователя',
    example: 'user@example.com',
  })
  email!: string;

  @ApiProperty({
    description: 'Имя пользователя (уникальное)',
    example: 'john_doe',
  })
  username!: string;

  @ApiPropertyOptional({
    description: 'Имя пользователя',
    example: 'John',
  })
  firstName?: string;

  @ApiPropertyOptional({
    description: 'Фамилия пользователя',
    example: 'Doe',
  })
  lastName?: string;

  @ApiProperty({
    description: 'Роль пользователя в системе',
    enum: UserRole,
    example: UserRole.USER,
  })
  role!: UserRole;

  @ApiProperty({
    description: 'Активен ли пользователь',
    example: true,
  })
  isActive!: boolean;

  @ApiPropertyOptional({
    description: 'Дата и время последнего входа',
    example: '2025-01-13T15:15:11.702Z',
  })
  lastLoginAt?: Date;

  @ApiPropertyOptional({
    description: 'URL аватара пользователя',
    example: 'https://example.com/avatar.jpg',
  })
  avatarUrl?: string;
}
