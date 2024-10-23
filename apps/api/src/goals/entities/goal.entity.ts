import { User } from '@/auth/entities/user.entity';
import { Transaction } from '@/transactions/entities';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
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

  @OneToMany(() => Transaction, (transaction) => transaction.goal)
  transactions?: Transaction[];

  @ManyToOne(() => User, (user) => user.goals)
  user: User;
}
