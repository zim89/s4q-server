import { ConfigService } from '@nestjs/config';
import { envKeys, EnvSchema } from 'src/config';

/**
 * AWS S3 configuration factory
 *
 * Creates S3 service configuration options
 * Includes AWS credentials, bucket settings, and region configuration
 *
 * @param configService - NestJS ConfigService instance
 * @returns S3 configuration options
 *
 * @example
 * // Use in s3.module.ts
 * S3Module.forRootAsync({
 *   imports: [ConfigModule],
 *   useFactory: getS3Config,
 *   inject: [ConfigService]
 * })
 */
export function getS3Config(configService: ConfigService<EnvSchema>) {
  return {
    // AWS Configuration
    region: configService.get<string>(envKeys.AWS_REGION, 'us-east-1'),
    credentials: {
      accessKeyId: configService.get<string>(envKeys.AWS_ACCESS_KEY_ID),
      secretAccessKey: configService.get<string>(envKeys.AWS_SECRET_ACCESS_KEY),
    },
    // S3 Configuration
    bucket: configService.get<string>(envKeys.S3_BUCKET_NAME),
    endpoint: configService.get<string>(envKeys.S3_ENDPOINT), // For custom endpoints (e.g., DigitalOcean Spaces)
    // Upload Configuration
    maxFileSize: configService.get<number>(
      envKeys.S3_MAX_FILE_SIZE,
      10 * 1024 * 1024
    ), // 10MB
    allowedMimeTypes: configService.get<string[]>(
      envKeys.S3_ALLOWED_MIME_TYPES,
      ['image/jpeg', 'image/png', 'image/gif', 'application/pdf']
    ),
  };
}
