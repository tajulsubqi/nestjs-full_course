import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  // Untuk membuat semua request harus masuk dengan prefix yaitu /api diawalnya
  app.setGlobalPrefix('api');

  await app.listen(3000);
}
bootstrap();
