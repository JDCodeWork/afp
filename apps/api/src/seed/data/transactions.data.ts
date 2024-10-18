import { CreateTransactionDto } from '../../transactions/dto';

export const pepitoTransactions: CreateTransactionDto[] = [
  {
    amount: 3000,
    note: 'Papas fritas',
    category: 37, // Gastos de comida
  },
  {
    amount: 1000000,
    note: 'Pago de seguro',
    category: 42, // Gastos de hogar
  },
  {
    amount: 3000000,
    note: 'Pago de salario',
    category: 24, // Salario
  },
  {
    amount: 500000,
    note: 'Trabajo freelancer',
    category: 25,
  },
];
