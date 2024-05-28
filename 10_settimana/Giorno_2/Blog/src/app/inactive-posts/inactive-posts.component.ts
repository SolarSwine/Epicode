import { Component, OnInit } from '@angular/core';
import { PostService } from './../services/post.service';
import { PostInterface } from 'src/interfaces/post.interface';

@Component({
  selector: 'app-inactive-posts',
  templateUrl: './inactive-posts.component.html',
  styleUrls: ['./inactive-posts.component.scss']
})
export class InactivePostsComponent implements OnInit {
  posts: PostInterface[] = [];

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.postService.getPosts().subscribe((posts) => {
      this.posts = posts.filter(post => !post.active);
    });
  }
}
