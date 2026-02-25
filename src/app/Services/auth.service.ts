import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginPayload, RegisterPayload } from '../Models/auth.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  private readonly API_URL = `http://localhost:3000/auth`;

  login(credentials: LoginPayload) {
    return this.http.post(`${this.API_URL}/login`, credentials);
  }

  register(credentials: RegisterPayload) {
    return this.http.post(`${this.API_URL}/register`, credentials);
  }
}
