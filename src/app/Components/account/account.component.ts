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

  isModalOpen: boolean = false;
  transactions: Transactions[] = [];
  totalCash: number = 0;

  ngOnInit(): void {
    this.transactions = this.transactionService.getTransactions();
    this.totalCash = this.transactionService.getTotalCash();
  }

  onTransactionAdded(newTransaction: any) {
    this.transactionService.addTransaction(newTransaction);
    this.totalCash = this.transactionService.calculateBalance();
    this.isModalOpen = false;
  }

  onTransactionDeleted(index: number) {
    this.transactionService.deleteTransaction(index);
    this.totalCash = this.transactionService.calculateBalance();
  }
}
