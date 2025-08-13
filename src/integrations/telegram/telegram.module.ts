import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TelegramService } from './telegram.service';

/**
 * Telegram Bot integration module
 *
 * Provides Telegram Bot functionality for messaging and notifications
 * Includes Telegram service for bot commands and webhook handling
 *
 * @example
 * // Import in app.module.ts
 * imports: [TelegramModule]
 *
 * @example
 * // Use in service
 * constructor(private telegramService: TelegramService) {}
 */
@Module({
  imports: [ConfigModule],
  providers: [TelegramService],
  exports: [TelegramService],
})
export class TelegramModule {}
