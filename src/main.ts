import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

<<<<<<< HEAD
    app.enableCors();
=======
    app.enableCors({
    origin: '*',
    methods: 'GET,POST,PUT,DELETE', 
    allowedHeaders: 'Content-Type, Accept, Authorization', 
  });
>>>>>>> b9b5eb547266dcb67d96a4e9b98454d4a841c56e
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
