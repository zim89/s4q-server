import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { DatabaseService } from './services/database.service';

/**
 * Database module
 *
 * Provides high-level database operations and utilities
 */
@Module({
  imports: [PrismaModule],
  providers: [DatabaseService],
  exports: [DatabaseService],
})
export class DatabaseModule {}
