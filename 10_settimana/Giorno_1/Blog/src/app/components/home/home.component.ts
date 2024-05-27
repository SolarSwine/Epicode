import { Component } from '@angular/core';
import { IPost } from '../../interfaces/i-post';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  postArr: IPost[] = [];
  firstPost: IPost | null = null;
  nextFourPosts: IPost[] = [];

  constructor(private postService: PostService) {}

  ngOnInit() {
    this.getPosts();
  }


  async getPosts(): Promise<void> {
    try {
      this.postArr = await this.postService.getPosts();
      this.shufflePosts();
      this.selectRandomPosts();
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  }

  shufflePosts(): void {
    for (let i = this.postArr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.postArr[i], this.postArr[j]] = [this.postArr[j], this.postArr[i]];
    }
  }

  selectRandomPosts(): void {
    if (this.postArr.length > 0) {
      this.firstPost = this.postArr[0];
      this.nextFourPosts = this.postArr.slice(1, 5);
    }
  }
}
