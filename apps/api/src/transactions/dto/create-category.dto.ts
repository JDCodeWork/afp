import { IsIn, IsString } from 'class-validator';

export class createCategoryDto {
  @IsString()
  name: string;

  @IsString()
  @IsIn(['expense', 'income'])
  type: 'expense' | 'income';
}
