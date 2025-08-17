import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserRole } from '@prisma/client';
import { RequireRoles } from 'src/modules/auth/decorators';
import { RolesGuard } from 'src/modules/auth/guards';
import { MigrationsSwaggerDocs } from './decorators';
import { MigrationsService } from './services/migrations.service';

/**
 * DTO для создания миграции
 */
class CreateMigrationDto {
  name!: string;
}

/**
 * Контроллер для управления миграциями базы данных
 *
 * Предоставляет API для создания и применения миграций.
 * Доступен только для администраторов.
 */
@ApiTags('Database Migrations')
@Controller('migrations')
@UseGuards(RolesGuard)
@RequireRoles(UserRole.ADMIN)
export class MigrationsController {
  constructor(private readonly migrationsService: MigrationsService) {}

  @Post('generate')
  @HttpCode(HttpStatus.OK)
  @MigrationsSwaggerDocs.generateMigration()
  async generateMigration(@Body() createMigrationDto: CreateMigrationDto) {
    const result = await this.migrationsService.generateMigration(
      createMigrationDto.name
    );
    return {
      success: true,
      message: 'Миграция успешно создана',
      result,
    };
  }

  @Post('apply')
  @HttpCode(HttpStatus.OK)
  @MigrationsSwaggerDocs.applyMigrations()
  async applyMigrations() {
    const result = await this.migrationsService.applyMigrations();
    return {
      success: true,
      message: 'Миграции успешно применены',
      result,
    };
  }

  @Post('reset')
  @HttpCode(HttpStatus.OK)
  @MigrationsSwaggerDocs.resetDatabase()
  async resetDatabase() {
    const result = await this.migrationsService.resetDatabase();
    return {
      success: true,
      message: 'База данных успешно сброшена',
      result,
    };
  }

  @Get('status')
  @MigrationsSwaggerDocs.getMigrationStatus()
  async getMigrationStatus() {
    const result = await this.migrationsService.getMigrationStatus();
    return {
      success: true,
      status: result,
    };
  }

  @Post('generate-client')
  @HttpCode(HttpStatus.OK)
  @MigrationsSwaggerDocs.generateClient()
  async generateClient() {
    const result = await this.migrationsService.generateClient();
    return {
      success: true,
      message: 'Prisma клиент успешно сгенерирован',
      result,
    };
  }

  @Post('push-schema')
  @HttpCode(HttpStatus.OK)
  @MigrationsSwaggerDocs.pushSchema()
  async pushSchema() {
    const result = await this.migrationsService.pushSchema();
    return {
      success: true,
      message: 'Схема успешно применена',
      result,
    };
  }
}
