import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

// bootstrap() 함수 이름은 바꿔도 상관없다
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
