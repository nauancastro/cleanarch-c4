import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="container products-container">
      <h2>Nosso Catálogo</h2>
      
      <div class="loading" *ngIf="loading">Carregando produtos...</div>
      <div class="error" *ngIf="error">{{ error }}</div>
      
      <div class="products-grid" *ngIf="!loading && !error">
        <a [routerLink]="['/product', product.id]" class="product-card" *ngFor="let product of products">
          <img [src]="product.imageUrl" [alt]="product.name" class="product-image">
          <div class="product-info">
            <h3>{{ product.name }}</h3>
            <p class="price">R$ {{ product.price | number:'1.2-2' }}</p>
          </div>
        </a>
      </div>
    </div>
  `,
  styles: [`
    .products-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 1rem;
    }

    h2 {
      text-align: center;
      font-size: 2rem;
      margin-bottom: 2rem;
      color: #5a4a3a;
    }

    .products-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
      gap: 2rem;
    }

    .product-card {
      background: white;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 4px 15px rgba(0,0,0,0.05);
      transition: transform 0.3s ease, box-shadow 0.3s ease;
      text-decoration: none;
      color: inherit;
      display: block;
    }

    .product-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 8px 25px rgba(0,0,0,0.1);
    }

    .product-image {
      width: 100%;
      height: 250px;
      object-fit: cover;
    }

    .product-info {
      padding: 1.5rem;
      text-align: center;
    }

    .product-info h3 {
      font-size: 1.2rem;
      color: #5a4a3a;
      margin-bottom: 0.5rem;
    }

    .price {
      font-size: 1.3rem;
      font-weight: 600;
      color: #d4a574;
    }
    
    .loading, .error { text-align: center; padding: 2rem; }
    .error { color: #d32f2f; }
  `]
})
export class HomeComponent implements OnInit {
  products: Product[] = [];
  loading = true;
  error = '';

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.getProducts().subscribe({
      next: (products) => {
        this.products = products;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Erro ao carregar produtos.';
        this.loading = false;
      }
    });
  }
}
