import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CarrelloComponent } from './pages/carrello/carrello.component';
import { PreferitiComponent } from './pages/preferiti/preferiti.component';

const routes: Routes = [
  {
  path: '',
  component: HomeComponent
},
  {
  path: 'carrello',
  component: CarrelloComponent
},
  {
  path: 'preferiti',
  component: PreferitiComponent
},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
