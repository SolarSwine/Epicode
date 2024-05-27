import { Component } from '@angular/core';
import { IPost } from '../../interfaces/i-post';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-inactive-posts',
  templateUrl: './inactive-posts.component.html',
  styleUrl: './inactive-posts.component.scss'
})
export class InactivePostsComponent {
  inactivePosts: IPost[] = [];

  constructor(private postService: PostService) {}

  ngOnInit() {
    this.inactivePosts = this.postService.getInactivePosts();
  }
}
