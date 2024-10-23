import { Budget } from '../../budgets/entities/budget.entity';
import { Transaction } from '../../transactions/entities';
import { User } from '../../auth/entities/user.entity';
import {
  BeforeInsert,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  name: string;

  @Column({ type: 'text' })
  type: 'expense' | 'income' | 'goal';

  @Column({ type: 'bool', default: true })
  default: boolean;

  @ManyToOne(() => User, (user) => user.categories)
  user?: User;

  @OneToMany(() => Transaction, (transaction) => transaction.category)
  transactions?: Transaction[];

  @ManyToOne(() => Budget, (budget) => budget.category)
  budgets?: Budget[];

  @BeforeInsert()
  verifyDefaultState() {
    if (this.user) this.default = false;
  }
}
