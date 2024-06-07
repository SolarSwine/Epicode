import { switchMap } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../auth/auth.service';
import { iMovie } from '../../Models/i-movie';
import { iFavorite } from '../../Models/i-favorite'; // Import the new interface
import { EMPTY } from 'rxjs';

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
    // Check if the movie is already in favorites
    const isAlreadyFavorite = this.isFavorite(movieId);

    // If the movie is already a favorite, remove it; otherwise, add it
    const action = isAlreadyFavorite ? 'remove' : 'add';

    // Get the user ID
    this.authService.getUserId().pipe(
      switchMap(userId => {
        // If userId exists, proceed
        if (userId) {
          // If the action is to add, create a new favorite; otherwise, find and remove the favorite
          if (action === 'add') {
            const favorite = { userId, movieId };
            return this.http.post('http://localhost:3000/favorites', favorite);
          } else {
            // Find the favorite by movieId and userId and remove it
            const favoriteToRemove = this.favorites.find(fav => fav.userId === userId && fav.movieId === movieId);
            if (favoriteToRemove) {
              return this.http.delete(`http://localhost:3000/favorites/${favoriteToRemove.id}`);
            } else {
              console.error('Favorite not found for removal.');
              return EMPTY;
            }
          }
        } else {
          // Handle the case where userId is null or undefined
          console.error('User ID is null or undefined.');
          return EMPTY;
        }
      })
    ).subscribe(() => {
      // After successfully adding or removing the favorite, reload the favorites list
      this.loadFavorites();
    }, error => {
      // Handle errors from the HTTP request
      console.error('Error:', error);
    });
  }

  isFavorite(movieId: number): boolean {
    return this.favorites.some(fav => fav.userId === this.userId && fav.movieId === movieId);
  }
}
