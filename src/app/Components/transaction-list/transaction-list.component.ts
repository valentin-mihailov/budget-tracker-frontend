import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Transactions } from 'src/app/Models/transactions.interface';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.css'],
})
export class TransactionListComponent {
  @Input() transactions: Transactions[] = [];
  @Output() delete = new EventEmitter<string>();

  onDeleteClick(index: string) {
    this.delete.emit(index);
  }
}
