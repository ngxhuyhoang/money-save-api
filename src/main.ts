import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { BadRequestException, ValidationPipe, VersioningType } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import helmet from 'helmet';
import { TransformInterceptor } from '@interceptors/transform.interceptor';
import * as compression from 'compression';
import { JwtAuthGuard } from '@guards/jwt-auth.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const reflector = app.get(Reflector);

  app.enableCors();
  app.use(helmet());
  app.use(compression());
  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (errors) => {
        const result = errors.map((error) => error.constraints[Object.keys(error.constraints)[0]]);
        const messageJoined = result.join(', ');
        return new BadRequestException(messageJoined);
      },
    }),
  );
  app.useGlobalGuards(new JwtAuthGuard(reflector));
  app.useGlobalInterceptors(new TransformInterceptor(reflector));
  app.enableVersioning({ type: VersioningType.URI, defaultVersion: '1.0' });

  const configService = app.get(ConfigService);

  const config = new DocumentBuilder()
    .setTitle('Web API Quản lý chi tiêu cá nhân Docs')
    .setDescription('Project về quản lý chi tiêu cá nhân')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document, {
    explorer: true,
    // swaggerOptions: {
    //   urls: [
    //     {
    //       url: 'http://localhost:4200/swagger-ui.html',
    //       name: 'v1',
    //     },
    //     {
    //       url: 'http://localhost:4200/api/docs',
    //       name: 'v2',
    //     },
    //   ],
    // },
  });

  const port = configService.get('PORT');
  const env = configService.get('NODE_ENV');

  await app.listen(port, () => {
    console.info(`Environment: ${env}`);
    console.info(`Server is running on http://localhost:${port}`);
    console.info(`Swagger docs http://localhost:${port}/docs`);
  });
}

bootstrap();
