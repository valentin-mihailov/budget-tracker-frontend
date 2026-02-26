import { Component } from '@angular/core';
import { RegisterPayload } from 'src/app/Models/auth.interface';
import { AuthService } from 'src/app/Services/auth.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { MessageService } from 'src/app/Services/message.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  constructor(
    private authService: AuthService,
    private messageService: MessageService,
    private router: Router,
  ) {}

  registerData: RegisterPayload = {
    email: ``,
    password: ``,
    confirmPassword: ``,
  };

  msg$ = this.messageService.msg$;

  register(): void {
    this.messageService.clearMessage();

    const validationError = this.authService.validateRegistration(
      this.registerData,
    );

    if (validationError) {
      this.messageService.setMessage(validationError);
      return;
    }

    this.messageService.clearMessage();

    this.authService.register(this.registerData).subscribe({
      next: (response) => {
        this.router.navigate(['/login']);
      },
      error: (error: HttpErrorResponse) => {
        if (error.status === 409) {
          this.messageService.setMessage('This email is already registered.');
        } else {
          this.messageService.setMessage(
            'An unexpected error occurred. Please try again.',
          );
        }
      },
    });
  }
}
