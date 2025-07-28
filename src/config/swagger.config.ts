import type { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

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
