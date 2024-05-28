import { PostService } from './../services/post.service';
import { Component, ViewChild } from '@angular/core';
import { PostInterface } from 'src/interfaces/post.interface';
import { SinglePostComponent } from '../single-post/single-post.component';


@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent {
  post!: PostInterface;
  related: PostInterface[] = [];
  posts: PostInterface[] = [];

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.loadPosts();
    this.loadTopPost();
    this.loadRandomPosts();
  }

  loadPosts(): void {
    this.postService.getPosts().subscribe(posts => {
      this.posts = posts;
    });
  }

  loadTopPost(): void {
    this.postService.getTopPost().subscribe(post => {
      this.post = post;
    });
  }

  loadRandomPosts(): void {
    this.postService.getRandomPosts(4).subscribe(relatedPosts => {
      this.related = relatedPosts;
    });
  }

  editPost(updatedPost: PostInterface): void {
    this.postService.editPost(updatedPost);
  }

  filterPostsByTag(tag: string): void {
    // Chiamare il metodo filterPostsByTag del servizio PostService
    this.postService.filterPostsByTag(tag).subscribe(filteredPosts => {
      this.posts = filteredPosts;
    });
  }
}
