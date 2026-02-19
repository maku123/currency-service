import { IsString, IsNotEmpty, Length } from 'class-validator';

export class LatestRatesDto {
  @IsString()
  @IsNotEmpty()
  @Length(3, 3)
  base: string;
}