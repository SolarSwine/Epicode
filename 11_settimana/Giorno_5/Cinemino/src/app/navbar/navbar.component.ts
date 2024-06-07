import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  [x: string]: any;

  isLoggedIn:boolean = false

  constructor(private authSvc: AuthService){}

  ngOnInit(){

    this.authSvc.isLoggedIn$.subscribe(isLoggedIn => this.isLoggedIn = isLoggedIn )

  }

  logout(){
    this.authSvc.logout();

  }

  get authService(): AuthService {
    return this.authSvc;
  }


}


