import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from '../entities';
import { Repository } from 'typeorm';
import { createCategoryDto } from '../dto/create-category.dto';

@Injectable()
export class CategoryProvider {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async findOneByName(name: string) {
    return await this.categoryRepository.findOneBy({ name });
  }

  create(createCategoryDto: createCategoryDto) {
    const category = this.categoryRepository.create(createCategoryDto);

    return this.categoryRepository.save(category);
  }
}
