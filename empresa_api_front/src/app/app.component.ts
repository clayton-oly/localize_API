import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend-empresas';

  constructor(private authService: AuthService, private router: Router) {}

  logout() {
    this.authService.logout(); // Chama o logout do AuthService
    this.router.navigate(['/login']);  // Redireciona para a página de login
  }

  isLoggedIn(): boolean {
    return this.authService.isAuthenticated();  // Verifica se o usuário está autenticado
  }
}
