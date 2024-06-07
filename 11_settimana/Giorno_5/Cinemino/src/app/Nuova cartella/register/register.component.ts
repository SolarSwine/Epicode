import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent {
  error: string | null = null;

  constructor(private http: HttpClient, private router: Router, private authService: AuthService) {}

  register(username: string, password: string) {
    const user = { username, password };
    this.http.post('http://localhost:3000/register', user).subscribe({
      next: () => this.login(username, password),
      error: (err) => {
        console.error('Registration error:', err);
        this.error = err.error.message || 'Registration failed';
      }
    });
  }

  private login(username: string, password: string) {
    const user = { username, password };
    this.http.post<{ access_token: string }>('http://localhost:3000/login', user).subscribe({
      next: response => {
        this.authService.setSession(response.access_token);
        /* this.router.navigate(['/movies']); */
      },
      error: (err) => {
        console.error('Login error:', err);
        this.error = err.error.message || 'Login failed';
      }
    });
  }
}
