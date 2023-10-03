

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

/**
 * Bootstrap function to create and configure the NestJS application.
 */
async function bootstrap() {
  // Create the NestJS application instance
  const app = await NestFactory.create(AppModule);

  // Apply global validation pipe to validate incoming request data
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Remove unknown properties from DTOs
      forbidNonWhitelisted: true, // Throw error for unknown properties
    })
  );

  // Configure Swagger documentation
  const config = new DocumentBuilder()
    .setTitle('code-challenge') // Title of the API
    .setDescription('API description') // Description of the API
    .setVersion('1.0') // API version
    .addTag('geekbears') // Tag for grouping related endpoints
    .build();

  // Create Swagger document and setup Swagger UI
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // Start the NestJS application on port 3000
  await app.listen(3000);
}

// Bootstrap the NestJS application
bootstrap();
