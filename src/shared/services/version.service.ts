import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { APP_VERSION } from 'src/shared/constants';

/**
 * Сервис для работы с версиями приложения
 */
@Injectable()
export class VersionService {
  constructor(private readonly configService: ConfigService) {}
  /**
   * Получает версию приложения
   */
  getVersion(): string {
    return APP_VERSION;
  }

  /**
   * Получает информацию о приложении
   */
  getAppInfo() {
    return {
      name: 'Space4Quiz API',
      version: this.getVersion(),
      environment: this.configService.get<string>('NODE_ENV', 'development'),
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
   * Получает детальную информацию о состоянии
   */
  getHealthInfo() {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: this.configService.get<string>('NODE_ENV', 'development'),
      version: this.getVersion(),
      memory: {
        used: Math.round(process.memoryUsage().heapUsed / 1024 / 1024),
        total: Math.round(process.memoryUsage().heapTotal / 1024 / 1024),
      },
    };
  }

  /**
   * Получает информацию о версии
   */
  getVersionInfo() {
    return {
      version: this.getVersion(),
      build: this.configService.get<string>('BUILD_ID', 'local'),
    };
  }
}
