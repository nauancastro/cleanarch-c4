import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface CartItem {
    product: any;
    quantity: number;
}

@Injectable({
    providedIn: 'root'
})
export class CartService {
    private itemsSubject = new BehaviorSubject<CartItem[]>([]);
    items$ = this.itemsSubject.asObservable();

    addToCart(product: any) {
        const currentItems = this.itemsSubject.value;
        const existingItem = currentItems.find(i => i.product.id === product.id);

        if (existingItem) {
            existingItem.quantity++;
        } else {
            currentItems.push({ product, quantity: 1 });
        }

        this.itemsSubject.next([...currentItems]);
    }

    getItems() {
        return this.itemsSubject.value;
    }

    clearCart() {
        this.itemsSubject.next([]);
    }

    getTotal(): number {
        return this.itemsSubject.value.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
    }
}
