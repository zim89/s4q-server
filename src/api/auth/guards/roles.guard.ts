import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '@prisma/client';
import type { Request } from 'express';
import type { AuthenticatedUser } from '../types/auth.types';

/**
 * Role-based Authorization Guard
 *
 * Checks if the authenticated user has the required roles.
 * Reads roles from metadata set by @RequireRoles decorator.
 *
 * @example
 * @RequireRoles(Role.ADMIN)
 * @UseGuards(JwtGuard, RolesGuard)
 * @Get('admin')
 * getAdminData() {
 *   return 'Admin only data';
 * }
 */
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.get<Role[]>(
      'roles',
      context.getHandler()
    );

    // If no roles are required, allow access
    if (!requiredRoles || requiredRoles.length === 0) {
      return true;
    }

    const request = context.switchToHttp().getRequest<Request>();
    const user = request.user as AuthenticatedUser | undefined;

    // Check if user is authenticated
    if (!user) {
      throw new ForbiddenException('User not authenticated');
    }

    // Check if user has any of the required roles
    const hasRequiredRole = requiredRoles.some(role =>
      user.rights.includes(role)
    );

    if (!hasRequiredRole) {
      throw new ForbiddenException(
        `Access denied: required roles [${requiredRoles.join(', ')}], ` +
          `user has roles [${user.rights.join(', ')}]`
      );
    }

    return true;
  }
}
