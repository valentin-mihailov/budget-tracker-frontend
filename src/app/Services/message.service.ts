import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  constructor() {}

  private message = new BehaviorSubject<string>(``);

  msg$ = this.message.asObservable();

  setMessage(newMessage: string) {
    this.message.next(newMessage);
  }

  clearMessage() {
    this.message.next('');
  }

  getValue(): string {
    return this.message.getValue();
  }
}
