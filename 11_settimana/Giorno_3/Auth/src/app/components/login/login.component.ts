import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username: string | undefined;
  password: string | undefined;
  loginFailed: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  onLogin() {
    this.authService.login(this.username ?? '', this.password ?? '').subscribe(success => {
      if (success) {
        this.router.navigate(['/profile']);
      } else {
        this.loginFailed = true;
      }
    });
  }
}
