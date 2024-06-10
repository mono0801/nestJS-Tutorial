import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from './entities/movie.entity';

@Injectable()
export class MoviesService {
  private movies: Movie[] = [];

  getAll(): Movie[] {
    return this.movies;
  }

  getOne(id: number): Movie {
    // +id -> string 데이터를 number로 전환 (parseInt()와 같음)
    const movie = this.movies.find((movie) => movie.id == id);

    if (!movie) {
      throw new NotFoundException(`Movie ID - ${id} Not Fount`);
    }

    return movie;
  }

  deleteOne(id: number): Boolean {
    this.getOne(id);
    this.movies = this.movies.filter((movie) => movie.id != id);
    return true;
  }

  deleteAll(): Movie[] {
    return (this.movies = []);
  }

  create(movieData: CreateMovieDto): Boolean {
    this.movies.push({
      id: this.movies.length + 1,
      ...movieData,
    });
    return true;
  }

  update(id: number, movieData: UpdateMovieDto): Boolean {
    const movie = this.getOne(id);

    this.movies.find((movie) => movie.id == id).title = movieData.title
      ? movieData.title
      : movie.title;
    this.movies.find((movie) => movie.id == id).year = movieData.year
      ? movieData.year
      : movie.year;
    this.movies.find((movie) => movie.id == id).genres = movieData.genres
      ? movieData.genres
      : movie.genres;

    return true;
  }
}
