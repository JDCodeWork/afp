import { Injectable } from '@nestjs/common';
import { categories } from './data/categories.data';
import { CategoriesService } from '../categories/categories.service';
import { dataUsers } from './data/users.data';
import { AuthService } from '../auth/auth.service';
import { User } from '../users/entities/user.entity';
import { TransactionsService } from 'src/transactions/transactions.service';
import { pepitoTransactions } from './data/transactions.data';

@Injectable()
export class SeedService {
  constructor(
    private readonly categoriesService: CategoriesService,
    private readonly authService: AuthService,
    private readonly transactionsService: TransactionsService,
  ) {}

  async createInitialCategories() {
    await this.categoriesService.createAll(categories);
  }

  async createInitialUsers() {
    const usersPromises = [];

    dataUsers.forEach((user) =>
      usersPromises.push(this.authService.register(user)),
    );

    const users: { user }[] = await Promise.all(usersPromises);

    await this.createInitialTransactions(users[0].user);

    return users;
  }

  private async createInitialTransactions(user: User) {
    const transactionsPromises = [];

    pepitoTransactions.forEach((transaction) =>
      transactionsPromises.push(
        this.transactionsService.create(transaction, user),
      ),
    );

    await Promise.all(transactionsPromises);
  }
}
