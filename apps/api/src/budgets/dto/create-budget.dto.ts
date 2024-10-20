import {
  IsDateString,
  IsInt,
  IsPositive,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateBudgetDto {
  @IsString()
  @MinLength(4)
  name: string;

  @IsPositive()
  max_amount: number;

  @IsDateString()
  end_date: Date;

  @IsInt()
  @IsPositive()
  category: number;
}
