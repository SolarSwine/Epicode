import { Component } from '@angular/core';
import { Product } from '../../modules/product';
import { FavoriteService } from '../../services/favorite.service';

@Component({
  selector: 'app-preferiti',
  templateUrl: './preferiti.component.html',
  styleUrl: './preferiti.component.scss'
})
export class PreferitiComponent {
  favorites: Product[] = [];

  constructor(private favoriteService: FavoriteService) {}

  ngOnInit(): void {
    this.favorites = this.favoriteService.getFavorites();
  }
}
