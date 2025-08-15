import { applyDecorators, UseGuards } from '@nestjs/common';
import { UserRole } from '@prisma/client';
import { JwtGuard, RolesGuard } from '../guards';
import { RequireRoles } from './roles.decorator';

/**
 * Decorator to protect endpoints with authentication and role-based authorization
 * @param roles - Single role, array of roles, or empty for default USER role
 * @returns Combined decorators for authentication and authorization
 *
 * @example
 * // Default protection (USER role)
 * @Get('profile')
 * @Auth()
 * getProfile() {
 *   return 'Protected endpoint';
 * }
 *
 * @example
 * // Specific role
 * @Get('admin')
 * @Auth(Role.ADMIN)
 * getAdminData() {
 *   return 'Admin only';
 * }
 *
 * @example
 * // Multiple roles
 * @Get('moderator')
 * @Auth([Role.MODERATOR, Role.ADMIN])
 * getModeratorData() {
 *   return 'Moderator or Admin';
 * }
 */
export function Auth(roles: UserRole | UserRole[] = [UserRole.USER]) {
  const roleArray = Array.isArray(roles) ? roles : [roles];

  return applyDecorators(
    RequireRoles(...roleArray),
    UseGuards(JwtGuard, RolesGuard)
  );
}
