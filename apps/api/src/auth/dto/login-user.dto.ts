import { IsEmail, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginUserDto {
  @ApiProperty({
    description: 'The email address of the user. Must be a valid email format.',
    example: 'example@email.test',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description:
      'The password for user authentication. Must be at least 8 characters long.',
    minLength: 8,
    example: 'SecurePassword123!',
  })
  @IsString()
  @MinLength(8)
  password: string;
}
