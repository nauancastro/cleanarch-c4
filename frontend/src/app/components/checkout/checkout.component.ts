import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService, CartItem } from '../../services/cart.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="checkout-container">
      <h2>Finalizar Compra</h2>

      <div class="empty-cart" *ngIf="items.length === 0">
        <p>Seu carrinho está vazio.</p>
        <a href="/" class="btn-back">Voltar para a loja</a>
      </div>

      <div class="checkout-grid" *ngIf="items.length > 0">
        <div class="cart-items">
          <div class="item" *ngFor="let item of items">
            <img [src]="item.product.imageUrl" [alt]="item.product.name">
            <div class="item-info">
              <h4>{{ item.product.name }}</h4>
              <p>Qtd: {{ item.quantity }}</p>
              <p class="price">R$ {{ item.product.price | number:'1.2-2' }}</p>
            </div>
          </div>
          <div class="total-row">
            <h3>Total: R$ {{ total | number:'1.2-2' }}</h3>
          </div>
        </div>

        <div class="payment-section" *ngIf="!success">
          <h3>Dados de Pagamento (Simulação)</h3>
          <p class="info">Para este MVP, o checkout é apenas uma simulação visual.</p>
          <div class="mock-card">
            <div class="card-line"></div>
            <div class="card-line short"></div>
          </div>
          <button class="btn-pay" (click)="pay()">Pagar Agora</button>
        </div>

        <div class="success-message" *ngIf="success">
          <h3>Pedido Confirmado!</h3>
          <p>Obrigado pela sua compra. Enviamos um email com os detalhes.</p>
          <button class="btn-back" (click)="reset()">Comprar Novamente</button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .checkout-container { max-width: 900px; margin: 2rem auto; padding: 0 1rem; }
    h2 { text-align: center; color: #5a4a3a; margin-bottom: 2rem; }
    
    .checkout-grid { display: grid; grid-template-columns: 1.5fr 1fr; gap: 2rem; }
    @media(max-width: 768px) { .checkout-grid { grid-template-columns: 1fr; } }

    .cart-items { background: white; padding: 1.5rem; border-radius: 12px; }
    .item { display: flex; gap: 1rem; margin-bottom: 1.5rem; border-bottom: 1px solid #eee; padding-bottom: 1rem; }
    .item img { width: 80px; height: 80px; object-fit: cover; border-radius: 8px; }
    .item h4 { margin: 0 0 0.5rem 0; color: #333; }
    .price { color: #d4a574; font-weight: bold; }
    
    .total-row { text-align: right; border-top: 2px solid #eee; padding-top: 1rem; }
    
    .payment-section { background: white; padding: 1.5rem; border-radius: 12px; height: fit-content; }
    .mock-card { background: #f0f0f0; height: 120px; border-radius: 8px; margin: 1.5rem 0; padding: 1rem; }
    .card-line { height: 10px; background: #ddd; margin-bottom: 10px; border-radius: 4px; }
    .short { width: 60%; }
    
    .btn-pay { width: 100%; padding: 1rem; background: #28a745; color: white; border: none; border-radius: 8px; font-size: 1.1rem; cursor: pointer; }
    .btn-pay:hover { background: #218838; }

    .success-message { text-align: center; background: #d4edda; color: #155724; padding: 2rem; border-radius: 12px; grid-column: 1 / -1; }
    
    .btn-back { display: inline-block; padding: 0.8rem 1.5rem; background: #5a4a3a; color: white; text-decoration: none; border-radius: 8px; margin-top: 1rem; cursor: pointer; border: none; }
  `]
})
export class CheckoutComponent implements OnInit {
  items: CartItem[] = [];
  total = 0;
  success = false;

  constructor(private cartService: CartService) { }

  ngOnInit() {
    this.items = this.cartService.getItems();
    this.total = this.cartService.getTotal();
  }

  pay() {
    this.success = true;
    this.cartService.clearCart();
  }

  reset() {
    this.success = false;
    this.items = [];
    this.total = 0;
  }
}
