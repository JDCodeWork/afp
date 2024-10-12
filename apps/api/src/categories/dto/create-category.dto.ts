import { IsIn, IsString } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  name: string;

  @IsString()
  @IsIn(['expense', 'income'])
  type: 'expense' | 'income';
}
