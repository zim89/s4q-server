import { ConfigService } from '@nestjs/config';
import { envKeys, EnvSchema } from 'src/config';

/**
 * Stripe configuration factory
 *
 * Creates Stripe service configuration options
 * Includes API keys, webhook settings, and payment configuration
 *
 * @param configService - NestJS ConfigService instance
 * @returns Stripe configuration options
 *
 * @example
 * // Use in stripe.module.ts
 * StripeModule.forRootAsync({
 *   imports: [ConfigModule],
 *   useFactory: getStripeConfig,
 *   inject: [ConfigService]
 * })
 */
export function getStripeConfig(configService: ConfigService<EnvSchema>) {
  return {
    // API Configuration
    publishableKey: configService.get<string>(envKeys.STRIPE_PUBLISHABLE_KEY),
    secretKey: configService.get<string>(envKeys.STRIPE_SECRET_KEY),
    // Webhook Configuration
    webhookSecret: configService.get<string>(envKeys.STRIPE_WEBHOOK_SECRET),
    // Payment Configuration
    currency: configService.get<string>(envKeys.STRIPE_CURRENCY, 'usd'),
    paymentMethods: configService.get<string[]>(
      envKeys.STRIPE_PAYMENT_METHODS,
      ['card', 'sepa_debit']
    ),
    // Subscription Configuration
    defaultTrialDays: configService.get<number>(
      envKeys.STRIPE_DEFAULT_TRIAL_DAYS,
      7
    ),
    // Feature flags
    enableSubscriptions: configService.get<boolean>(
      envKeys.STRIPE_ENABLE_SUBSCRIPTIONS,
      true
    ),
    enableOneTimePayments: configService.get<boolean>(
      envKeys.STRIPE_ENABLE_ONE_TIME_PAYMENTS,
      true
    ),
  };
}
