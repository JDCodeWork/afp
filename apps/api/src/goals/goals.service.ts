import { Injectable } from '@nestjs/common';
import { CreateGoalDto } from './dto/create-goal.dto';
import { UpdateGoalDto } from './dto/update-goal.dto';
import { User } from '@/auth/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Goal } from './entities/goal.entity';
import { DataSource, Repository } from 'typeorm';
import { CommonService } from '@/common/common.service';
import { ErrorCodes } from '@/common/interfaces';
import { CategoriesService } from '@/categories/categories.service';
import { Category } from '@/categories/entities/category.entity';
import { Transaction } from '@/transactions/entities';

@Injectable()
export class GoalsService {
  constructor(
    @InjectRepository(Goal) private readonly goalRepository: Repository<Goal>,

    private readonly commonService: CommonService,
    private readonly categoriesService: CategoriesService,
    private readonly dataSource: DataSource,
  ) {}

  async create(createGoalDto: CreateGoalDto, user: User) {
    const { name } = createGoalDto;

    const goal = await this.goalRepository.findOneBy({
      name,
      user,
    });

    if (goal) this.commonService.handleErrors(ErrorCodes.KeyAlreadyExist);

    const category = await this.categoriesService.create(
      {
        name,
        type: 'goal',
      },
      user,
    );
    const newGoal = this.goalRepository.create({
      ...createGoalDto,
      category: category.id,
      user,
    });

    try {
      await this.goalRepository.save(newGoal);

      return newGoal;
    } catch (error) {
      this.commonService.handleErrors(error.code);
    }
  }

  async findAll(user: User) {
    return await this.dataSource
      .createQueryBuilder(Goal, 'goal')
      .leftJoinAndMapOne(
        'goal.category',
        Category,
        'category',
        'category.name = goal.name AND category.user.id = :userId',
        { userId: user.id },
      )
      .select(['goal', 'category.id'])
      .where('goal.user.id = :userId', { userId: user.id })
      .getMany();
  }

  async findOne(id: number, user: User) {
    const goal = await this.dataSource
      .createQueryBuilder(Goal, 'goal')
      .leftJoinAndMapMany(
        'goal.transactions',
        Transaction,
        'transaction',
        'transaction.category.id = goal.category',
      )
      .where('goal.user.id = :userId', { userId: user.id })
      .andWhere('goal.id = :id', { id })
      .getOne();

    if (!goal) this.commonService.handleErrors(ErrorCodes.GoalNotFound);

    return goal;
  }

  update(id: number, updateGoalDto: UpdateGoalDto) {
    return `This action updates a #${id} goal`;
  }

  remove(id: number) {
    return `This action removes a #${id} goal`;
  }
}
