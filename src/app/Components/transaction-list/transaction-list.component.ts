import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Transactions } from 'src/app/Models/transactions.interface';
import { DeleteModalComponent } from '../delete-modal/delete-modal.component';

@Component({
  standalone: true,
  imports: [CommonModule, DeleteModalComponent],
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.css'],
})
export class TransactionListComponent {
  @Input() transactions: Transactions[] = [];
  @Output() delete = new EventEmitter<string>();

  isDeleteModalOpen = false;
  itemToDeleteId: string = ``;

  openDeleteModal(id: string) {
    this.isDeleteModalOpen = true;
    this.itemToDeleteId = id;
  }

  onDeleteClick(index: string) {
    this.delete.emit(index);
  }
}
