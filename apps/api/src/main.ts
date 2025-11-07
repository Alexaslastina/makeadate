import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app/app.module';
import { AppLoggerService } from './app/logger';
import { HttpLoggerInterceptor } from './app/logger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  // Get custom logger instance
  const logger = app.get(AppLoggerService);
  logger.setContext('Bootstrap');
  app.useLogger(logger);

  // Global HTTP logging interceptor
  app.useGlobalInterceptors(new HttpLoggerInterceptor(logger));

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);

  // Swagger configuration
  const config = new DocumentBuilder()
    .setTitle('MakeADate API')
    .setDescription('The MakeADate API documentation')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  const port = process.env.PORT ? Number(process.env.PORT) : 3001;
  await app.listen(port, '0.0.0.0'); // Listen on all interfaces for mobile access

  logger.log(`🚀 Application is running on: http://0.0.0.0:${port}/${globalPrefix}`);
  logger.log(`📚 Swagger API documentation: http://0.0.0.0:${port}/api/docs`);
  logger.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  logger.log(`Log Level: ${process.env.LOG_LEVEL || 'LOG'}`);
}
bootstrap();

