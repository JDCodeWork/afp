import { User } from '@/auth/entities/user.entity';
import { Category } from '@/categories/entities/category.entity';
import { Transaction } from '@/transactions/entities';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Goal {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  name: string;

  @Column({ type: 'double precision' })
  target_amount: number;

  @Column({ type: 'integer', unique: true })
  category: number;

  @ManyToOne(() => User, (user) => user.goals)
  user: User;
}
