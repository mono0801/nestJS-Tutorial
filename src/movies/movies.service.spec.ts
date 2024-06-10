// {해당 파일 이름}.spec.ts 파일은 해당 파일을 단위 테스팅 하기 위한 파일이다
import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';

describe('MoviesService', () => {
  let service: MoviesService;

  // 테스트를 실행하기 전에 미리 실행할 것 정의
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);

    // 테스트 하기 전 테스트용 데이터 객체 생성
    service.create({
      title: 'Test',
      genres: ['test'],
      year: 2024,
    });
  });

  // afterAll() : 테스팅을 한 후에 실행할 함수 정의 (테스트 한 후 DB를 초기화하도록 세팅)

  it('should be defined', () => {
    // service라는 class에 대해 정의가 제대로 되어 있기를 기대(expect)한다는 조건문
    expect(service).toBeDefined();
  });

  // 테스팅 하고자 하는 함수를 테스트 해주는 조건을 정의해야한다
  it('should be 4', () => {
    expect(2 + 3).toEqual(5);
  });

  // MovieService의 getAll() 함수 단위 테스팅
  describe('UnitTest : getAll', () => {
    // getAll() 함수가 배열을 리턴하는지 검사
    it('Should Be returned an Array', () => {
      // getAll()의 결과값을 저장
      const result = service.getAll();
      // 해당 결과값이 배열인지 검사
      expect(result).toBeInstanceOf(Array);
    });
  });

  describe('UnitTest : getOne', () => {
    it('Should Be returned a Movie', () => {
      // 테스트 때는 Movie 데이터가 없으므로 임시로 객체를 생성
      /*       service.create({
        title: 'Test',
        genres: ['test'],
        year: 2024,
      }); */

      const movie = service.getOne(1);
      expect(movie).toBeDefined();
      expect(movie.id).toEqual(1);
    });

    it('Should Be Throw 404 Error', () => {
      try {
        service.getOne(0);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.message).toEqual('Movie ID - 0 Not Fount');
      }
    });
  });

  describe('UnitTest : Create', () => {
    it('Should Be Created a Movie', () => {
      const beforeCreate = service.getAll().length;
      service.create({
        title: 'Test',
        genres: ['test'],
        year: 2024,
      });
      const afterCreate = service.getAll().length;

      expect(afterCreate).toBeGreaterThan(beforeCreate);
    });
  });

  describe('UnitTest : deleteOne', () => {
    it('Should Be Deleted a Movie', () => {
      const beforeDelete = service.getAll().length;
      service.deleteOne(1);
      const afterDelete = service.getAll().length;

      expect(afterDelete).toBeLessThan(beforeDelete);
    });

    it('Should be returned 404', () => {
      try {
        service.deleteOne(0);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.message).toEqual('Movie ID - 0 Not Fount');
      }
    });
  });

  describe('UnitTest : Update', () => {
    it('Should Be Updated a Movie', () => {
      const updateMovie = {
        title: 'Update',
        genres: ['update, test'],
        year: 2022,
      };
      service.update(1, updateMovie);

      const movie = service.getOne(1);

      expect(movie.id).toEqual(1);
      expect(movie.title).toEqual('Update');
      expect(movie.genres).toEqual(['update, test']);
      expect(movie.year).toEqual(2022);
    });

    it('Should be Throw NotFoundException', () => {
      try {
        service.update(0, {});
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.message).toEqual('Movie ID - 0 Not Fount');
      }
    });
  });
});
