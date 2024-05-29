import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { CarrelloComponent } from './pages/carrello/carrello.component';
import { PreferitiComponent } from './pages/preferiti/preferiti.component';
import { HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from './main-components/navbar/navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CarrelloComponent,
    PreferitiComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
