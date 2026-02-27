import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Transactions } from 'src/app/Models/transactions.interface';
import { MessageService } from 'src/app/Services/message.service';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-transaction-modal',
  imports: [CommonModule, FormsModule],
  templateUrl: './transaction-modal.component.html',
  styleUrls: ['./transaction-modal.component.css'],
})
export class TransactionModalComponent {
  @Input() isOpen = false;
  @Output() close = new EventEmitter<void>();
  @Output() add = new EventEmitter<Transactions>();

  constructor(private messageService: MessageService) {}

  amount: string = '';
  selectedType: 'income' | 'expense' | null = null;
  selectedCategory: string = '';
  msg$ = this.messageService.msg$;

  incomeCategories = ['Salary', 'Freelance', 'Gifts', 'Investments', 'Other'];
  expenseCategories = [
    'Food',
    'Rent',
    'Transport',
    'Entertainment',
    'Shopping',
    'Other',
  ];

  handleTransaction() {
    const numAmount = parseFloat(this.amount);

    if (
      !this.selectedType ||
      !this.selectedCategory ||
      isNaN(numAmount) ||
      numAmount <= 0
    ) {
      this.messageService.setMessage(
        'Please select a type, category, and valid amount.',
      );
      return;
    }

    const newEntry: Transactions = {
      id: crypto.randomUUID(),
      category: this.selectedCategory,
      amount: numAmount,
      type: this.selectedType,
      createdAt: new Date().toISOString(),
    };

    this.messageService.clearMessage();
    this.resetForm();
    this.add.emit(newEntry);
    this.close.emit();
  }

  resetForm() {
    this.amount = '';
    this.selectedType = null;
    this.selectedCategory = '';
  }

  get currentCategories(): string[] {
    if (this.selectedType === 'income') return this.incomeCategories;
    if (this.selectedType === 'expense') return this.expenseCategories;
    return [];
  }
}
