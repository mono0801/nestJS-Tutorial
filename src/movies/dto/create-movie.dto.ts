import { IsNumber, IsOptional, IsString } from 'class-validator';

// DTO : Dta Transfer Object - 데이터 전송 객체
export class CreateMovieDto {
  @IsString()
  readonly title: string;

  @IsNumber()
  readonly year: number;

  // 문자열 배열의 각 요소를 하나씩 검사
  @IsString({ each: true })
  // 해당 데이터는 없어도 에러가 안뜨게 된다
  @IsOptional()
  readonly genres: string[];
}
