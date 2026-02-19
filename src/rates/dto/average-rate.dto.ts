import {
    IsString,
    IsNotEmpty,
    Length,
    Matches,
  } from 'class-validator';
  
  export class AverageRateDto {
    @IsString()
    @IsNotEmpty()
    @Length(3, 3)
    base: string;
  
    @IsString()
    @IsNotEmpty()
    @Length(3, 3)
    target: string;
  
    @IsString()
    @Matches(/^\d+h$/, {
      message: 'period must be in format like 24h',
    })
    period: string;
  }  