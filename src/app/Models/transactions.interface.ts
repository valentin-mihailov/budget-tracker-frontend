export interface Transactions {
  description: string;
  amount: number;
  type: 'income' | 'expense';
  date: string;
}
