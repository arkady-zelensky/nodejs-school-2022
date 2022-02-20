import { INestApplication, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function configureApp(app: INestApplication): void {
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));

  app.setGlobalPrefix('api');
  setupSwagger(app);
}

function setupSwagger(app: INestApplication) {
  const configService = app.get(ConfigService);
  if (!configService.get('api.showDocs')) {
    return;
  }

  const config = new DocumentBuilder()
    .setTitle('NestJS server example')
    .setDescription('This is NestJS server example')
    .addBearerAuth()
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
}
