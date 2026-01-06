import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="admin-container">
      <div class="header-section">
        <h2>Painel Administrativo</h2>
        <p>Gerencie os produtos da loja</p>
      </div>

      <div class="card form-card">
        <h3>Adicionar Novo Produto</h3>
        
        <div class="form-group">
          <label>Nome do Produto</label>
          <input type="text" [(ngModel)]="name" class="form-control" placeholder="Ex: Bolsa Crochê">
        </div>

        <div class="form-group">
          <label>Descrição</label>
          <textarea [(ngModel)]="description" class="form-control" rows="3" placeholder="Detalhes do produto..."></textarea>
        </div>

        <div class="form-group">
          <label>Preço (R$)</label>
          <input type="number" [(ngModel)]="price" class="form-control" placeholder="0.00">
        </div>

        <div class="form-group">
          <label>Imagem</label>
          <input type="file" (change)="onFileSelected($event)" class="form-control">
        </div>

        <div class="error" *ngIf="error">{{ error }}</div>
        <div class="success" *ngIf="success">{{ success }}</div>

        <button (click)="createProduct()" [disabled]="loading" class="btn-submit">
          {{ loading ? 'Salvando...' : 'Cadastrar Produto' }}
        </button>
      </div>
    </div>
  `,
  styles: [`
    .admin-container { max-width: 800px; margin: 2rem auto; padding: 0 1rem; }
    .header-section { margin-bottom: 2rem; text-align: center; }
    h2 { color: #5a4a3a; margin-bottom: 0.5rem; }
    
    .card { background: white; padding: 2rem; border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.1); }
    h3 { margin-bottom: 1.5rem; color: #333; border-bottom: 1px solid #eee; padding-bottom: 1rem; }
    
    .form-group { margin-bottom: 1.5rem; }
    label { display: block; margin-bottom: 0.5rem; font-weight: 500; color: #555; }
    
    .form-control {
      width: 100%; padding: 0.8rem; border: 1px solid #ddd; border-radius: 8px; font-size: 1rem;
    }
    textarea.form-control { resize: vertical; }

    .btn-submit {
      width: 100%; padding: 1rem; background: #d4a574; color: white; border: none; border-radius: 8px; font-size: 1.1rem; cursor: pointer; transition: background 0.3s;
    }
    .btn-submit:hover { background: #c49b6f; }
    .btn-submit:disabled { opacity: 0.7; }

    .error { color: #d32f2f; margin-bottom: 1rem; background: #ffebee; padding: 0.8rem; border-radius: 6px; }
    .success { color: #1b5e20; margin-bottom: 1rem; background: #e8f5e9; padding: 0.8rem; border-radius: 6px; }
  `]
})
export class AdminDashboardComponent {
  name = '';
  description = '';
  price: number | null = null;
  selectedFile: File | null = null;

  loading = false;
  error = '';
  success = '';

  constructor(private productService: ProductService, private router: Router) { }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  createProduct() {
    if (!this.name || !this.price || !this.selectedFile) {
      this.error = 'Preencha todos os campos obrigatórios e selecione uma imagem.';
      return;
    }

    this.loading = true;
    this.error = '';
    this.success = '';

    const formData = new FormData();
    formData.append('name', this.name);
    formData.append('description', this.description);
    formData.append('price', this.price.toString());
    formData.append('image', this.selectedFile);

    this.productService.createProduct(formData).subscribe({
      next: () => {
        this.success = 'Produto criado com sucesso!';
        this.loading = false;
        this.resetForm();
        setTimeout(() => this.router.navigate(['/']), 1500);
      },
      error: (err) => {
        console.error(err);
        this.error = 'Erro ao criar produto. Verifique se você está logado como admin.';
        this.loading = false;
      }
    });
  }

  resetForm() {
    this.name = '';
    this.description = '';
    this.price = null;
    this.selectedFile = null;
  }
}
