import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ActivePostsComponent } from './components/active-posts/active-posts.component';
import { InactivePostsComponent } from './components/inactive-posts/inactive-posts.component';
import { PostDetailComponent } from './components/post-detail/post-detail.component';
import { FormsModule } from '@angular/forms';


const routes: Routes = [
  {
    path:'',
    redirectTo:'home',//redireziona l'utente
    pathMatch: 'full'//per far si che il path vuoto venga riconosciuto correttamente
  },
  {
    path:'home',
    component: HomeComponent
  },
  {
    path:'active-posts',
    component: ActivePostsComponent
  },
  {
    path:'inactive-posts',
    component: InactivePostsComponent
  },
  { path: 'post/:id', component: PostDetailComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes),
    FormsModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
