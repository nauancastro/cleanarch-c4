import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { FreightService, FreightResult } from '../../services/freight.service';
import { Product } from '../../models/product.model';

@Component({
    selector: 'app-product-detail',
    standalone: true,
    imports: [CommonModule, FormsModule],
    template: `
    <div class="detail-container" *ngIf="product">
      <div class="detail-grid">
        <div class="image-section">
          <img [src]="product.imageUrl" [alt]="product.name">
        </div>
        <div class="info-section">
          <h1>{{ product.name }}</h1>
          <p class="price">R$ {{ product.price | number:'1.2-2' }}</p>
          <p class="description">{{ product.description }}</p>

          <div class="freight-section">
            <h3>Calculadora de Frete</h3>
            <div class="freight-input">
              <input type="text" [(ngModel)]="zipCode" placeholder="CEP (ex: 12345-678)" maxlength="9">
              <button (click)="calculateFreight()" [disabled]="loadingFreight">Calcular</button>
            </div>
            
            <div class="freight-result" *ngIf="freightResult">
              <p>Valor: <strong>R$ {{ freightResult.value | number:'1.2-2' }}</strong></p>
              <p>Prazo: <strong>{{ freightResult.days }} dias úteis</strong></p>
            </div>
          </div>

          <button class="btn-buy" (click)="addToCart()">Adicionar ao Carrinho</button>
        </div>
      </div>
    </div>
    <div class="loading" *ngIf="!product">Carregando...</div>
  `,
    styles: [`
    .detail-container {
      max-width: 1100px;
      margin: 2rem auto;
      padding: 0 1rem;
    }
    
    .detail-grid {
      display: grid; 
      grid-template-columns: 1fr 1fr; 
      gap: 3rem;
    }
    
    @media (max-width: 768px) {
      .detail-grid { grid-template-columns: 1fr; }
    }

    .image-section img {
      width: 100%;
      border-radius: 12px;
    }

    .info-section h1 { font-family: 'Playfair Display', serif; font-size: 2.5rem; color: #5a4a3a; }
    .price { font-size: 2rem; color: #d4a574; font-weight: bold; margin: 1rem 0; }
    .description { color: #666; line-height: 1.6; font-size: 1.1rem; margin-bottom: 2rem; }

    .freight-section {
      background: white;
      padding: 1.5rem;
      border-radius: 12px;
      margin-bottom: 2rem;
      border: 1px solid #eee;
    }

    .freight-section h3 { margin-bottom: 1rem; font-size: 1rem; color: #555; }

    .freight-input { display: flex; gap: 1rem; margin-bottom: 1rem; }
    .freight-input input {
      flex: 1; padding: 0.8rem; border: 1px solid #ddd; border-radius: 8px;
    }
    .freight-input button {
      padding: 0 1.5rem; background: #555; color: white; border: none; border-radius: 8px; cursor: pointer;
    }

    .freight-result {
      background: #f9f9f9; padding: 1rem; border-radius: 8px; font-size: 0.95rem;
    }
    .freight-result p { margin: 0.3rem 0; }

    .btn-buy {
      width: 100%;
      padding: 1.2rem;
      background: #d4a574;
      color: white;
      border: none;
      border-radius: 8px;
      font-size: 1.2rem;
      cursor: pointer;
      transition: transform 0.2s;
    }
    .btn-buy:hover { transform: scale(1.02); }
  `]
})
export class ProductDetailComponent implements OnInit {
    product: Product | null = null;
    zipCode = '';
    loadingFreight = false;
    freightResult: FreightResult | null = null;

    constructor(
        private route: ActivatedRoute,
        private productService: ProductService,
        private cartService: CartService,
        private freightService: FreightService,
        private router: Router
    ) { }

    ngOnInit(): void {
        const id = this.route.snapshot.paramMap.get('id');
        if (id) {
            this.productService.getProductById(id).subscribe(p => this.product = p);
        }
    }

    calculateFreight() {
        if (!this.zipCode) return;
        this.loadingFreight = true;
        this.freightService.calculate(this.zipCode).subscribe({
            next: (res) => {
                this.freightResult = res;
                this.loadingFreight = false;
            },
            error: () => this.loadingFreight = false
        });
    }

    addToCart() {
        if (this.product) {
            this.cartService.addToCart(this.product);
            this.router.navigate(['/checkout']);
        }
    }
}
