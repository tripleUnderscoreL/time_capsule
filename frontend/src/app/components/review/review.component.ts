import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-review',
  standalone: true,
  imports: [],
  templateUrl: './review.component.html',
  styleUrl: './review.component.css'
})
export class ReviewComponent {
  @Input()
  public review !: Review;
}

export interface Review {
  name: string;
  date: string;
  description: string;
  img1: string;
  img2: string;
}
