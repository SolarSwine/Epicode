import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IPost } from '../../interfaces/i-post'

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss']
})
export class PostDetailComponent implements OnInit {
  postId: number = 0;
  post: IPost | undefined;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.postId = Number(this.route.snapshot.paramMap.get('id'));
    console.log('Post ID:', this.postId);
    this.fetchPostDetails();
  }

  fetchPostDetails(): void {
    // Assuming you have a method to fetch post details by ID
    fetch('assets/db.json')
      .then(response => response.json())
      .then(data => {
        this.post = data.posts.find((p: IPost) => p.id === this.postId);
      });
  }
}
