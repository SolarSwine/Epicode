import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar.component';
import { HttpClientModule } from '@angular/common/http';
import { RegisterModule } from './components/register/register.module';
import { LoginModule } from './components/login/login.module';
import { ProfileModule } from './components/profile/profile.module';




@NgModule({
  declarations: [AppComponent, NavbarComponent],
  imports: [BrowserModule, ReactiveFormsModule, FormsModule, AppRoutingModule, HttpClientModule, RegisterModule, LoginModule, ProfileModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
