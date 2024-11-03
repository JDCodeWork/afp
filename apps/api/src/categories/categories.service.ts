import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CommonService } from '../common/common.service';
import { ErrorCodes } from '../common/interfaces/error-codes.interface';
import { User } from '../auth/entities/user.entity';
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

  /**
   * Creates a new category for the user.
   * @param createCategoryDto - Data transfer object for creating a category.
   * @param user - The user creating the category.
   * @returns The created category.
   */
  async create(createCategoryDto: CreateCategoryDto, user: User) {
    const category = await this.categoryRepository.findOneBy({
      name: createCategoryDto.name,
      user,
    });

    if (category) this.commonService.handleErrors(ErrorCodes.KeyAlreadyExist);

    const newCategory = this.categoryRepository.create({
      ...createCategoryDto,
      user,
    });

    try {
      await this.categoryRepository.save(newCategory);
      return newCategory;
    } catch (error) {
      this.commonService.handleErrors(error);
    }
  }

  /**
   * Retrieves a category by ID for the user.
   * @param id - The ID of the category.
   * @param user - The user requesting the category.
   * @returns The found category.
   */
  async findOne(id: number, user: User) {
    const category = await this.categoryRepository.findOne({
      where: { id },
      relations: { user: true },
    });

    if (!category) this.commonService.handleErrors(ErrorCodes.CategoryNotFound);
    if (category.user && category.user.id != user.id) {
      this.commonService.handleErrors(ErrorCodes.UnauthorizedRequest);
    }

    delete category.user; // Remove user information for response
    return category;
  }

  /**
   * Retrieves all categories for the user.
   * @param user - The user requesting their categories.
   * @returns List of categories associated with the user.
   */
  async findAll(user: User) {
    return await this.categoryRepository.find({
      where: [{ default: true }, { user }],
    });
  }

  /**
   * Updates a category by ID.
   * @param id - The ID of the category to update.
   * @param updateCategoryDto - Data transfer object with updated category data.
   * @param user - The user updating the category.
   */
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

  /**
   * Removes a category by ID.
   * @param id - The ID of the category to remove.
   * @param user - The user removing the category.
   */
  async remove(id: number, user: User) {
    const category = await this.categoryRepository.findOne({
      where: { id },
      relations: { user: true },
      select: { user: { id: true } },
    });

    this.verifyAuthorization(category, user);
    await this.categoryRepository.remove(category);
  }

  /**
   * Creates multiple categories at once.
   * @param categories - An array of category data transfer objects.
   */
  async createAll(categories: CreateCategoryDto[]) {
    try {
      await this.categoryRepository.insert(categories);
    } catch (error) {
      this.commonService.handleErrors(error);
    }
  }

  /**
   * Verifies if the user is authorized to access the category.
   * @param category - The category to check.
   * @param user - The user requesting access.
   */
  private verifyAuthorization(category: Category, user: User) {
    if (!category) this.commonService.handleErrors(ErrorCodes.CategoryNotFound);
    if (category.default || category.user.id != user.id) {
      this.commonService.handleErrors(ErrorCodes.UnauthorizedRequest);
    }
  }
}
