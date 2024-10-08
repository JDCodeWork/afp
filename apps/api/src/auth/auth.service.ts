import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';

import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async register(createUserDto: CreateUserDto) {
    const { password } = createUserDto;

    const salt = bcrypt.genSaltSync();
    createUserDto.password = bcrypt.hashSync(password, salt);

    const user = await this.usersService.createUser(createUserDto);

    return {
      ...user,
    };
  }
}
