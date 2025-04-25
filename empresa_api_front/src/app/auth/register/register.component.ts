import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  nome: string = '';
  email: string = '';
  senha: string = '';
  error: string = '';
  successMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onRegister() {
    this.authService.register(this.nome, this.email, this.senha).subscribe({
      next: () => {
        this.successMessage = 'Cadastro realizado com sucesso! Redirecionando para o login...';
        this.error = '';
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 3000); 
      },
      error: (err) => {
        if (err.status === 400) {
          if (err.error && err.error.message) {
            this.error = err.error.message;
          } else {
            this.error = err.error || 'Erro ao cadastrar usuário. Tente novamente.';
          }
        } else {
          this.error = 'Erro desconhecido. Tente novamente mais tarde.';
        }
        this.successMessage = '';
      }
    });
  }
}