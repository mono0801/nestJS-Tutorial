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
  Req,
} from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from './entities/movie.entity';
import { MoviesService } from './movies.service';

// @Controller('movies') -> app.use('/movies')
@Controller('movies')
export class MoviesController {
  // 의존성 주입
  // movies.service를 사용하기 위해 node.JS처럼 import를 쓰지 않는다
  // constructor는 MoviesService 클래스를 상속받는다
  constructor(private readonly moviesService: MoviesService) {}

  // /movies에 접속 시 실행
  // nestJS는 express 위에서 구동하므로 res, req 객체를 사용할 수 있다 -> @Res() res, @Req() req (데코레이터를 이용)
  // 하지만 fastify 위에서도 구동이 되므로 express에서만 사용하는 res,req 객체를 사용하는 것은 지양한다
  @Get()
  getAll(@Req() req): Movie[] {
    console.log(req.body);
    return this.moviesService.getAll();
  }

  @Get(':id(\\d+)')
  // 파라미터의 id는 string이다
  // 파라미터의 id 데이터를 'movieId'라는 number 타입 변수에 저장
  getOne(@Param('id') movieId: number): Movie {
    console.log(movieId);
    return this.moviesService.getOne(movieId);
  }

  @Post()
  // @Body == req.body : json과 같은 post를 통해 전송한 데이터를 가져올 때 사용
  createMovie(@Body() movieData: CreateMovieDto) {
    // 가져온 데이터가 json 타입이면 자동으로 json으로 인식한다
    // express 처럼 json을 인식하기 위해 사전 설정을 안해도 된다
    return this.moviesService.create(movieData);
  }

  @Delete()
  removeMovieALL() {
    return this.moviesService.deleteAll();
  }

  @Delete(':id(\\d+)')
  removeMovie(@Param('id') movieId: number) {
    return this.moviesService.deleteOne(movieId);
  }

  // 특정 리소스만 업데이트
  @Patch(':id(\\d+)')
  // id 파라미터와 Body의 데이터를 같이 가져오기
  updateMovie(
    @Param('id') movieId: number,
    @Body() updateData: UpdateMovieDto,
  ) {
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

  @Get('test/:id(\\d+)')
  test(@Param('id') id: number) {
    return `Params : ${id}`;
  }
}
