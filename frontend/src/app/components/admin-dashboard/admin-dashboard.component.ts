import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';

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
        <h3>{{ editingId ? 'Editar Produto' : 'Adicionar Novo Produto' }}</h3>
        
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
          <p class="help-text" *ngIf="editingId && !selectedFile">Deixe vazio para manter a imagem atual.</p>
        </div>

        <div class="error" *ngIf="error">{{ error }}</div>
        <div class="success" *ngIf="success">{{ success }}</div>

        <div class="actions">
          <button (click)="saveProduct()" [disabled]="loading" class="btn-submit">
            {{ loading ? 'Salvando...' : (editingId ? 'Atualizar Produto' : 'Cadastrar Produto') }}
          </button>
          <button *ngIf="editingId" (click)="cancelEdit()" class="btn-cancel" [disabled]="loading">
            Cancelar
          </button>
        </div>
      </div>

      <div class="product-list-section">
        <h3>Produtos Cadastrados</h3>
        
        <div *ngIf="loadingProducts" class="loading">Carregando produtos...</div>
        
        <div class="product-grid" *ngIf="!loadingProducts">
          <div class="product-item" *ngFor="let product of products">
            <img [src]="product.imageUrl" [alt]="product.name" class="product-thumb">
            <div class="product-info">
              <h4>{{ product.name }}</h4>
              <p class="price">R$ {{ product.price.toFixed(2) }}</p>
            </div>
            <div class="product-actions">
              <button class="btn-edit" (click)="startEdit(product)">Editar</button>
              <button class="btn-delete" (click)="deleteProduct(product.id)">Excluir</button>
            </div>
          </div>
        </div>
        <div *ngIf="products.length === 0 && !loadingProducts" class="empty-state">
            Nenhum produto cadastrado.
        </div>
      </div>
    </div>
  `,
  styles: [`
    .admin-container { max-width: 900px; margin: 2rem auto; padding: 0 1rem; }
    .header-section { margin-bottom: 2rem; text-align: center; }
    h2 { color: #5a4a3a; margin-bottom: 0.5rem; }
    
    .card { background: white; padding: 2rem; border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.1); margin-bottom: 2rem; }
    h3 { margin-bottom: 1rem; color: #333; border-bottom: 1px solid #eee; padding-bottom: 1rem; }
    
    .form-group { margin-bottom: 1.5rem; }
    label { display: block; margin-bottom: 0.5rem; font-weight: 500; color: #555; }
    .help-text { font-size: 0.85rem; color: #777; margin-top: 0.25rem; }
    
    .form-control {
      width: 100%; padding: 0.8rem; border: 1px solid #ddd; border-radius: 8px; font-size: 1rem;
    }
    textarea.form-control { resize: vertical; }

    .actions { display: flex; gap: 1rem; }
    .btn-submit {
      flex: 2; padding: 1rem; background: #d4a574; color: white; border: none; border-radius: 8px; font-size: 1.1rem; cursor: pointer; transition: background 0.3s;
    }
    .btn-submit:hover { background: #c49b6f; }
    .btn-submit:disabled { opacity: 0.7; }

    .btn-cancel {
        flex: 1; padding: 1rem; background: #9e9e9e; color: white; border: none; border-radius: 8px; font-size: 1.1rem; cursor: pointer; transition: background 0.3s;
    }
    .btn-cancel:hover { background: #757575; }

    .error { color: #d32f2f; margin-bottom: 1rem; background: #ffebee; padding: 0.8rem; border-radius: 6px; }
    .success { color: #1b5e20; margin-bottom: 1rem; background: #e8f5e9; padding: 0.8rem; border-radius: 6px; }

    /* List Styles */
    .product-list-section { margin-top: 3rem; }
    .product-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 1.5rem; }
    
    .product-item { 
        background: white; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); overflow: hidden; 
        display: flex; flex-direction: column;
    }
    .product-thumb { width: 100%; h-eight: 200px; object-fit: cover; }
    .product-info { padding: 1rem; flex: 1; }
    .product-info h4 { margin: 0 0 0.5rem; font-size: 1.1rem; color: #333; }
    .product-info .price { color: #d4a574; font-weight: bold; margin: 0; }

    .product-actions { 
        padding: 1rem; background: #f9f9f9; display: flex; gap: 0.5rem; border-top: 1px solid #eee; 
    }
    .btn-edit, .btn-delete {
        flex: 1; padding: 0.5rem; border: none; border-radius: 4px; cursor: pointer; font-weight: 500; transition: background 0.2s;
    }
    .btn-edit { background: #e0e0e0; color: #333; }
    .btn-edit:hover { background: #d0d0d0; }
    
    .btn-delete { background: #ffcdd2; color: #c62828; }
    .btn-delete:hover { background: #ef9a9a; }
    
    .loading, .empty-state { text-align: center; color: #777; padding: 2rem; font-style: italic; }
  `]
})
export class AdminDashboardComponent implements OnInit {
  products: Product[] = [];
  loadingProducts = false;

  name = '';
  description = '';
  price: number | null = null;
  selectedFile: File | null = null;
  editingId: string | null = null;

  loading = false;
  error = '';
  success = '';

  constructor(private productService: ProductService, private router: Router) { }

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.loadingProducts = true;
    this.productService.getProducts().subscribe({
      next: (products) => {
        this.products = products;
        this.loadingProducts = false;
      },
      error: (err) => {
        console.error('Error loading products', err);
        this.loadingProducts = false;
      }
    });
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  startEdit(product: Product) {
    this.editingId = product.id;
    this.name = product.name;
    this.description = product.description;
    this.price = product.price;
    this.selectedFile = null; // Don't pre-fill file input
    this.windowScrollToTop();
    this.success = '';
    this.error = '';
  }

  cancelEdit() {
    this.resetForm();
  }

  windowScrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  deleteProduct(id: string) {
    if (!confirm('Tem certeza que deseja excluir este produto?')) return;

    this.productService.deleteProduct(id).subscribe({
      next: () => {
        this.products = this.products.filter(p => p.id !== id);
        // If we were editing the deleted product, reset form
        if (this.editingId === id) {
          this.resetForm();
        }
      },
      error: (err) => {
        console.error(err);
        alert('Erro ao excluir produto.');
      }
    });
  }

  saveProduct() {
    if (!this.name || !this.price) {
      this.error = 'Nome e Preço são obrigatórios.';
      return;
    }

    // For creation, image is required. For update, it is optional.
    if (!this.editingId && !this.selectedFile) {
      this.error = 'Selecione uma imagem para o novo produto.';
      return;
    }

    this.loading = true;
    this.error = '';
    this.success = '';

    const formData = new FormData();
    formData.append('name', this.name);
    formData.append('description', this.description);
    formData.append('price', this.price.toString());
    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    }

    if (this.editingId) {
      // Update
      this.productService.updateProduct(this.editingId, formData).subscribe({
        next: (updatedProduct) => {
          this.success = 'Produto atualizado com sucesso!';
          this.loading = false;

          // Update list locally
          const index = this.products.findIndex(p => p.id === updatedProduct.id);
          if (index !== -1) {
            this.products[index] = updatedProduct;
          }

          this.resetForm();
        },
        error: (err) => {
          console.error(err);
          this.error = 'Erro ao atualizar produto.';
          this.loading = false;
        }
      });
    } else {
      // Create
      this.productService.createProduct(formData).subscribe({
        next: (newProduct) => {
          this.success = 'Produto criado com sucesso!';
          this.loading = false;
          this.products.push(newProduct);
          this.resetForm();
        },
        error: (err) => {
          console.error(err);
          this.error = 'Erro ao criar produto. Verifique se você está logado como admin.';
          this.loading = false;
        }
      });
    }
  }

  resetForm() {
    this.name = '';
    this.description = '';
    this.price = null;
    this.selectedFile = null;
    this.editingId = null;
    this.error = '';
    // success message might persist briefly or clear
  }
}
