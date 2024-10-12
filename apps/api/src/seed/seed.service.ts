import { Injectable } from '@nestjs/common';
import { categories } from './data/categories.data';
import { CategoriesService } from 'src/categories/categories.service';

@Injectable()
export class SeedService {
  constructor(private readonly categoriesService: CategoriesService) {}

  async createInitialCategories() {
    await this.categoriesService.createAll(categories);
  }
}
