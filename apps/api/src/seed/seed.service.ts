import { Injectable } from '@nestjs/common';
import { Category } from 'src/transactions/entities';
import { CategoryProvider } from 'src/transactions/providers/category.provider';
import { categories } from './data/categories.data';

@Injectable()
export class SeedService {
  constructor(private readonly categoryProvider: CategoryProvider) {}

  async createInitialCategories() {
    const categoriesPromises: Promise<Category>[] = [];

    categories.forEach((category) =>
      categoriesPromises.push(this.categoryProvider.create(category)),
    );

    await Promise.all(categoriesPromises);
  }
}
