import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';

import * as bcrypt from 'bcrypt';
import { LoginUserDto } from './dto/login-user.dto';
import { CommonService } from 'src/common/common.service';
import { ErrorCodes } from 'src/common/interfaces/error-codes.interface';
import { JwtService } from '@nestjs/jwt';

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
      ...user,
      token,
    };
  }

  async login(loginUserDto: LoginUserDto) {
    const { email } = loginUserDto;

    const user = await this.usersService.findOneByEmail(email);

    if (!user)
      this.commonService.handleErrors({ code: ErrorCodes.CredentialsNotValid });

    const isCorrectPassword = bcrypt.compareSync(
      loginUserDto.password,
      user.password,
    );

    const token = this.jwtService.sign({ email });

    if (!isCorrectPassword)
      this.commonService.handleErrors({ code: ErrorCodes.CredentialsNotValid });

    return {
      token,
    };
  }
}
