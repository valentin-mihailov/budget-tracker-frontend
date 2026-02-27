export interface Transactions {
  id: string;
  category: string;
  amount: number;
  type: 'income' | 'expense';
  createdAt: string;
}
