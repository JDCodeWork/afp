import { IsIn, IsString } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  name: string;

  @IsString()
  @IsIn(['expense', 'income', 'goal'])
  type: 'expense' | 'income' | 'goal';
}
