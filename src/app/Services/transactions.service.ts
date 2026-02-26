import { Injectable } from '@angular/core';
import { Transactions } from '../Models/transactions.interface';

@Injectable({
  providedIn: 'root',
})
export class TransactionsService {
  constructor() {}

  private transactions: Transactions[] = [];

  getTransactions(): Transactions[] {
    return this.transactions;
  }

  addTransaction(item: any) {
    this.transactions.unshift(item);
  }

  calculateBalance() {
    return this.transactions.reduce(
      (acc, curr) =>
        curr.type === 'income' ? acc + curr.amount : acc - curr.amount,
      0,
    );
  }
}
