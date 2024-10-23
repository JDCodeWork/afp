import { Injectable } from '@nestjs/common';
import { CreateBudgetDto } from './dto/create-budget.dto';
import { UpdateBudgetDto } from './dto/update-budget.dto';
import { User } from '@/auth/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Budget } from './entities/budget.entity';
import { Repository } from 'typeorm';
import { CommonService } from '@/common/common.service';
import { CategoriesService } from '@/categories/categories.service';
import { ErrorCodes } from '@/common/interfaces';
import { TransactionsService } from '@/transactions/transactions.service';
import { Category } from '@/categories/entities/category.entity';

@Injectable()
export class BudgetsService {
  constructor(
    @InjectRepository(Budget)
    private readonly budgetRepository: Repository<Budget>,

    private readonly commonService: CommonService,
    private readonly categoriesService: CategoriesService,
    private readonly transactionsService: TransactionsService,
  ) {}

  async create(createBudgetDto: CreateBudgetDto, user: User) {
    const { category: categoryId, ...budgetDetails } = createBudgetDto;

    const budget = await this.budgetRepository.findOneBy({
      name: budgetDetails.name,
      user,
    });

    if (budget) this.commonService.handleErrors(ErrorCodes.KeyAlreadyExist);

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

  async findAll(user: User) {
    return await this.budgetRepository.findBy({ user });
  }

  async findOne(id: number, user: User) {
    const budget = await this.budgetRepository.findOneBy({ id, user });

    if (!budget) this.commonService.handleErrors(ErrorCodes.BudgetNotFound);

    const transactions = await this.transactionsService.findAllByFilterCategory(
      { name: budget.category.name },
      user,
    );

    return {
      ...budget,
      transactions,
    };
  }

  async update(id: number, updateBudgetDto: UpdateBudgetDto, user: User) {
    const { category: categoryId, ...budgetDetails } = updateBudgetDto;

    let category: Category;

    if (categoryId)
      category = await this.categoriesService.findOne(categoryId, user);

    const updatedBudget = await this.budgetRepository.preload({
      id,
      category,
      ...budgetDetails,
    });

    if (!updatedBudget)
      this.commonService.handleErrors(ErrorCodes.BudgetNotFound);

    try {
      return await this.budgetRepository.save(updatedBudget);
    } catch (error) {
      this.commonService.handleErrors(error.code);
    }
  }

  async remove(id: number, user: User) {
    const budget = await this.budgetRepository.findOneBy({ id, user });

    if (!budget) this.commonService.handleErrors(ErrorCodes.BudgetNotFound);

    try {
      await this.budgetRepository.remove(budget);
    } catch (error) {
      this.commonService.handleErrors(error.code);
    }
  }
}
