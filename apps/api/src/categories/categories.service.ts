import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { CommonService } from 'src/common/common.service';
import { User } from 'src/users/entities/user.entity';
import { ErrorCodes } from 'src/common/interfaces/error-codes.interface';
import { UpdateCategoryDto } from './dto/update-category.dto';

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

    this.verifyAuthorization(category, user, 'actualizar');

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

    this.verifyAuthorization(category, user, 'eliminar');

    await this.categoryRepository.remove(category);
  }

  async createAll(categories: CreateCategoryDto[]) {
    try {
      await this.categoryRepository.insert(categories);
    } catch (error) {
      this.commonService.handleErrors(error);
    }
  }

  private verifyAuthorization(category, user, errorActionMsg) {
    if (!category)
      this.commonService.handleErrors({ code: ErrorCodes.CategoryNotFound });

    if (category.default)
      this.commonService.handleErrors({
        detail: `Sin autoridad para ${errorActionMsg} una categoría predeterminada`,
        code: ErrorCodes.UnauthorizedCategoryRequest,
      });

    if (category.user.id != user.id)
      this.commonService.handleErrors({
        detail: `Sin autoridad para ${errorActionMsg} la categoría`,
        code: ErrorCodes.UnauthorizedCategoryRequest,
      });
  }
}
