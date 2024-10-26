import {
  IsBoolean,
  IsDateString,
  IsInt,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

export class CreateTransactionDto {
  @IsPositive()
  amount: number;

  @IsOptional()
  @IsString()
  note: string;

  @IsInt()
  @IsPositive()
  category: number;

  @IsOptional()
  @IsBoolean()
  isScheduled?: boolean;

  @IsOptional()
  @IsDateString()
  create_at?: Date;
}
