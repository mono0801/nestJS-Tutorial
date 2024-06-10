import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  // beforeEach() -> 각 describe()를 실핼할 때마다 모듈을 새로 선언하므로 DB가 초기화된다
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    // 테스팅 할 때도 Pipe와 같은 실제 환경을 똑같이 설정해야한다
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );

    await app.init();
  });

  // '/' root에 접근해서 200 status 코드와 Welcome to my Movie API를 응답해주는지 확인
  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Welcome to my Movie API');
  });

  describe('/movies', () => {
    it('GET', () => {
      // app.getHttpServer() -> localhost3000을 대신함
      return request(app.getHttpServer()).get('/movies').expect(200).expect([]);
    });

    it('POST', () => {
      // 새로 데이터가 생성될 때는 201 코드가 수신된다
      return request(app.getHttpServer())
        .post('/movies')
        .send({
          title: 'Test',
          genres: ['test'],
          year: 2024,
        })
        .expect(201);
    });

    it('POST 400', () => {
      // 새로 데이터가 생성될 때는 201 코드가 수신된다
      return request(app.getHttpServer())
        .post('/movies')
        .send({
          title: 'Test',
          genres: ['test'],
          year: 2024,
          wrong: 'error',
        })
        .expect(400);
    });

    it('DELETE', () => {
      request(app.getHttpServer()).delete('/movies').expect(200);
      return request(app.getHttpServer())
        .post('/movies')
        .send({
          title: 'Test',
          genres: ['test'],
          year: 2024,
        })
        .expect(201);
    });

    it('PATCH', () => {
      return request(app.getHttpServer()).patch('/movies').expect(404);
    });
  });

  describe('movies/:id', () => {
    // it.todo() : 모듈을 구현한 후 어떤 기능을 테스팅을 해야 하는지 선언
    it('GET', () => {
      // beforeAll() -> /movies 테스트 때 생성한 test Movie 객체가 남아있다
      return request(app.getHttpServer()).get('/movies/1').expect(200);
    });

    it('GET 404', () => {
      return request(app.getHttpServer()).get('/movies/0').expect(404);
    });

    it('PATCH', () => {
      return request(app.getHttpServer())
        .patch('/movies/1')
        .send({ title: 'Update' })
        .expect(200);
    });

    it('PATCH 404', () => {
      return request(app.getHttpServer())
        .patch('/movies/0')
        .send({ title: 'Update' })
        .expect(404);
    });

    it('PATCH 400', () => {
      return request(app.getHttpServer())
        .patch('/movies/1')
        .send({ wrong: 'Error' })
        .expect(400);
    });

    it('DELETE', () => {
      return request(app.getHttpServer()).delete('/movies/1').expect(200);
    });

    it('DELETE 404', () => {
      return request(app.getHttpServer()).delete('/movies/0').expect(404);
    });
  });
});
