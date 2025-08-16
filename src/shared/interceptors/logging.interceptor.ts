import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import type { Request, Response } from 'express';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

/**
 * Улучшенный Logging Interceptor
 *
 * Логирует все HTTP запросы с детальной информацией:
 * - Метод и URL
 * - Время выполнения
 * - Статус код
 * - IP адрес
 * - User-Agent
 */
@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger(LoggingInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const request = context.switchToHttp().getRequest<Request>();
    const response = context.switchToHttp().getResponse<Response>();
    const { method, originalUrl, ip } = request;
    const userAgent = request.get('User-Agent') ?? 'Unknown';
    const userAgentShort = userAgent.substring(0, 50);

    const start = Date.now();

    return next.handle().pipe(
      tap(() => {
        const duration = Date.now() - start;
        const { statusCode } = response;

        // 🟢 Успешные запросы (2xx, 3xx)
        if (statusCode < 400) {
          this.logger.log(
            `${method} ${originalUrl} ${statusCode} ${duration}ms - ${ip} - ${userAgentShort}`
          );
        }
        // 🟡 Клиентские ошибки (4xx)
        else if (statusCode < 500) {
          this.logger.warn(
            `${method} ${originalUrl} ${statusCode} ${duration}ms - ${ip} - ${userAgentShort}`
          );
        }
        // 🔴 Серверные ошибки (5xx)
        else {
          this.logger.error(
            `${method} ${originalUrl} ${statusCode} ${duration}ms - ${ip} - ${userAgentShort}`
          );
        }
      })
    );
  }
}
