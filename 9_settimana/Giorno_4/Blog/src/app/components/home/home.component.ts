import { Component } from '@angular/core';
import { IPost } from '../../interfaces/i-post';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  apiUrl: string = 'assets/db.json';
  postArr: IPost[] = [];

  ngOnInit() {
    this.getPosts();
  }

  async getPosts(): Promise<void> {
      const response = await fetch(this.apiUrl);
      const data = await response.json();
      this.postArr = data.posts;
      this.shufflePosts();
  }
  shufflePosts(): void {
    for (let i = this.postArr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.postArr[i], this.postArr[j]] = [this.postArr[j], this.postArr[i]];
    }
}}
