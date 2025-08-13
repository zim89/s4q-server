import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { S3Service } from './s3.service';

/**
 * AWS S3 integration module
 *
 * Provides S3 functionality for file storage
 * Includes S3 service for file upload/download operations
 *
 * @example
 * // Import in app.module.ts
 * imports: [S3Module]
 *
 * @example
 * // Use in service
 * constructor(private s3Service: S3Service) {}
 */
@Module({
  imports: [ConfigModule],
  providers: [S3Service],
  exports: [S3Service],
})
export class S3Module {}
