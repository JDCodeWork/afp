import { CreateTransactionDto } from 'src/transactions/dto';
import { Transaction } from '../transactions/entities';
import { userEntityFixture } from './auth.fixture';
import {
  expenseCategoryFixture,
  incomeCategoryFixture,
} from './category.fixture';

export const transactionFixture: Transaction = {
  id: 1,
  amount: 100,
  note: 'Test Transaction',
  category: incomeCategoryFixture,
  create_at: undefined,
  user: userEntityFixture,
};

export const otherTransactionFixture: Transaction = {
  id: 2,
  amount: 200,
  note: 'Test Transaction 2',
  category: expenseCategoryFixture,
  create_at: undefined,
  user: userEntityFixture,
};

export const createTransactionFixture: CreateTransactionDto = {
  category: incomeCategoryFixture.id,
  amount: transactionFixture.amount,
  note: transactionFixture.note,
};

export const otherCreateTransactionFixture: CreateTransactionDto = {
  category: expenseCategoryFixture.id,
  amount: otherTransactionFixture.amount,
  note: otherTransactionFixture.note,
};

export const updateTransactionFixture: CreateTransactionDto = {
  category: incomeCategoryFixture.id,
  amount: transactionFixture.amount,
  note: transactionFixture.note,
};
