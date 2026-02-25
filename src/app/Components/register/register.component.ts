import { Component } from '@angular/core';
import { RegisterPayload } from 'src/app/Models/auth.interface';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  registerData: RegisterPayload = {
    email: ``,
    password: ``,
    confirmPassword: ``,
  };

  constructor(private authService: AuthService) {}

  register(): void {
    this.authService.register(this.registerData).subscribe({
      next: (response) => {
        console.log(`Register Success!`);
      },
      error: (error) => {
        console.error(`Register Failed!`);
      },
    });
  }
}
