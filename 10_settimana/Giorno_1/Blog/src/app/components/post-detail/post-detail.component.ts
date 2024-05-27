import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IPost } from '../../interfaces/i-post';
import { PostService } from '../../services/post.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss']
})
export class PostDetailComponent implements OnInit {
  postId: number = 0;
  post: IPost | undefined;
  formVisible: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private postService: PostService
  ) {}

  ngOnInit(): void {
    this.postId = Number(this.route.snapshot.paramMap.get('id'));
    this.fetchPostDetails();
  }

  fetchPostDetails(): void {
    this.postService.getPosts().then(posts => {
      this.post = posts.find(p => p.id === this.postId);
    });
  }

  toggleForm(): void {
    this.formVisible = true; // Impostiamo formVisible su true per mostrare il form
  }
}
