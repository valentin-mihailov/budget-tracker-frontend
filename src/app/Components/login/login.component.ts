import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginData: { email: string; password: string } = {
    email: ``,
    password: ``,
  };

  login(): void {
    console.log(this.loginData);
  }
}
