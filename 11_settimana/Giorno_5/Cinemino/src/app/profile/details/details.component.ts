import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../auth/auth.service';
import { Subscription, forkJoin } from 'rxjs';

@Component({
  selector: 'app-profile-details',
  templateUrl: './details.component.html'
})
export class DetailsComponent implements OnInit, OnDestroy {
  user: any;
  favorites: any[] = [];
  movies: any[] = [];
  userSubscription: Subscription | undefined;

  constructor(private http: HttpClient, private authService: AuthService) {}

  ngOnInit() {
    this.userSubscription = this.authService.user$.subscribe(user => {
      if (user) {
        this.user = user;
        this.loadFavorites(user.id.toString());
      } else {
        this.user = null;
        this.favorites = [];
        this.movies = [];
      }
    });
  }

  ngOnDestroy() {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }

  loadFavorites(userId: string) {
    this.http.get<any[]>(`http://localhost:3000/favorites?userId=${userId}`).subscribe({
      next: (data) => {
        console.log('Favorites loaded:', data);
        this.favorites = data;
        const uniqueMovieIds = [...new Set(this.favorites.map(fav => fav.movieId))];
        this.loadMovies(uniqueMovieIds);
      },
      error: (error) => {
        console.error('Failed to load favorites:', error);
      }
    });
  }

  loadMovies(movieIds: number[]) {
    const movieRequests = movieIds.map(movieId =>
      this.http.get<any>(`http://localhost:3000/movies-popular/${movieId}`)
    );

    forkJoin(movieRequests).subscribe({
      next: (movies) => {
        console.log('Movies loaded:', movies);
        const userFavoriteMovieIds = this.favorites.map(fav => fav.movieId);
        this.movies = movies.filter(movie => userFavoriteMovieIds.includes(movie.id));
      },
      error: (error) => {
        console.error('Failed to load movies:', error);
      }
    });
  }

  removeFromFavorites(movieId: number) {
    // Find all favorites with the corresponding movieId
    const favoritesToRemove = this.favorites.filter(fav => fav.movieId === movieId);

    // Create an array of delete requests for each favorite
    const deleteRequests = favoritesToRemove.map(favorite =>
      this.http.delete(`http://localhost:3000/favorites/${favorite.id}`)
    );

    forkJoin(deleteRequests).subscribe({
      next: () => {
        console.log('Favorites removed:', favoritesToRemove.map(fav => fav.id));
        // Remove the deleted favorites and associated movie from the local arrays
        this.favorites = this.favorites.filter(fav => fav.movieId !== movieId);
        this.movies = this.movies.filter(movie => movie.id !== movieId);
      },
      error: (error) => {
        console.error('Failed to remove favorites:', error);
      }
    });
  }
}
