import { IsPositive, IsString, MinLength } from 'class-validator';

export class CreateGoalDto {
  @IsString()
  @MinLength(4)
  name: string;

  @IsPositive()
  target_amount: number;
}
