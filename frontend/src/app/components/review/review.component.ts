import { Component, Input } from '@angular/core';
import { Comment } from '../../interfaces'
@Component({
  selector: 'app-review',
  standalone: true,
  imports: [],
  templateUrl: './review.component.html',
  styleUrl: './review.component.css'
})
export class ReviewComponent {
  @Input()
  public review !: Comment;
}


