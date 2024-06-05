import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedIn = false;
  private userData: any = null;
  private apiURL = 'http://localhost:3000/users';

  constructor(private http: HttpClient, private router: Router) {}

  login(username: string, password: string): Observable<boolean> {
    return this.http.get<any[]>(`${this.apiURL}?username=${username}&password=${password}`)
      .pipe(
        map(users => {
          if (users.length > 0) {
            this.isLoggedIn = true;
            this.userData = users[0];
            localStorage.setItem('user', JSON.stringify(this.userData));
            localStorage.setItem('isLoggedIn', 'true');
            return true;
          } else {
            return false;
          }
        })
      );
  }

  register(user: any): Observable<any> {
    return this.http.post(this.apiURL, user).pipe(
      map(newUser => {
        this.userData = newUser;
        this.isLoggedIn = true;
        localStorage.setItem('user', JSON.stringify(this.userData));
        localStorage.setItem('isLoggedIn', 'true');
        return newUser;
      })
    );
  }

  logout(): void {
    this.isLoggedIn = false;
    this.userData = null;
    localStorage.removeItem('user');
    localStorage.removeItem('isLoggedIn');
    this.router.navigate(['/login']);
  }

  autoLogout(expirationTime: number): void {
    setTimeout(() => {
      this.logout();
    }, expirationTime);
  }

  isAuthenticated(): boolean {
    return localStorage.getItem('isLoggedIn') === 'true';
  }

  getUserData(): any {
    const userString = localStorage.getItem('user');
    if (userString) {
      return JSON.parse(userString);
    } else {
      return null;
    }
  }
}
