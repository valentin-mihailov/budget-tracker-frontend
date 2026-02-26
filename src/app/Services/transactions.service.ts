import { Injectable } from '@angular/core';
import { Transactions } from '../Models/transactions.interface';

@Injectable({
  providedIn: 'root',
})
export class TransactionsService {
  constructor() {}

  private totalCash = 0;
  private transactions: Transactions[] = [];

  getTotalCash(): number {
    return this.totalCash;
  }

  getTransactions(): Transactions[] {
    return this.transactions;
  }

  addTransaction(item: any) {
    this.transactions.unshift(item);
  }

  deleteTransaction(index: number) {
    this.transactions.splice(index, 1);
  }

  calculateBalance() {
    return this.transactions.reduce(
      (acc, curr) =>
        curr.type === 'income' ? acc + curr.amount : acc - curr.amount,
      0,
    );
  }
}
