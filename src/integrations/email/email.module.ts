import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EmailService } from './email.service';

/**
 * Email integration module
 *
 * Provides email functionality for the application
 * Includes email service for sending transactional emails
 *
 * @example
 * // Import in app.module.ts
 * imports: [EmailModule]
 *
 * @example
 * // Use in service
 * constructor(private emailService: EmailService) {}
 */
@Module({
  imports: [ConfigModule],
  providers: [EmailService],
  exports: [EmailService],
})
export class EmailModule {}
