import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { UserRole } from '@prisma/client';
import { UserSwaggerSchemas } from '../schemas/user-swagger.schemas';

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
 *   firstName: 'John',
 *   lastName: 'Doe',
 *   rights: [UserRole.USER],
 *   isActive: true
 * };
 * ```
 */
export class UserResponseDto {
  @ApiProperty(UserSwaggerSchemas.id)
  id!: string;

  @ApiProperty(UserSwaggerSchemas.createdAt)
  createdAt!: Date;

  @ApiProperty(UserSwaggerSchemas.updatedAt)
  updatedAt!: Date;

  @ApiProperty(UserSwaggerSchemas.email)
  email!: string;

  @ApiPropertyOptional(UserSwaggerSchemas.firstName)
  firstName?: string;

  @ApiPropertyOptional(UserSwaggerSchemas.lastName)
  lastName?: string;

  @ApiProperty(UserSwaggerSchemas.rights)
  rights!: UserRole[];

  @ApiProperty(UserSwaggerSchemas.isActive)
  isActive!: boolean;

  @ApiPropertyOptional(UserSwaggerSchemas.lastLoginAt)
  lastLoginAt?: Date;

  @ApiPropertyOptional(UserSwaggerSchemas.avatarUrl)
  avatarUrl?: string;
}
