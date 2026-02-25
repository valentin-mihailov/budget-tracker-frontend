import { Component } from '@angular/core';
import { LoginPayload } from 'src/app/Models/auth.interface';
import { AuthService } from 'src/app/Services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginData: LoginPayload = {
    email: ``,
    password: ``,
  };

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  login(): void {
    this.authService.login(this.loginData).subscribe({
      next: (response) => {
        this.router.navigate([`/dashboard`]);
      },
      error: (error) => {
        console.error(`Login Failed!` + error);
      },
    });
  }
}
