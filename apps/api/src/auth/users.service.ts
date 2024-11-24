import { Repository } from 'typeorm';
import { CreateUserDto } from './dto';
import { User } from './entities/user.entity';
import { CommonService } from '@/common/common.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';

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

  async findByEmail(email: string) {
    return await this.userRepository.findOneBy({ email });
  }

  async findById(id: string) {
    return await this.userRepository.findOneBy({ id });
  }
}
