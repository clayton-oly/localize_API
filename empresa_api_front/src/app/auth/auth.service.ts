// src/app/auth/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface LoginResponse {
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  //private apiUrl = 'https://empresas-api-lqwm.onrender.com/api/auth';
  private apiUrl = 'https://localhost:7186/api/auth'

  constructor(private http: HttpClient) {}

  login(email: string, senha: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, {
      email,
      senha
    });
  }

  register(nome: string, email: string, senha: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, {
      nome,
      email,
      senha
    });
  }

  logout() {
    localStorage.removeItem('token'); // Remove o token quando o usuário sair
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');  // Verifica se o token existe no localStorage
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }
}
