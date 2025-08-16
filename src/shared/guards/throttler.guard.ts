import { Injectable } from '@nestjs/common';
import { ThrottlerGuard } from '@nestjs/throttler';

/**
 * Глобальный Rate Limiting Guard
 *
 * Защищает все endpoints от DDoS атак
 * Ограничивает количество запросов с одного IP
 *
 * Настройки:
 * - 100 запросов в минуту с одного IP
 * - При превышении лимита возвращает 429 Too Many Requests
 */
@Injectable()
export class AppThrottlerGuard extends ThrottlerGuard {
  protected getTracker(req: Record<string, unknown>): Promise<string> {
    // Используем IP адрес как трекер для rate limiting
    const ips = req.ips as string[];
    return Promise.resolve(ips?.length ? ips[0] : (req.ip as string));
  }
}
