import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CommonService } from '../common/common.service';
import { ErrorCodes } from '../common/interfaces/error-codes.interface';
import { ErrorMessages } from '../common/interfaces/error-messges.interface';
import { User } from '../users/entities/user.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,

    private readonly commonService: CommonService,
  ) {}

  async create(createCategoryDto: CreateCategoryDto, user?: User) {
    const category = this.categoryRepository.create({
      ...createCategoryDto,
      ...(user && { user }),
    });

    try {
      await this.categoryRepository.save(category);
    } catch (error) {
      this.commonService.handleErrors(error);
    }
  }

  async findOne(id: number) {
    return await this.categoryRepository.findOneBy({ id });
  }

  async findAll(user: User) {
    return await this.categoryRepository.find({
      where: [{ default: true }, { user }],
    });
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto, user: User) {
    const category = await this.categoryRepository.findOne({
      where: { id },
      relations: { user: true },
      select: { user: { id: true } },
    });

    this.verifyAuthorization(category, user);

    const updateCategory = await this.categoryRepository.preload({
      id,
      ...updateCategoryDto,
    });

    await this.categoryRepository.save(updateCategory);
  }

  async remove(id: number, user: User) {
    const category = await this.categoryRepository.findOne({
      where: { id },
      relations: { user: true },
      select: { user: { id: true } },
    });

    this.verifyAuthorization(category, user);

    await this.categoryRepository.remove(category);
  }

  async createAll(categories: CreateCategoryDto[]) {
    try {
      await this.categoryRepository.insert(categories);
    } catch (error) {
      this.commonService.handleErrors(error);
    }
  }

  private verifyAuthorization(category, user) {
    if (!category) this.commonService.handleErrors(ErrorCodes.CategoryNotFound);

    if (category.default || category.user.id != user.id)
      this.commonService.handleErrors(ErrorCodes.UnauthorizedCategoryRequest);
  }
}
