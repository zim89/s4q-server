import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { SeedController } from './seed.controller';
import { DatabaseService } from './services/database.service';
import { SeedService } from './services/seed.service';

/**
 * Database module
 *
 * Provides high-level database operations and utilities
 */
@Module({
  imports: [PrismaModule],
  controllers: [SeedController],
  providers: [DatabaseService, SeedService],
  exports: [DatabaseService, SeedService],
})
export class DatabaseModule {}
