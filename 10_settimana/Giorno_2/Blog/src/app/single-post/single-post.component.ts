import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PostInterface } from 'src/interfaces/post.interface';

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.scss']
})
export class SinglePostComponent {
  @Input() post!: PostInterface;
  @Output() tagClicked: EventEmitter<string> = new EventEmitter<string>();

  edit: boolean = false;

  toggleEdit(): void {
    this.edit = !this.edit;
  }

  onTagClicked(tag: string): void {
    this.tagClicked.emit(tag);
  }
}
