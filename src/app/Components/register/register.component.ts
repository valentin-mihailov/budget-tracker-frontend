import { Component } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  registerData: { email: string; password: string; confirmPassword: string } = {
    email: ``,
    password: ``,
    confirmPassword: ``,
  };

  register(): void {
    console.log(this.registerData);
  }
}
