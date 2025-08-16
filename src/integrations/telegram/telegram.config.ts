import { ConfigService } from '@nestjs/config';
import { envKeys, EnvSchema } from 'src/config';

/**
 * Telegram Bot configuration factory
 *
 * Creates Telegram Bot service configuration options
 * Includes bot token, webhook settings, and bot configuration
 *
 * @param configService - NestJS ConfigService instance
 * @returns Telegram Bot configuration options
 *
 * @example
 * // Use in telegram.module.ts
 * TelegramModule.forRootAsync({
 *   imports: [ConfigModule],
 *   useFactory: getTelegramConfig,
 *   inject: [ConfigService]
 * })
 */
export function getTelegramConfig(configService: ConfigService<EnvSchema>) {
  return {
    // Bot Configuration
    token: configService.get<string>(envKeys.TELEGRAM_BOT_TOKEN),
    username: configService.get<string>(envKeys.TELEGRAM_BOT_USERNAME),
    // Webhook Configuration
    webhookUrl: configService.get<string>(envKeys.TELEGRAM_WEBHOOK_URL),
    webhookSecret: configService.get<string>(envKeys.TELEGRAM_WEBHOOK_SECRET),
    // Bot Settings
    enableWebhook: configService.get<boolean>(
      envKeys.TELEGRAM_ENABLE_WEBHOOK,
      true
    ),
    enablePolling: configService.get<boolean>(
      envKeys.TELEGRAM_ENABLE_POLLING,
      false
    ),
    // Message Configuration
    defaultParseMode: configService.get<'HTML' | 'Markdown' | 'MarkdownV2'>(
      envKeys.TELEGRAM_DEFAULT_PARSE_MODE,
      'HTML'
    ),
    // Feature flags
    enableNotifications: configService.get<boolean>(
      envKeys.TELEGRAM_ENABLE_NOTIFICATIONS,
      true
    ),
    enableCommands: configService.get<boolean>(
      envKeys.TELEGRAM_ENABLE_COMMANDS,
      true
    ),
  };
}
