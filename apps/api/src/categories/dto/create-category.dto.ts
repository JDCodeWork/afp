import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsString } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({
    description: 'The name of the category.',
    example: 'Groceries',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'The type of the category.',
    example: 'expense',
    enum: ['expense', 'income', 'goal'],
  })
  @IsString()
  @IsIn(['expense', 'income', 'goal'])
  type: 'expense' | 'income' | 'goal';
}
