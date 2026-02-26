import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Transactions } from 'src/app/Models/transactions.interface';
import { MessageService } from 'src/app/Services/message.service';

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

  constructor(private messageService: MessageService) {}

  msg$ = this.messageService.msg$;

  handleTransaction(
    description: string,
    amount: string,
    type: 'income' | 'expense',
  ) {
    const numAmount = parseFloat(amount);

    if (!description.trim() || isNaN(numAmount) || numAmount <= 0) {
      this.messageService.setMessage(
        'Please enter a valid description and amount.',
      );
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

    this.messageService.clearMessage();
    this.add.emit(newEntry);
    this.close.emit();
  }
}
