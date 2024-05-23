import { Component } from '@angular/core';
import { IPost } from '../../interfaces/i-post';

@Component({
  selector: 'app-inactive-posts',
  templateUrl: './inactive-posts.component.html',
  styleUrl: './inactive-posts.component.scss'
})
export class InactivePostsComponent {

  apiUrl: string = 'assets/db.json';
  postArr: IPost[] = [];
  inactivePosts: IPost[] = [];

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
    this.inactivePosts = this.postArr.filter(post => !post.active);
  }

}
