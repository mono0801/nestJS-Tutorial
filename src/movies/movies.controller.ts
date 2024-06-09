import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { Movie } from './entities/movie.entity';
import { MoviesService } from './movies.service';

interface IMovieData {
  title: string;
  year: number;
  genres: string[];
}

// @Controller('movies') -> app.use('/movies')
@Controller('movies')
export class MoviesController {
  // movies.service를 사용하기 위해 node.JS처럼 import를 쓰지 않는다
  // constructor는 MoviesService 클래스를 상속받는다
  constructor(private readonly moviesService: MoviesService) {}

  // /movies에 접속 시 실행
  @Get()
  getAll(): Movie[] {
    return this.moviesService.getAll();
  }

  @Get(':id(\\d+)')
  // 파라미터의 id 데이터를 'movieId'라는 string 타입 변수에 저장
  getOne(@Param('id') movieId: string): Movie {
    return this.moviesService.getOne(movieId);
  }

  @Post()
  // @Body == req.body : json과 같은 post를 통해 전송한 데이터를 가져올 때 사용
  createMovie(@Body() movieData: IMovieData) {
    // 가져온 데이터가 json 타입이면 자동으로 json으로 인식한다
    // express 처럼 json을 인식하기 위해 사전 설정을 안해도 된다
    return this.moviesService.create(movieData);
  }

  @Delete(':id(\\d+)')
  removeMovie(@Param('id') movieId: string) {
    return this.moviesService.deleteOne(movieId);
  }

  // 특정 리소스만 업데이트
  @Patch(':id(\\d+)')
  // id 파라미터와 Body의 데이터를 같이 가져오기
  updateMovie(@Param('id') movieId: string, @Body() updateData: IMovieData) {
    return this.moviesService.update(movieId, updateData);
  }

  // 모든 리소스 업데이트
  @Put()
  updateAllMovie() {
    return `This will update All Movies`;
  }

  @Get('search')
  // @Query() : url의 쿼리를 가져옴
  searchMovie(@Query('year') searchYear: number) {
    return `We are searching for a movie made after : ${searchYear}`;
  }
}
