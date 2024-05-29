import { Injectable } from '@angular/core';
import { Product } from '../modules/product';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart: Product[] = [];

  addToCart(product: Product): void {
    if (!this.cart.find(item => item.id === product.id)) {
      this.cart.push(product);
    }
  }

  getCart(): Product[] {
    return this.cart;
  }
}
