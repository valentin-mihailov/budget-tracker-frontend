import { Injectable } from '@angular/core';
import { Transactions } from '../Models/transactions.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TransactionsService {
  constructor(private http: HttpClient) {}

  private transactionsSubject = new BehaviorSubject<Transactions[]>([]);
  transactions$ = this.transactionsSubject.asObservable();

  private balanceSubject = new BehaviorSubject<number>(0);
  balance$ = this.balanceSubject.asObservable();

  private budgetSubject = new BehaviorSubject<number>(0);
  budget$ = this.budgetSubject.asObservable();

  private get currentTransactions(): Transactions[] {
    return this.transactionsSubject.value;
  }

  refreshBalance(userId: string) {
    this.http
      .get(`${environment.API_URL}/users/${userId}/balance`, {
        responseType: 'text',
      })
      .subscribe((val) => this.balanceSubject.next(parseFloat(val)));
  }

  getTransactions(): Observable<Transactions[]> {
    const userId = localStorage.getItem('user_id');
    return this.http
      .get<
        Transactions[]
      >(`${environment.API_URL}/users/${userId}/transactions`)
      .pipe(
        tap((all) => {
          const cleaned = all
            .map((t) => ({ ...t, amount: Number(t.amount) }))
            .reverse();
          this.transactionsSubject.next(cleaned);
        }),
      );
  }

  addTransaction(newTransaction: Transactions): Observable<any> {
    const userId = localStorage.getItem('user_id');
    return this.http
      .post(
        `${environment.API_URL}/users/${userId}/transactions`,
        newTransaction,
      )
      .pipe(
        tap((savedItem: any) => {
          savedItem.amount = Number(savedItem.amount);

          const updated = [savedItem, ...this.transactionsSubject.value];
          this.transactionsSubject.next(updated);
          this.refreshBalance(userId!);
        }),
      );
  }

  deleteTransaction(transactionId: string): Observable<any> {
    const userId = localStorage.getItem('user_id');
    return this.http
      .delete(
        `${environment.API_URL}/users/${userId}/transactions/${transactionId}`,
      )
      .pipe(
        tap(() => {
          const updated = this.currentTransactions.filter(
            (t) => t.id !== transactionId,
          );
          this.transactionsSubject.next(updated);
          this.refreshBalance(userId!);
        }),
      );
  }

  setBudget(newAmount: number) {
    const userId = localStorage.getItem('user_id');

    return this.http
      .put(`${environment.API_URL}/users/${userId}/budget`, {
        amount: Number(newAmount),
      })
      .pipe(
        tap(() => {
          this.budgetSubject.next(Number(newAmount));
        }),
      );
  }

  getBudget() {
    const userId = localStorage.getItem('user_id');
    this.http
      .get<number>(`${environment.API_URL}/users/${userId}/budget`)
      .subscribe({
        next: (val) => this.budgetSubject.next(Number(val)),
        error: (err) => console.error('Could not load budget', err),
      });
  }

  getTotalIncome(): number {
    return this.currentTransactions
      .filter((t) => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);
  }

  getTotalExpenses(): number {
    return this.currentTransactions
      .filter((t) => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);
  }

  getPieChartData(type: 'income' | 'expense') {
    const filtered = this.currentTransactions.filter((t) => t.type === type);
    const groups = filtered.reduce(
      (acc, curr) => {
        acc[curr.category] = (acc[curr.category] || 0) + curr.amount;
        return acc;
      },
      {} as Record<string, number>,
    );

    return {
      labels: Object.keys(groups),
      datasets: [
        {
          data: Object.values(groups),
          backgroundColor:
            type === 'income'
              ? ['#22c55e', '#4ade80', '#86efac', '#16a34a']
              : ['#ef4444', '#f87171', '#fca5a5', '#dc2626'],
          borderWidth: 1,
        },
      ],
    };
  }
}
