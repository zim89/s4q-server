import {
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
import { SeedSwaggerDocs } from './decorators';
import { SeedService } from './services/seed.service';

/**
 * Контроллер для управления сидингом данных
 *
 * Предоставляет API для заполнения базы данных начальными данными.
 * Доступен только для администраторов.
 */
@ApiTags('Database Seeding')
@Controller('seed')
@UseGuards(RolesGuard)
@RequireRoles(UserRole.ADMIN)
export class SeedController {
  constructor(private readonly seedService: SeedService) {}

  @Post('languages')
  @HttpCode(HttpStatus.OK)
  @SeedSwaggerDocs.seedLanguages()
  async seedLanguages() {
    await this.seedService.seedLanguages();
    return {
      success: true,
      message: 'Языки успешно заполнены',
    };
  }

  @Post('initial-data')
  @HttpCode(HttpStatus.OK)
  @SeedSwaggerDocs.seedInitialData()
  async seedInitialData() {
    await this.seedService.seedInitialData();
    return {
      success: true,
      message: 'Начальные данные успешно заполнены',
    };
  }

  @Post('clear')
  @HttpCode(HttpStatus.OK)
  @SeedSwaggerDocs.clearAllData()
  async clearAllData() {
    await this.seedService.clearAllData();
    return {
      success: true,
      message: 'Данные успешно очищены',
    };
  }

  @Get('stats')
  @SeedSwaggerDocs.getSeedingStats()
  async getSeedingStats() {
    const stats = await this.seedService.getSeedingStats();
    return {
      success: true,
      stats,
    };
  }

  @Get('admin-id')
  @SeedSwaggerDocs.getAdminId()
  async getAdminId() {
    const adminId = this.seedService.getAdminId();
    const adminExists = await this.seedService.checkAdminExists();

    return {
      success: true,
      adminId,
      adminExists,
    };
  }
}
