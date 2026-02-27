import { Injectable } from '@angular/core';
import { Transactions } from '../Models/transactions.interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TransactionsService {
  constructor(private http: HttpClient) {}

  private balanceSubject = new BehaviorSubject<number>(0);
  private transactions: Transactions[] = [];
  balance$ = this.balanceSubject.asObservable();

  refreshBalance(userId: string) {
    this.http
      .get(`${environment.API_URL}/users/${userId}/balance`, {
        responseType: 'text',
      })
      .subscribe((val) => this.balanceSubject.next(parseFloat(val)));
  }

  getTransactions(): Observable<Transactions[]> {
    const userId = localStorage.getItem(`user_id`);
    return this.http
      .get<
        Transactions[]
      >(`${environment.API_URL}/users/${userId}/transactions`)
      .pipe(tap((all) => (this.transactions = all)));
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
          this.transactions.unshift(savedItem);
          this.refreshBalance(userId!);
        }),
      );
  }

  deleteTransaction(transactionId: string): Observable<any> {
    const userId = localStorage.getItem(`user_id`);
    return this.http
      .delete(
        `${environment.API_URL}/users/${userId}/transactions/${transactionId}`,
      )
      .pipe(
        tap(() => {
          const index = this.transactions.findIndex(
            (t) => t.id === transactionId,
          );
          if (index !== -1) this.transactions.splice(index, 1);
          this.refreshBalance(userId!);
        }),
      );
  }

  calculateBalance() {
    return this.transactions.reduce(
      (acc, curr) =>
        curr.type === 'income' ? acc + curr.amount : acc - curr.amount,
      0,
    );
  }

  private getHeaders() {
    const jwt = localStorage.getItem('jwt');
    return new HttpHeaders({
      Authorization: `Bearer ${jwt}`,
    });
  }
}
