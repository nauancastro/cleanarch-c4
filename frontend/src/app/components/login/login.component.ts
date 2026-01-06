import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="login-container">
      <div class="login-card">
        <h2>Admin Login</h2>
        <div class="form-group">
          <label>Usuário</label>
          <input type="text" [(ngModel)]="username" class="form-control" placeholder="admin">
        </div>
        <div class="form-group">
          <label>Senha</label>
          <input type="password" [(ngModel)]="password" class="form-control" placeholder="admin">
        </div>
        <div class="error" *ngIf="error">{{ error }}</div>
        <button (click)="login()" class="btn-login" [disabled]="loading">
          {{ loading ? 'Entrando...' : 'Entrar' }}
        </button>
      </div>
    </div>
  `,
  styles: [`
    .login-container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 60vh;
    }

    .login-card {
      background: white;
      padding: 2.5rem;
      border-radius: 12px;
      box-shadow: 0 4px 20px rgba(0,0,0,0.1);
      width: 100%;
      max-width: 400px;
    }

    h2 { text-align: center; color: #5a4a3a; margin-bottom: 2rem; }

    .form-group { margin-bottom: 1.5rem; }
    label { display: block; margin-bottom: 0.5rem; color: #666; }
    
    .form-control {
      width: 100%;
      padding: 0.8rem;
      border: 1px solid #ddd;
      border-radius: 8px;
      font-size: 1rem;
    }

    .btn-login {
      width: 100%;
      padding: 1rem;
      background: #d4a574;
      color: white;
      border: none;
      border-radius: 8px;
      font-size: 1rem;
      cursor: pointer;
      transition: background 0.3s;
    }
    .btn-login:hover { background: #c49b6f; }
    .btn-login:disabled { opacity: 0.7; }
    .error { color: red; margin-bottom: 1rem; text-align: center; }
  `]
})
export class LoginComponent {
  username = '';
  password = '';
  loading = false;
  error = '';

  constructor(private authService: AuthService, private router: Router) { }

  login() {
    this.loading = true;
    this.authService.login({ username: this.username, password: this.password }).subscribe({
      next: () => {
        this.router.navigate(['/admin']);
      },
      error: () => {
        this.error = 'Credenciais inválidas';
        this.loading = false;
      }
    });
  }
}
