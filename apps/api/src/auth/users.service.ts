import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CommonService } from '@/common/common.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly commonService: CommonService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const newUser = this.userRepository.create(createUserDto);

    try {
      await this.userRepository.save(newUser);

      const { id, name } = newUser;

      return {
        id,
        name,
      };
    } catch (error) {
      this.commonService.handleErrors(error.code);
    }
  }

  async findOneByEmail(email: string) {
    return await this.userRepository.findOneBy({ email });
  }
}
