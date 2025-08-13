import { ConfigService } from '@nestjs/config';
import { EnvKeys, EnvSchema } from 'src/config';

/**
 * Email configuration factory
 *
 * Creates email service configuration options
 * Includes SMTP settings, API keys, and email templates
 *
 * @param configService - NestJS ConfigService instance
 * @returns Email configuration options
 *
 * @example
 * // Use in email.module.ts
 * EmailModule.forRootAsync({
 *   imports: [ConfigModule],
 *   useFactory: getEmailConfig,
 *   inject: [ConfigService]
 * })
 */
export function getEmailConfig(configService: ConfigService<EnvSchema>) {
  return {
    // SMTP Configuration
    host: configService.get<string>(EnvKeys.SMTP_HOST, 'smtp.gmail.com'),
    port: configService.get<number>(EnvKeys.SMTP_PORT, 587),
    secure: configService.get<boolean>(EnvKeys.SMTP_SECURE, false),
    auth: {
      user: configService.get<string>(EnvKeys.SMTP_USER),
      pass: configService.get<string>(EnvKeys.SMTP_PASS),
    },
    // Email Configuration
    from: configService.get<string>(
      EnvKeys.EMAIL_FROM,
      'noreply@space4quiz.com'
    ),
    replyTo: configService.get<string>(EnvKeys.EMAIL_REPLY_TO),
    // Template Configuration
    templateDir: configService.get<string>(
      EnvKeys.EMAIL_TEMPLATE_DIR,
      './templates/emails'
    ),
  };
}
