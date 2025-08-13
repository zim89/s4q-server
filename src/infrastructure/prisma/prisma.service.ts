import {
  Injectable,
  type OnModuleDestroy,
  type OnModuleInit,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

/**
 * Prisma service for database operations
 *
 * Extends PrismaClient with automatic connection management
 * Handles database connection lifecycle (connect/disconnect)
 * Provides type-safe database access throughout the application
 *
 * @example
 * // Use in service
 * constructor(private prisma: PrismaService) {}
 *
 * @example
 * // Database operations
 * const users = await this.prisma.user.findMany();
 * const user = await this.prisma.user.create({ data: userData });
 */
@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  /**
   * Connects to the database when the module initializes
   * Called automatically by NestJS lifecycle hooks
   */
  async onModuleInit() {
    await this.$connect();
  }

  /**
   * Disconnects from the database when the module is destroyed
   * Called automatically by NestJS lifecycle hooks
   */
  async onModuleDestroy() {
    await this.$disconnect();
  }
}
