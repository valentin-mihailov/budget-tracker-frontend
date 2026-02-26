import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Transactions } from 'src/app/Models/transactions.interface';

@Component({
  standalone: true,
  selector: 'app-transaction-modal',
  imports: [CommonModule],
  templateUrl: './transaction-modal.component.html',
  styleUrls: ['./transaction-modal.component.css'],
})
export class TransactionModalComponent {
  @Input() isOpen = false;
  @Output() close = new EventEmitter<void>();
  @Output() add = new EventEmitter<any>();

  handleTransaction(
    description: string,
    amount: string,
    type: 'income' | 'expense',
  ) {
    const numAmount = parseFloat(amount);

    if (!description.trim() || isNaN(numAmount) || numAmount <= 0) {
      alert('Please enter a valid description and amount.');
      return;
    }

    const newEntry: Transactions = {
      description,
      amount: numAmount,
      type,
      date: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
      }),
    };

    this.add.emit(newEntry);
    this.close.emit();
  }
}
