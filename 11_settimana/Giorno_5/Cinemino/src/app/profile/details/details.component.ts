import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-profile-details',
  templateUrl: './details.component.html'
})
export class DetailsComponent implements OnInit, OnDestroy {
  user: any;
  favorites: any[] = [];
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
        // Filter favorites based on user id
        this.favorites = data.filter(fav => fav.id === parseInt(userId, 10));
        this.loadFavoriteMovies(this.favorites);
      },
      error: (error) => {
        console.error('Failed to load favorites:', error);
      }
    });
  }

  loadFavoriteMovies(favorites: any[]) {
    const movieRequests = favorites.map(fav =>
      this.http.get<any>(`http://localhost:3000/movies-popular/${fav.movieId}`).toPromise()
    );

    Promise.all(movieRequests).then(movies => {
      this.favorites = favorites.map((fav, index) => ({
        ...fav,
        movie: movies[index]
      }));
      console.log('Favorites with movies loaded:', this.favorites);
    }).catch(error => {
      console.error('Failed to load favorite movies:', error);
    });
  }

  removeFromFavorites(favoriteId: number) {
    this.http.delete(`http://localhost:3000/favorites/${favoriteId}`).subscribe({
      next: () => {
        console.log('Favorite removed:', favoriteId);
        if (this.user) {
          this.loadFavorites(this.user.id.toString());
        }
      },
      error: (error) => {
        console.error('Failed to remove favorite:', error);
      }
    });
  }
}
