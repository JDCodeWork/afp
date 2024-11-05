import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { ErrorCodes } from '../common/interfaces/error-codes.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { LoginUserDto } from './dto/login-user.dto';
import { CommonService } from '../common/common.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly commonService: CommonService,
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * Registers a new user and generates a JWT token.
   * @param createUserDto - Data transfer object containing user information.
   * @returns An object containing the created user and a JWT token.
   */
  async register(createUserDto: CreateUserDto) {
    const { password, email } = createUserDto;

    // Hash the user's password before saving
    const salt = bcrypt.genSaltSync();
    createUserDto.password = bcrypt.hashSync(password, salt);

    // Create the user
    const user = await this.usersService.create(createUserDto);

    // Generate a JWT token for the user
    const token = this.jwtService.sign({ email });

    return {
      name: user.name,
      token,
    };
  }

  /**
   * Authenticates a user and returns a JWT token.
   * @param loginUserDto - Data transfer object containing login credentials.
   * @returns An object containing the user's name and a JWT token.
   */
  async login(loginUserDto: LoginUserDto) {
    const { email } = loginUserDto;

    // Find the user by email
    const user = await this.usersService.findOneByEmail(email);
    if (!user) this.commonService.handleErrors(ErrorCodes.CredentialsNotValid);

    // Check if the provided password matches the stored hashed password
    const isCorrectPassword = bcrypt.compareSync(
      loginUserDto.password,
      user.password,
    );

    if (!isCorrectPassword)
      this.commonService.handleErrors(ErrorCodes.CredentialsNotValid);

    // Generate a JWT token for the user
    const token = this.jwtService.sign({ email });

    return {
      name: user.name,
      token,
    };
  }

  /**
   * TODO: Implement forgotPassword functionality.
   * This method will handle password recovery for users.
   */
}
