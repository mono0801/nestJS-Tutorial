import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

// bootstrap() 함수 이름은 바꿔도 상관없다
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // express의 middleware와 같은 역할
  app.useGlobalPipes(
    new ValidationPipe({
      // DTO에 decorator가 설정되지 않은 데이터 입력 시 해당 데이터를 삭제하고 전송한다
      whitelist: true,
      // decorator가 설정되지 않은 데이터 입력 시 Error MSG를 전송한다
      forbidNonWhitelisted: true,
      // client에서 전송한 데이터를 controller에 설정된 데이터 타입으로 변환해준다
      transform: true,
    }),
  );

  await app.listen(3000);
}
bootstrap();
