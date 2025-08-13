import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { StripeService } from './stripe.service';

/**
 * Stripe payment integration module
 *
 * Provides Stripe functionality for payment processing
 * Includes Stripe service for payments, subscriptions, and webhooks
 *
 * @example
 * // Import in app.module.ts
 * imports: [StripeModule]
 *
 * @example
 * // Use in service
 * constructor(private stripeService: StripeService) {}
 */
@Module({
  imports: [ConfigModule],
  providers: [StripeService],
  exports: [StripeService],
})
export class StripeModule {}
