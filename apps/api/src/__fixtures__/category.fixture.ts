import { Category } from '../categories/entities/category.entity';

export const expenseCategoryFixture: Category = {
  id: 1,
  name: 'Expense Test Category',
  type: 'expense',
  default: false,
  verifyDefaultState: () => {},
};

export const incomeCategoryFixture: Category = {
  id: 2,
  name: 'Income Test Category 2',
  type: 'income',
  default: false,
  verifyDefaultState: () => {},
};
