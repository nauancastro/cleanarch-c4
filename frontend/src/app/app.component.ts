import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from './services/product.service';
import { Product } from './models/product.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  template: `
    <header class="header">
      <h1>🧶 Malibu Ateliê</h1>
      <p>Peças exclusivas em crochê, feitas à mão com amor</p>
    </header>

    <main class="catalog">
      <h2>Nosso Catálogo</h2>
      
      <div class="loading" *ngIf="loading">Carregando produtos...</div>
      <div class="error" *ngIf="error">{{ error }}</div>
      
      <div class="products-grid" *ngIf="!loading && !error">
        <div class="product-card" *ngFor="let product of products">
          <img [src]="product.imageUrl" [alt]="product.name" class="product-image">
          <div class="product-info">
            <h3>{{ product.name }}</h3>
            <p class="description">{{ product.description }}</p>
            <p class="price">R$ {{ product.price | number:'1.2-2' }}</p>
          </div>
        </div>
      </div>
    </main>

    <footer class="footer">
      <p>© 2025 Malibu Ateliê - Floriano, PI</p>
    </footer>
  `,
  styles: [`
    .header {
      background: linear-gradient(135deg, #d4a574 0%, #c49b6f 100%);
      color: white;
      text-align: center;
      padding: 3rem 1rem;
    }

    .header h1 {
      font-size: 2.5rem;
      margin-bottom: 0.5rem;
    }

    .header p {
      font-size: 1.1rem;
      opacity: 0.9;
    }

    .catalog {
      max-width: 1200px;
      margin: 0 auto;
      padding: 2rem 1rem;
    }

    .catalog h2 {
      text-align: center;
      font-size: 2rem;
      margin-bottom: 2rem;
      color: #5a4a3a;
    }

    .loading, .error {
      text-align: center;
      padding: 2rem;
      font-size: 1.2rem;
    }

    .error {
      color: #d32f2f;
    }

    .products-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 2rem;
    }

    .product-card {
      background: white;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 4px 15px rgba(0,0,0,0.1);
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }

    .product-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 8px 25px rgba(0,0,0,0.15);
    }

    .product-image {
      width: 100%;
      height: 250px;
      object-fit: cover;
    }

    .product-info {
      padding: 1.5rem;
    }

    .product-info h3 {
      font-family: 'Playfair Display', serif;
      font-size: 1.3rem;
      color: #5a4a3a;
      margin-bottom: 0.5rem;
    }

    .description {
      color: #777;
      font-size: 0.9rem;
      margin-bottom: 1rem;
      line-height: 1.5;
    }

    .price {
      font-size: 1.4rem;
      font-weight: 600;
      color: #d4a574;
    }

    .footer {
      background: #5a4a3a;
      color: white;
      text-align: center;
      padding: 1.5rem;
      margin-top: 3rem;
    }
  `]
})
export class AppComponent implements OnInit {
  products: Product[] = [];
  loading = true;
  error = '';

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe({
      next: (products) => {
        this.products = products;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Erro ao carregar produtos. Verifique se o backend está rodando.';
        this.loading = false;
        console.error('Erro:', err);
      }
    });
  }
}
