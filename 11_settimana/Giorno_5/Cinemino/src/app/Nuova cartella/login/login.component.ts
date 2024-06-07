import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  constructor(private http: HttpClient, private router: Router, private authService: AuthService) {}

  login(username: string, password: string) {
    this.http.post<{ access_token: string }>('http://localhost:3000/login', { username, password })
      .subscribe(response => {
        this.authService.setSession(response.access_token);
        this.router.navigate(['/movies']);
      });
  }
}
