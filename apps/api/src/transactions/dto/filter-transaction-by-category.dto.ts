import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsOptional, IsString } from 'class-validator';

export class FilterTransactionByCategoryDto {
  @ApiProperty({
    description:
      'Type of transaction to filter by. Can be "income" or "expense".',
    example: 'income',
    required: false,
  })
  @IsOptional()
  @IsString()
  @IsIn(['income', 'expense'])
  type?: string;

  @ApiProperty({
    description: 'Name of the category to filter transactions by.',
    example: 'Groceries',
    required: false,
  })
  @IsOptional()
  @IsString()
  name?: string; // name of category
}
