import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { VersionService } from 'src/shared/services';

/**
 * Основной контроллер приложения
 *
 * Предоставляет базовые endpoints для мониторинга:
 * - health - проверка состояния приложения
 * - info - информация о приложении
 * - version - версия приложения
 */
@ApiTags('App')
@Controller()
export class AppController {
  constructor(private readonly versionService: VersionService) {}
  /**
   * Расширенная проверка состояния приложения
   *
   * Возвращает детальную информацию о состоянии:
   * - Статус приложения
   * - Время работы (uptime)
   * - Окружение (development/production)
   * - Версия
   * - Временная метка
   */
  @Get('health')
  healthCheck() {
    return this.versionService.getHealthInfo();
  }

  /**
   * Информация о приложении
   *
   * Возвращает основную информацию:
   * - Название приложения
   * - Версия
   * - Окружение
   * - Статус базы данных
   */
  @Get('info')
  getAppInfo() {
    return this.versionService.getAppInfo();
  }

  /**
   * Версия приложения
   *
   * Простой endpoint для получения версии
   */
  @Get('version')
  version() {
    return this.versionService.getVersionInfo();
  }
}
