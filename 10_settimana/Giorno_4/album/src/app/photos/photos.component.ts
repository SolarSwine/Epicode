import { Component, OnInit } from '@angular/core';
import { PhotoService, Photo } from '../services/photo.service';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.scss']
})
export class PhotosComponent implements OnInit {
  photos: Photo[] = [];
  error: string | null = null;
  favoriteCount: number = 0;

  constructor(private photoService: PhotoService) {}

  ngOnInit(): void {
    this.loadPhotos();
    this.photoService.getFavoriteCount().subscribe(count => {
      this.favoriteCount = count;
    });
  }

  loadPhotos(): void {
    this.photoService.getPhotos().subscribe({
      next: (data) => this.photos = data,
      error: (err) => this.error = err.message
    });
  }

  deletePhoto(id: number): void {
    this.photoService.deletePhoto(id).subscribe({
      next: () => this.photos = this.photos.filter(photo => photo.id !== id),
      error: (err) => this.error = err.message
    });
  }

  likePhoto(): void {
    this.photoService.addFavorite();
  }
}
