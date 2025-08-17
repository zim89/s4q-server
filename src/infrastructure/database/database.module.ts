import { Module } from '@nestjs/common';
import { MigrationsController } from './migrations.controller';
import { PrismaModule } from './prisma/prisma.module';
import { SeedController } from './seed.controller';
import { DatabaseService } from './services/database.service';
import { MigrationsService } from './services/migrations.service';
import { SeedService } from './services/seed.service';

/**
 * Database module
 *
 * Provides high-level database operations and utilities
 */
@Module({
  imports: [PrismaModule],
  controllers: [MigrationsController, SeedController],
  providers: [DatabaseService, MigrationsService, SeedService],
  exports: [DatabaseService, MigrationsService, SeedService],
})
export class DatabaseModule {}
