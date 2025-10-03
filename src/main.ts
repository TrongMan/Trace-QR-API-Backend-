import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Bật global validation cho DTO
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,      // loại bỏ field thừa
      forbidNonWhitelisted: true, // báo lỗi nếu gửi field không có trong DTO
      transform: true,      // tự động convert kiểu (string -> number, v.v.)
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
