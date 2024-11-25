import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { CreateUserDto, LoginUserDto } from './dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { CommonService } from '../common/common.service';
import { ValidRoles } from './interfaces/valid-roles';
import { UsersService } from './users.service';
import { ErrorCodes } from '@/common/interfaces';

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
    const { password } = createUserDto;

    const salt = bcrypt.genSaltSync();
    createUserDto.password = bcrypt.hashSync(password, salt);

    if (!createUserDto.role) createUserDto.role = ValidRoles.User;

    const user = await this.usersService.create(createUserDto);

    const token = this.getJwtToken({ id: user.id });

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

    const user = await this.usersService.findByEmail(email);
    if (!user) this.commonService.handleErrors(ErrorCodes.CredentialsNotValid);

    const isCorrectPassword = bcrypt.compareSync(
      loginUserDto.password,
      user.password,
    );

    if (!isCorrectPassword)
      this.commonService.handleErrors(ErrorCodes.CredentialsNotValid);

    const token = this.getJwtToken(
      { id: user.id },
      loginUserDto.remember && '7d',
    );

    return {
      name: user.name,
      token,
    };
  }

  /**
   * Check the auth state of the user
   * @returns An object with a property called ok
   */
  checkStatus() {
    // TODO: make logic to handle the numbers of time the token is regenerate

    return {
      ok: true,
      // TODO: return new token
    };
  }

  private getJwtToken(payload: JwtPayload, time?: string) {
    return this.jwtService.sign(payload, time && { expiresIn: time });
  }

  /**
   * TODO: Implement forgotPassword functionality.
   * This method will handle password recovery for users.
   */
}
