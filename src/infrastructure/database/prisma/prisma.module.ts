import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

/**
 * Global Prisma module for database access
 *
 * Provides PrismaService as a global provider for database operations
 * Automatically handles connection lifecycle (connect/disconnect)
 *
 * @example
 * // Import in app.module.ts
 * imports: [PrismaModule]
 *
 * @example
 * // Use in any service
 * constructor(private prisma: PrismaService) {}
 */
@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
