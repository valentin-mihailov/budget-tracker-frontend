import { Component } from '@angular/core';
import { LoginPayload } from 'src/app/Models/auth.interface';
import { AuthService } from 'src/app/Services/auth.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { MessageService } from 'src/app/Services/message.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(
    private authService: AuthService,
    private messageService: MessageService,
    private router: Router,
  ) {}

  loginData: LoginPayload = {
    email: ``,
    password: ``,
  };

  msg$ = this.messageService.msg$;

  login(): void {
    this.messageService.clearMessage();

    this.authService.login(this.loginData).subscribe({
      next: (response: any) => {
        localStorage.setItem('jwt', response.access_token);
        localStorage.setItem(`user_id`, response.user.id);

        this.router.navigate([`/dashboard`]);
      },
      error: (error: HttpErrorResponse) => {
        const statusCode = error.status;

        if (statusCode === 401) {
          this.messageService.setMessage('Incorrect email or password!');
        } else if (statusCode === 500) {
          this.messageService.setMessage('Internal server error!');
        } else {
          this.messageService.setMessage(
            'An unexpected error occurred. Please try again.',
          );
        }
      },
    });
  }
}
