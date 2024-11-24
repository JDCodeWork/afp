import { Controller, Get, Post, Body } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { Auth } from './decorators';

import { CreateUserDto, LoginUserDto } from './dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  @ApiResponse({
    status: 200,
    description: 'User logged in successfully.',
  })
  @ApiResponse({
    status: 401,
    description: 'Invalid credentials.',
  })
  signIn(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  @Post('register')
  @ApiResponse({
    status: 201,
    description: 'User registered successfully.',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request. Validation errors occurred.',
  })
  signUp(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  @Auth()
  @Get('check')
  checkToken() {
    return this.authService.checkStatus();
  }

  // TODO: Implement Google Sign-In and Sign-Up
}
