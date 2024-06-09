import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // express의 router.get() 역할
  // 데코레이터는 꾸며주는 함수 & 클래스랑 붙어있어야한다
  @Get()
  getHello(): string {
    // nestJS에선 콘트롤러와 비즈니스 로직을 분리한다
    // Controller -> 헤당 url로 가면 함수를 실행
    // Service -> 실행할 함수를 정의
    return this.appService.getHello();
  }

  @Get('/hello')
  sayHello(): string {
    return this.appService.getEveryone();
  }
}
