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
import { TransactionsService } from '@/transactions/transactions.service';

@Injectable()
export class GoalsService {
  constructor(
    @InjectRepository(Goal) private readonly goalRepository: Repository<Goal>,
    private readonly dataSource: DataSource,

    private readonly commonService: CommonService,
    private readonly categoriesService: CategoriesService,
    private readonly transactionsService: TransactionsService,
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
    return this.dataSource
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

  async update(id: number, updateGoalDto: UpdateGoalDto = {}, user: User) {
    const goalToUpdate = await this.goalRepository.findOneBy({ id, user });

    if (!goalToUpdate) this.commonService.handleErrors(ErrorCodes.GoalNotFound);

    if (updateGoalDto.name && goalToUpdate.name != updateGoalDto.name) {
      await this.categoriesService.update(
        goalToUpdate.category,
        {
          name: updateGoalDto.name,
        },
        user,
      );
    }

    const updatedGoal = await this.goalRepository.save({
      ...goalToUpdate,
      ...updateGoalDto,
    });

    return updatedGoal;
  }

  async remove(id: number, user: User) {
    const goal = await this.goalRepository.findOneBy({ id, user });

    if (!goal) this.commonService.handleErrors(ErrorCodes.GoalNotFound);

    await this.transactionsService.refoundToAccount(goal.category, user);

    await this.categoriesService.remove(goal.category, user);

    await this.goalRepository.delete(goal);
  }
}
