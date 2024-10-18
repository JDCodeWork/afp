import { Type } from 'class-transformer';
import {
  IsDateString,
  IsInt,
  IsNumber,
  IsOptional,
  IsPositive,
} from 'class-validator';

export class FilterTransactionByTransactionDto {
  @IsOptional()
  @IsNumber()
  @IsPositive()
  @Type(() => Number)
  amount?: number;

  @IsOptional()
  @IsDateString()
  createAt?: string;

  //TODO: make greaterThan and lowerThan
}
