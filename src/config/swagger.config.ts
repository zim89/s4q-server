import type { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

/**
 * Swagger documentation setup function
 *
 * Configures and sets up Swagger/OpenAPI documentation for the application
 * Includes API metadata, authentication, and UI configuration
 *
 * @param app - NestJS application instance
 *
 * @example
 * // Use in main.ts
 * setupSwaggerDocs(app);
 *
 * @example
 * // Access documentation
 * // Available at: http://localhost:3001/api-docs
 */
export function setupSwaggerDocs(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('Space4Quiz API')
    .setDescription('API documentation for Space4Quiz')
    .setVersion('1.0.0')
    .setContact('zim89', 'https://github.com/zim89', 'zi89.dev@gmail.com')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
    jsonDocumentUrl: '/api-docs/swagger.json',
    yamlDocumentUrl: '/api-docs/swagger.yaml',
    // swaggerUrl: '/swagger.json',
  });
}
