import {
  IsDate,
  IsDateString,
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

  @IsString()
  category: string;

  @IsOptional()
  @IsDateString()
  create_at: Date;
}
