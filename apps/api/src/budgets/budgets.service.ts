import { Injectable } from '@nestjs/common';
import { CreateBudgetDto } from './dto/create-budget.dto';
import { UpdateBudgetDto } from './dto/update-budget.dto';
import { User } from 'src/users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Budget } from './entities/budget.entity';
import { Repository } from 'typeorm';
import { CommonService } from 'src/common/common.service';
import { CategoriesService } from 'src/categories/categories.service';
import { ErrorCodes } from 'src/common/interfaces';

@Injectable()
export class BudgetsService {
  constructor(
    @InjectRepository(Budget)
    private readonly budgetRepository: Repository<Budget>,

    private readonly commonService: CommonService,
    private readonly categoriesService: CategoriesService,
  ) {}

  async create(createBudgetDto: CreateBudgetDto, user: User) {
    const { category: categoryId, ...budgetDetails } = createBudgetDto;

    const category = await this.categoriesService.findOne(categoryId, user);

    try {
      const newBudget = this.budgetRepository.create({
        user,
        category,
        ...budgetDetails,
      });

      await this.budgetRepository.save(newBudget);

      return newBudget;
    } catch (error) {
      this.commonService.handleErrors(error.code);
    }
  }

  findAll(user: User) {
    return `This action returns all budgets`;
  }

  findOne(id: number, user: User) {
    return `This action returns a #${id} budget`;
  }

  update(id: number, updateBudgetDto: UpdateBudgetDto, user: User) {
    return `This action updates a #${id} budget`;
  }

  remove(id: number, user: User) {
    return `This action removes a #${id} budget`;
  }
}
