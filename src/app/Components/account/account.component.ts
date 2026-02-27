import { Component, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionModalComponent } from '../transaction-modal/transaction-modal.component';
import { TransactionListComponent } from '../transaction-list/transaction-list.component';
import { Transactions } from 'src/app/Models/transactions.interface';
import { TransactionsService } from 'src/app/Services/transactions.service';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [CommonModule, TransactionModalComponent, TransactionListComponent],
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
})
export class AccountComponent implements OnInit {
  constructor(private transactionService: TransactionsService) {}

  transactions$ = this.transactionService.transactions$;
  isModalOpen: boolean = false;
  totalCash$ = this.transactionService.balance$;

  ngOnInit(): void {
    this.transactionService.getTransactions().subscribe();
    this.transactionService.refreshBalance(localStorage.getItem(`user_id`)!);
  }

  onTransactionAdded(newTransaction: Transactions) {
    this.transactionService.addTransaction(newTransaction).subscribe({
      next: () => {
        this.isModalOpen = false;
      },
      error: (err) => console.error('Failed to save', err),
    });
  }

  onTransactionDelete(id: string) {
    this.transactionService.deleteTransaction(id).subscribe({
      next: () => {},
      error: (err) => console.error('Failed to delete', err),
    });
  }
}
