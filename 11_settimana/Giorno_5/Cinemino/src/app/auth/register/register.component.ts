import { Component } from '@angular/core';
import { iUser } from '../../Models/i-user';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  newUser: Partial<iUser> = {};
  errorMessage: string = ''; 
  successMessage: string = '';

  constructor(private authSvc: AuthService, private router: Router) {}

  register() {
    this.authSvc.register(this.newUser).subscribe({
      next: () => {
        this.successMessage = 'Registration successful!';
        setTimeout(() => {
          this.router.navigate(['/']);
        }, 2000);
      },
      error: (error) => {
        console.error('Registration failed:', error);
        this.errorMessage = 'Registration failed: ' + (error.error?.message || error.message || 'Unknown error');
      }
    });
  }
}
