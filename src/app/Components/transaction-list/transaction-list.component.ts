import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
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
}
