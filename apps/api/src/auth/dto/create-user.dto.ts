import {
  IsEmail,
  IsIn,
  IsOptional,
  IsString,
  IsStrongPassword,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ValidRoles } from '../interfaces/valid-roles';

export class CreateUserDto {
  @ApiProperty({
    description: 'The name of the user, must be at least 6 characters long.',
    minLength: 6,
    example: 'John Doe',
  })
  @IsString()
  @MinLength(6)
  name: string;

  @ApiProperty({
    description: 'The email address of the user. Must be a valid email format.',
    example: 'example@email.test',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description:
      'User password. If provided, must meet strong password requirements.',
    minLength: 8,
    example: 'StrongPassword123',
    required: false,
  })
  @IsOptional()
  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minNumbers: 1,
    minUppercase: 1,
    minSymbols: 0,
  })
  password?: string;

  @ApiProperty({
    description: 'The login type for the user. Currently supports "email".',
    enum: ['email'], // TODO: implement login by Google
    required: false,
  })
  @IsOptional()
  @IsString()
  @IsIn(['email'])
  loginType?: string;

  @ApiProperty({
    description: 'The rol of the user. Default is "user".',
    enum: ValidRoles,
    required: false,
  })
  @IsOptional()
  @IsString()
  @IsIn([ValidRoles])
  role?: string;
}
