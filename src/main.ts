import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AllExceptionsFilter } from './all-exceptions.filter';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //* jika ingin menggunakna custom logger secara global
  // const app = await NestFactory.create(AppModule, {
  //   bufferLogs: true,
  // });

  // Untuk menambahkan logger secara global
  // app.useLogger(app.get(MyLoggerService));

  // untuk filter exception
  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));

  app.enableCors();

  // Untuk membuat semua request harus masuk dengan prefix yaitu /api diawalnya
  app.setGlobalPrefix('api');

  await app.listen(3000);
}
bootstrap();
