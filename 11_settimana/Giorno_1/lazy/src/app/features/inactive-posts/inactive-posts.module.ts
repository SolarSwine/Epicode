import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { InactivePostsPage } from './inactive-posts.page';
import { PostDetailsPage } from 'src/app/shared/post-details.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { PostsService } from 'src/app/posts.service';


const routes: Routes = [
  { path: '', component: InactivePostsPage },
  {
    path:':id',
    component:PostDetailsPage
  }
];

@NgModule({
  declarations: [
    InactivePostsPage
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ],
})
export class InactivePostsModule { }
