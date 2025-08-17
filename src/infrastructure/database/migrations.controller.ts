import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserRole } from '@prisma/client';
import { RequireRoles } from 'src/modules/auth/decorators';
import { RolesGuard } from 'src/modules/auth/guards';
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
  @ApiOperation({
    summary: 'Создать новую миграцию',
    description: 'Создает новую миграцию на основе изменений в схеме Prisma',
  })
  @ApiResponse({
    status: 200,
    description: 'Миграция успешно создана',
  })
  @ApiResponse({
    status: 403,
    description: 'Доступ запрещен (только для администраторов)',
  })
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
  @ApiOperation({
    summary: 'Применить миграции',
    description: 'Применяет все ожидающие миграции к базе данных',
  })
  @ApiResponse({
    status: 200,
    description: 'Миграции успешно применены',
  })
  @ApiResponse({
    status: 403,
    description: 'Доступ запрещен (только для администраторов)',
  })
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
  @ApiOperation({
    summary: 'Сбросить базу данных',
    description: 'Сбрасывает базу данных (только для разработки)',
  })
  @ApiResponse({
    status: 200,
    description: 'База данных успешно сброшена',
  })
  @ApiResponse({
    status: 403,
    description: 'Доступ запрещен (только для администраторов)',
  })
  async resetDatabase() {
    const result = await this.migrationsService.resetDatabase();
    return {
      success: true,
      message: 'База данных успешно сброшена',
      result,
    };
  }

  @Get('status')
  @ApiOperation({
    summary: 'Получить статус миграций',
    description: 'Возвращает текущий статус миграций базы данных',
  })
  @ApiResponse({
    status: 200,
    description: 'Статус миграций получен',
  })
  @ApiResponse({
    status: 403,
    description: 'Доступ запрещен (только для администраторов)',
  })
  async getMigrationStatus() {
    const result = await this.migrationsService.getMigrationStatus();
    return {
      success: true,
      status: result,
    };
  }

  @Post('generate-client')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Сгенерировать Prisma клиент',
    description: 'Генерирует Prisma клиент на основе текущей схемы',
  })
  @ApiResponse({
    status: 200,
    description: 'Prisma клиент успешно сгенерирован',
  })
  @ApiResponse({
    status: 403,
    description: 'Доступ запрещен (только для администраторов)',
  })
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
  @ApiOperation({
    summary: 'Применить схему напрямую',
    description: 'Применяет изменения схемы напрямую (только для разработки)',
  })
  @ApiResponse({
    status: 200,
    description: 'Схема успешно применена',
  })
  @ApiResponse({
    status: 403,
    description: 'Доступ запрещен (только для администраторов)',
  })
  async pushSchema() {
    const result = await this.migrationsService.pushSchema();
    return {
      success: true,
      message: 'Схема успешно применена',
      result,
    };
  }
}
