import {
  IsBoolean,
  IsDateString,
  IsInt,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTransactionDto {
  @ApiProperty({
    description: 'The amount of the transaction. Must be a positive number.',
    example: 150.75,
  })
  @IsPositive()
  amount: number;

  @ApiProperty({
    description: 'An optional note describing the transaction.',
    example: 'Payment for groceries',
    required: false,
  })
  @IsOptional()
  @IsString()
  note?: string;

  @ApiProperty({
    description:
      'ID of the category associated with the transaction. Must be a positive integer.',
    example: 1,
  })
  @IsInt()
  @IsPositive()
  category: number;

  @ApiProperty({
    description:
      'Indicates whether the transaction is scheduled. Default is false.',
    example: false,
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  isScheduled?: boolean;

  @ApiProperty({
    description: 'Timestamp when the transaction was created. Optional.',
    example: '2024-01-01T12:00:00Z',
    required: false,
  })
  @IsOptional()
  @IsDateString()
  create_at?: Date;
}
