import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

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
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: process.env.NODE_ENV ?? 'development',
      version: process.env.npm_package_version ?? '1.0.0',
      memory: {
        used: Math.round(process.memoryUsage().heapUsed / 1024 / 1024),
        total: Math.round(process.memoryUsage().heapTotal / 1024 / 1024),
      },
    };
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
    return {
      name: 'Space4Quiz API',
      version: process.env.npm_package_version ?? '1.0.0',
      environment: process.env.NODE_ENV ?? 'development',
      description: 'API для изучения языков с карточками',
      database: 'connected', // TODO: добавить проверку подключения к БД
      features: [
        'Authentication',
        'User Management',
        'Flashcards',
        'Study Sessions',
        'Progress Tracking',
      ],
    };
  }

  /**
   * Версия приложения
   *
   * Простой endpoint для получения версии
   */
  @Get('version')
  version() {
    return {
      version: process.env.npm_package_version ?? '1.0.0',
      build: process.env.BUILD_ID ?? 'local',
    };
  }
}
