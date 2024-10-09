import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Transaction } from './transaction.entity';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', unique: true })
  name: string;

  @Column({ type: 'text' })
  type: 'expense' | 'income';

  @OneToMany(() => Transaction, (transaction) => transaction.category)
  transactions?: Transaction[];
}
