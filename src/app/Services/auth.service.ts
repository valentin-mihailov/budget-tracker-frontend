import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginPayload, RegisterPayload } from '../Models/auth.interface';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(credentials: LoginPayload) {
    return this.http.post(`${environment.API_URL}/auth/login`, credentials);
  }

  register(credentials: RegisterPayload) {
    return this.http.post(`${environment.API_URL}/auth/register`, credentials);
  }

  validateRegistration(credentials: RegisterPayload): string {
    if (
      !credentials.email ||
      !credentials.password ||
      !credentials.confirmPassword
    ) {
      return 'There is an empty field.';
    }

    if (credentials.password !== credentials.confirmPassword) {
      return "Passwords don't match!";
    }
    return ``;
  }
}
