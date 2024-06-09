import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello Nest!';
  }

  getEveryone(): string {
    return 'Hello everyone!';
  }
}
