import { ApiProperty } from '@nestjs/swagger';
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
  @ApiProperty({
    description: 'Unique identifier for the category.',
    example: 1,
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: 'Name of the category.',
    example: 'Groceries',
  })
  @Column({ type: 'text' })
  name: string;

  @ApiProperty({
    description: 'Type of the category.',
    example: 'expense',
    enum: ['expense', 'income', 'goal'],
  })
  @Column({ type: 'text' })
  type: 'expense' | 'income' | 'goal';

  @ApiProperty({
    description: 'Indicates if this is a default category.',
    example: true,
  })
  @Column({ type: 'bool', default: true })
  default: boolean;

  @ApiProperty({
    description: 'User who owns this category.',
    type: () => User,
  })
  @ManyToOne(() => User, (user) => user.categories)
  user?: User;

  @ApiProperty({
    description: 'Transactions associated with this category.',
    type: () => [Transaction],
  })
  @OneToMany(() => Transaction, (transaction) => transaction.category)
  transactions?: Transaction[];

  @ApiProperty({
    description: 'Budgets associated with this category.',
    type: () => [Budget],
  })
  @ManyToOne(() => Budget, (budget) => budget.category)
  budgets?: Budget[];

  @BeforeInsert()
  verifyDefaultState() {
    if (this.user) this.default = false;
  }
}
