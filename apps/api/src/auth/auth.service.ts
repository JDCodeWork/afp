import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CommonService } from 'src/common/common.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    private readonly commonService: CommonService,
  ) {}

  async newUser(createUserDto: CreateUserDto) {
    const user = this.userRepository.create(createUserDto);

    try {
      await this.userRepository.save(user);

      const { name } = user;

      return {
        name,
        // TODO: Implementar token
      };
    } catch (error) {
      this.commonService.handleErrors(error);
    }
  }
}
