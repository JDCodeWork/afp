import { Injectable } from '@nestjs/common';
import { CreateGoalDto } from './dto/create-goal.dto';
import { UpdateGoalDto } from './dto/update-goal.dto';
import { User } from '@/auth/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Goal } from './entities/goal.entity';
import { Repository } from 'typeorm';
import { CommonService } from '@/common/common.service';
import { ErrorCodes } from '@/common/interfaces';
import { CategoriesService } from '@/categories/categories.service';

@Injectable()
export class GoalsService {
  constructor(
    @InjectRepository(Goal) private readonly goalRepository: Repository<Goal>,

    private readonly commonService: CommonService,
    private readonly categoriesService: CategoriesService,
  ) {}

  async create(createGoalDto: CreateGoalDto, user: User) {
    const { name } = createGoalDto;

    const goal = await this.goalRepository.findOneBy({
      name,
      user,
    });

    if (goal) this.commonService.handleErrors(ErrorCodes.KeyAlreadyExist);

    const newGoal = this.goalRepository.create({
      ...createGoalDto,
      user,
    });

    await this.categoriesService.create(
      {
        name,
        type: 'goal',
      },
      user,
    );

    try {
      await this.goalRepository.save(newGoal);

      return { ...newGoal };
    } catch (error) {
      this.commonService.handleErrors(error.code);
    }
  }

  findAll() {
    return `This action returns all goals`;
  }

  findOne(id: number) {
    return `This action returns a #${id} goal`;
  }

  update(id: number, updateGoalDto: UpdateGoalDto) {
    return `This action updates a #${id} goal`;
  }

  remove(id: number) {
    return `This action removes a #${id} goal`;
  }
}
