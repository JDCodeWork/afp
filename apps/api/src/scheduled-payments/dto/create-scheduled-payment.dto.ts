import {
  IsDateString,
  IsIn,
  IsInt,
  IsPositive,
  IsString,
  MinLength,
} from 'class-validator';
import { Frequencies, Frequency } from '../constants/frequencies.constant';

export class CreateScheduledPaymentDto {
  @IsString()
  @IsIn(Frequencies)
  frequency: Frequency;

  @IsPositive()
  amount: number;

  @IsDateString()
  next: Date;

  @IsPositive()
  @IsInt()
  category: number;

  @IsString()
  @MinLength(4)
  note: string;
}
