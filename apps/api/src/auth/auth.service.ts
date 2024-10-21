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

  async register(createUserDto: CreateUserDto) {
    const { password, email } = createUserDto;

    const salt = bcrypt.genSaltSync();
    createUserDto.password = bcrypt.hashSync(password, salt);

    const user = await this.usersService.create(createUserDto);

    const token = this.jwtService.sign({ email });

    return {
      user,
      token,
    };
  }

  async login(loginUserDto: LoginUserDto) {
    const { email } = loginUserDto;

    const user = await this.usersService.findOneByEmail(email);

    if (!user) this.commonService.handleErrors(ErrorCodes.CredentialsNotValid);

    const isCorrectPassword = bcrypt.compareSync(
      loginUserDto.password,
      user.password,
    );

    if (!isCorrectPassword)
      this.commonService.handleErrors(ErrorCodes.CredentialsNotValid);

    const token = this.jwtService.sign({ email });

    return {
      name: user.name,
      token,
    };
  }
}
