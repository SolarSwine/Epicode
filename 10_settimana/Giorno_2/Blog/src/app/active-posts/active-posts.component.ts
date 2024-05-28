import { Component, OnInit } from '@angular/core';
import { PostService } from './../services/post.service';
import { PostInterface } from 'src/interfaces/post.interface';

@Component({
  selector: 'app-active-posts',
  templateUrl: './active-posts.component.html',
  styleUrls: ['./active-posts.component.scss'],
})
export class ActivePostsComponent {
  posts: PostInterface[] = [];

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.postService.getPosts().subscribe((posts) => {
      this.posts = posts.filter(post => post.active);
    });
  }
}
