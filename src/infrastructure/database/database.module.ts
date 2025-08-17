import { Module } from '@nestjs/common';
import { MigrationsController } from './migrations.controller';
import { PrismaModule } from './prisma/prisma.module';
import { DatabaseService } from './services/database.service';
import { MigrationsService } from './services/migrations.service';

/**
 * Database module
 *
 * Provides high-level database operations and utilities
 */
@Module({
  imports: [PrismaModule],
  controllers: [MigrationsController],
  providers: [DatabaseService, MigrationsService],
  exports: [DatabaseService, MigrationsService],
})
export class DatabaseModule {}
