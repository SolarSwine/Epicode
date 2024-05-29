import { Component } from '@angular/core';
import { Product } from '../../modules/product';
import { ProductService } from '../../services/product.service';
import { FavoriteService } from '../../services/favorite.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  products: Product[] = [];

  constructor(
    private productService: ProductService,
    private favoriteService: FavoriteService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.productService.getAll().subscribe((data: Product[]) => {
      console.log(data); // Ensure this logs an array of products
      this.products = data;
    });
  }
  addToFavorites(product: Product): void {
    this.favoriteService.addToFavorites(product);
    console.log('Favorites:', this.favoriteService.getFavorites());
  }

  addToCart(product: Product): void {
    this.cartService.addToCart(product);
    console.log('Cart:', this.cartService.getCart());
  }

}
