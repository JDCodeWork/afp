import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Category } from '../../categories/entities/category.entity';

@Entity()
export class Budget {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  name: string;

  @Column({ type: 'double precision' })
  max_amount: number;

  @Column({ type: 'date' })
  end_date: Date;

  @ManyToOne(() => Category, (category) => category.budgets, { eager: true })
  category: Category;

  @ManyToOne(() => User, (user) => user.budgets)
  user: User;
}
