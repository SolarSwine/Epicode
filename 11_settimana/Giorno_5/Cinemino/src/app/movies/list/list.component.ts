import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../auth/auth.service';
import { iMovie } from '../../Models/i-movie'; // Assicurati che il percorso sia corretto

@Component({
  selector: 'app-movie-list',
  templateUrl: './list.component.html'
})
export class ListComponent implements OnInit {
  movies: iMovie[] = [];
  favorites: any[] = [];

  constructor(private http: HttpClient, private authService: AuthService) {}

  ngOnInit() {
    this.http.get<iMovie[]>('http://localhost:3000/movies-popular').subscribe(data => {
      this.movies = data;
    });
    this.loadFavorites();
  }

  loadFavorites() {
    const userId = this.authService.getUserId();
    this.http.get<any[]>(`http://localhost:3000/favorites?userId=${userId}`).subscribe(data => {
      this.favorites = data;
    });
  }

  addToFavorites(movieId: number) {
    const userId = this.authService.getUserId();
    const favorite = { id: userId, movieId }; 
    if (!this.isFavorite(movieId)) {
      this.http.post('http://localhost:3000/favorites', favorite).subscribe(() => {
        this.loadFavorites();
      });
    } else {
      console.log('Movie already exists in favorites for the current user.');
    }
  }

  isFavorite(movieId: number): boolean {
    const userId = this.authService.getUserId();
    return this.favorites.some(fav => fav.id === userId && fav.movieId === movieId);
  }
}
