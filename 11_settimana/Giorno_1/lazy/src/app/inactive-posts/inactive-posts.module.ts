import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InactivePostsRoutingModule } from './inactive-posts-routing.module';
import { InactivePostsComponent } from './inactive-posts.component';


@NgModule({
  declarations: [
    InactivePostsComponent
  ],
  imports: [
    CommonModule,
    InactivePostsRoutingModule
  ]
})
export class InactivePostsModule { }
