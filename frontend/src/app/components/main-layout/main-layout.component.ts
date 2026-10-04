import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="layout-container">
      <header class="header">
        <div class="header-content">
          <a routerLink="/" class="brand">
            <h1>🧶 Malibu Ateliê</h1>
            <p>Peças exclusivas, feitas à mão</p>
          </a>
          <nav>
            <ng-container *ngIf="username; else guest">
                <span class="welcome-msg">Olá, {{ username }}</span>
                <a routerLink="/admin" class="nav-link">Dashboard</a>
                <button (click)="logout()" class="nav-link btn-logout">Sair</button>
            </ng-container>
            <ng-template #guest>
                <a routerLink="/login" class="nav-link">Admin Login</a>
            </ng-template>
            <a routerLink="/checkout" class="nav-link">Carrinho</a>
          </nav>
        </div>
      </header>

      <main class="content">
        <router-outlet></router-outlet>
      </main>

      <footer class="footer">
        <p>© 2025 Malibu Ateliê - Floriano, PI</p>
      </footer>
    </div>
  `,
  styles: [`
    .layout-container {
      display: flex;
      flex-direction: column;
      min-height: 100vh;
    }

    .header {
      background: linear-gradient(135deg, #d4a574 0%, #c49b6f 100%);
      color: white;
      padding: 1rem 0;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    }

    .header-content {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 1rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .brand {
      text-decoration: none;
      color: white;
    }

    .brand h1 { margin: 0; font-size: 1.8rem; }
    .brand p { margin: 0; opacity: 0.9; font-size: 0.9rem; }

    .nav-link {
      color: white;
      text-decoration: none;
      margin-left: 1.5rem;
      font-weight: 500;
      padding: 0.5rem 1rem;
      border-radius: 20px;
      background: rgba(255,255,255,0.1);
      transition: background 0.3s;
      border: none;
      cursor: pointer;
      font-size: 1rem;
    }

    .nav-link:hover {
      background: rgba(255,255,255,0.2);
    }
    
    .welcome-msg { margin-left: 1rem; font-weight: 500; }

    .content {
      flex: 1; /* This pushes the footer down */
      padding: 2rem 0;
      background-color: #faf8f5;
    }

    .footer {
      background: #5a4a3a;
      color: white;
      text-align: center;
      padding: 1.5rem;
      margin-top: auto; /* Sticky footer fallback */
    }
  `]
})
export class MainLayoutComponent {
  username: string | null = null;

  constructor(public authService: AuthService) {
    this.authService.currentUser$.subscribe(u => this.username = u);
  }

  logout() {
    this.authService.logout();
  }
}
