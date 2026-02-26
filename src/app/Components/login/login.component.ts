import { Component } from '@angular/core';
import { LoginPayload } from 'src/app/Models/auth.interface';
import { AuthService } from 'src/app/Services/auth.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  loginData: LoginPayload = {
    email: ``,
    password: ``,
  };

  errorMessage: string = ``;

  login(): void {
    this.authService.login(this.loginData).subscribe({
      next: (response: any) => {
        console.log(response.access_token);
        this.router.navigate([`/dashboard`]);
      },
      error: (error: HttpErrorResponse) => {
        const statusCode = error.status;

        if (statusCode === 401) {
          this.errorMessage = 'Incorrect email or password!';
        } else if (statusCode === 500) {
          this.errorMessage = 'Internal server error!';
        } else {
          this.errorMessage = 'An unexpected error occurred. Please try again.';
        }
      },
    });
  }
}
