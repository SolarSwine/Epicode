import { Component } from '@angular/core';
import { IPost } from '../../interfaces/i-post';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-active-posts',
  templateUrl: './active-posts.component.html',
  styleUrl: './active-posts.component.scss'
})
export class ActivePostsComponent {
  activePosts: IPost[] = [];

  constructor(private postService: PostService) {}

  ngOnInit() {
    this.activePosts = this.postService.getActivePosts();
  }
}
