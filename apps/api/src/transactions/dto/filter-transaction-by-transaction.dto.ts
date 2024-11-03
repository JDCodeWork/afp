import { Type } from 'class-transformer';
import {
  IsDateString,
  IsNumber,
  IsOptional,
  IsPositive,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class FilterTransactionByTransactionDto {
  @ApiProperty({
    description:
      'Optional amount to filter transactions. Must be a positive number.',
    example: 150.75,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  @IsPositive()
  @Type(() => Number)
  amount?: number;

  @ApiProperty({
    description:
      'Optional date to filter transactions by creation date. Format: YYYY-MM-DD.',
    example: '2024-01-01',
    required: false,
  })
  @IsOptional()
  @IsDateString()
  createAt?: string;

  // TODO: Implement greaterThan and lowerThan filters
}
