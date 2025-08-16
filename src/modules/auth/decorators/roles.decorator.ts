import { SetMetadata } from '@nestjs/common';
import { UserRole } from '@prisma/client';

/**
 * Decorator to set required roles for endpoint access
 * Used internally by @Auth decorator
 * @param roles - Array of roles required to access the endpoint
 * @returns Metadata decorator with roles information
 *
 * @example
 * // Direct usage (not recommended, use @Auth instead)
 * @Get('admin')
 * @RequireRoles(UserRole.ADMIN)
 * @UseGuards(JwtGuard, RolesGuard)
 * getAdminData() {
 *   return 'Admin only';
 * }
 */
export const RequireRoles = (...roles: UserRole[]) =>
  SetMetadata('roles', roles);
