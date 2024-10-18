import { Type } from 'class-transformer';
import { IsIn, IsInt, IsOptional, IsPositive, IsString } from 'class-validator';

export class FilterTransactionByCategoryDto {
  @IsOptional()
  @IsString()
  @IsIn(['income', 'expense'])
  type?: string;

  @IsOptional()
  @IsString()
  name?: string; // name of category
}
