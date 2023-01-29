import { INestApplication, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function configureApp(app: INestApplication): void {
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  setupSwagger(app);
}

function setupSwagger(app: INestApplication) {
  const configService = app.get(ConfigService);
  const showDocs = configService.get('general.showDocs');
  const allowedOrigins: string[] = configService.get('general.allowedOrigins');

  app.setGlobalPrefix('api');
  app.enableCors({ origin: allowedOrigins });

  if (!showDocs) {
    return;
  }

  const options = new DocumentBuilder()
    .setTitle('Bla-Bla Volunteering Microservice')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);

  SwaggerModule.setup('docs', app, document);
}
