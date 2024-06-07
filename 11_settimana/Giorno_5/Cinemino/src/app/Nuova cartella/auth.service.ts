import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private logoutTimer: any;

  constructor(private router: Router) {}

  getToken(): string | null {
    return localStorage.getItem('access_token');
  }

  getUserId(): string | null {
    const token = this.getToken();
    if (token) {
      const decodedToken = this.decodeToken(token);
      return decodedToken ? decodedToken.userId : null;
    }
    return null;
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('access_token');
  }

  logout() {
    localStorage.removeItem('access_token');
    this.router.navigate(['auth/login']);
    if (this.logoutTimer) {
      clearTimeout(this.logoutTimer);
    }
  }

  autoLogout(expirationDate: number) {
    const expiresIn = expirationDate - new Date().getTime();
    this.logoutTimer = setTimeout(() => {
      this.logout();
    }, expiresIn);
  }

  setSession(token: string) {
    localStorage.setItem('access_token', token);
    const decodedToken = this.decodeToken(token);
    if (decodedToken) {
      const expirationDate = decodedToken.exp * 1000; 
      this.autoLogout(expirationDate);
    }
  }

  private decodeToken(token: string): any {
    try {
      const payload = token.split('.')[1];
      const decodedPayload = atob(payload);
      return JSON.parse(decodedPayload);
    } catch (e) {
      console.error('Invalid token:', e);
      return null;
    }
  }
}
