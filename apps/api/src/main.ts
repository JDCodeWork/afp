import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const logger = new Logger('Bootstrap');

  app.setGlobalPrefix('api');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('AFP')
    .setDescription(
      'Aplicación de finanzas personales diseñada para ayudar a los usuarios a gestionar sus finanzas de manera intuitiva y eficiente. Ofrece herramientas para el control de presupuestos, metas de ahorro, gastos recurrentes y transacciones.',
    )
    .setVersion('1.0')
    .addTag(
      'auth',
      'Endpoints relacionados con la autenticación de usuarios, incluyendo inicio de sesión y registro.',
    )
    //TODO .addTag(
    //   'users',
    //   'Endpoints para la gestión de información de los usuarios, como creación, modificación y eliminación de cuentas.',
    // )
    .addTag(
      'transactions',
      'Endpoints para el manejo de transacciones, permitiendo a los usuarios registrar ingresos y gastos.',
    )
    .addTag(
      'budgets',
      'Endpoints que permiten la creación y gestión de presupuestos, ayudando a los usuarios a controlar sus gastos.',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(process.env.PORT);

  logger.log(`App running on por ${process.env.PORT}`);
}

bootstrap();
