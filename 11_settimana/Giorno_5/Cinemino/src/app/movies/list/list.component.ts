import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../auth/auth.service';
import { iMovie } from '../../Models/i-movie';
import { iFavorite } from '../../Models/i-favorite'; // Import the new interface

@Component({
  selector: 'app-movie-list',
  templateUrl: './list.component.html'
})
export class ListComponent implements OnInit {
  movies: iMovie[] = [];
  favorites: iFavorite[] = []; // Update the type of favorites array
  userId: string | null = null;

  constructor(private http: HttpClient, private authService: AuthService) {}

  ngOnInit() {
    this.http.get<iMovie[]>('http://localhost:3000/movies-popular').subscribe(data => {
      this.movies = data;
    });
    this.loadFavorites();
    this.authService.getUserId().subscribe(userId => {
      this.userId = userId;
    });
  }

  loadFavorites() {
    this.authService.user$.subscribe(user => {
      if (user) {
        this.http.get<iFavorite[]>(`http://localhost:3000/favorites?userId=${user.id}`).subscribe(data => {
          this.favorites = data;
        });
      } else {
        this.favorites = [];
      }
    });
  }

  addToFavorites(movieId: number) {
    if (!this.isFavorite(movieId)) {
      this.authService.getUserId().subscribe(userId => {
        if (userId) {
          const favorite: iFavorite = { id: userId, movieId }; // Use the iFavorite interface
          this.http.post('http://localhost:3000/favorites', favorite).subscribe(() => {
            this.loadFavorites();
          });
        }
      });
    } else {
      console.log('Movie already exists in favorites for the current user.');
    }
  }

  isFavorite(movieId: number): boolean {
    return this.favorites.some(fav => fav.id === this.userId && fav.movieId === movieId);
  }
}
