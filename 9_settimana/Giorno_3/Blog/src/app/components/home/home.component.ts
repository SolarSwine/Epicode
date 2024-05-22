import { Component } from '@angular/core';

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
  tags: string[];
  active: boolean;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  apiUrl: string = 'assets/db.json';
  postArr: Post[] = [];

  ngOnInit() {
    this.getPosts();
  }

  async getPosts(): Promise<void> {
    try {
      const response = await fetch(this.apiUrl);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      this.postArr = data.posts;
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  }
}
