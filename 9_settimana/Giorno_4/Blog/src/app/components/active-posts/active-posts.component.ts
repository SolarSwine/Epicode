import { Component } from '@angular/core';
import { IPost } from '../../interfaces/i-post';

@Component({
  selector: 'app-active-posts',
  templateUrl: './active-posts.component.html',
  styleUrl: './active-posts.component.scss'
})
export class ActivePostsComponent {

  apiUrl: string = 'assets/db.json';
  postArr: IPost[] = [];
  activePosts: IPost[] = [];

  ngOnInit() {
    this.getPosts();
  }

  async getPosts(): Promise<void> {
      const response = await fetch(this.apiUrl);
      const data = await response.json();
      this.postArr = data.posts;
      this.filterActivePosts();
  }

  filterActivePosts(): void {
    this.activePosts = this.postArr.filter(post => post.active);
  }
}
