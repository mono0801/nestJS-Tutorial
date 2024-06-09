import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MoviesController } from './movies/movies.controller';
import { MoviesService } from './movies/movies.service';

// @ 데코레이터 : 클래스에 함수 기능을 추가해 줌
@Module({
  imports: [],
  // controllers : node.JS의 router 역할 -> 해당 url에 접속하면 함수 실행 해줌
  controllers: [AppController, MoviesController],
  // providers : node.JS의 controller 역할 -> 실제로 실행 될 함수를 정의
  providers: [AppService, MoviesService],
})
// AppModule이 루트 모듈이다
export class AppModule {}
