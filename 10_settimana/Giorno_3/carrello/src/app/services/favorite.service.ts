import { Injectable } from '@angular/core';
import { Product } from '../modules/product';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {
  private favorites: Product[] = [];

  addToFavorites(product: Product): void {
    if (!this.favorites.find(item => item.id === product.id)) {
      this.favorites.push(product);
    }
  }

  getFavorites(): Product[] {
    return this.favorites;
  }
}
