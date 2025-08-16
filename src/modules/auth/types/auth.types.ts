import type { UserRole } from '@prisma/client';
import { Prisma } from '@prisma/client';

/**
 * JWT payload structure for authentication tokens
 */
export interface JwtPayload {
  /** User unique identifier */
  id: string;
  /** User roles and permissions */
  rights: UserRole[];
}

/**
 * User data for authenticated responses
 * Extends Prisma User with selected fields for authentication
 */
export type AuthenticatedUser = Prisma.UserGetPayload<{
  select: {
    id: true;
    rights: true;
    email: true;
    firstName: true;
    lastName: true;
    avatarUrl: true;
    isActive: true;
    lastLoginAt: true;
    createdAt: true;
  };
}>;
