import { Component } from '@angular/core';
import { RegisterPayload } from 'src/app/Models/auth.interface';
import { AuthService } from 'src/app/Services/auth.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  registerData: RegisterPayload = {
    email: ``,
    password: ``,
    confirmPassword: ``,
  };

  errorMessage: string = ``;

  register(): void {
    const validationError = this.authService.validateRegistration(
      this.registerData,
    );

    if (validationError) {
      this.errorMessage = validationError;
      return;
    }

    this.errorMessage = '';

    this.authService.register(this.registerData).subscribe({
      next: (response) => {
        this.router.navigate(['/login']);
      },
      error: (error: HttpErrorResponse) => {
        if (error.status === 409) {
          this.errorMessage = 'This email is already registered.';
        } else {
          this.errorMessage = 'An unexpected error occurred. Please try again.';
        }

        console.error('Registration failed!', error);
      },
    });
  }
}
