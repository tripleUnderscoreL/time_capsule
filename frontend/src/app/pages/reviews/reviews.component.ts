import { Component, Injectable } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { ReviewComponent } from '../../components/review/review.component';
import { MatDialog } from '@angular/material/dialog';
import { AddReviewsComponent } from '../../add-reviews/add-reviews.component';
import { PostService } from '../../services/post.service';
import { Observable } from 'rxjs';
import { Comment, CommentNoImage, Image } from '../../interfaces';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reviews',
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent,
    ReviewComponent,
    CommonModule
  ],
  templateUrl: './reviews.component.html',
  styleUrl: './reviews.component.css'
})
export class ReviewsComponent {
  images: Image[] = [{id: 0, comment: 0, image: ''}]
  comment: CommentNoImage = {id: '', user: '', user_name: '', content: '', date_added: '', images: [] }
  getValue(event: Event): string {
    return (event.target as HTMLInputElement).value;
  }
  // postComment(){
  //   this.postService.postComment(this.comment.content)
  //   console.log(this.comment)
  // }
  public postComment(){
    if (this.comment.content != ''){
      console.log(this.comment)
      this.postService.postCommentNoImage(this.comment).subscribe({
        next:(data: any) => {this.comment=data; true;},
        error: error => console.log(error),
        }
      );
      window.location.reload();
    }
    else {
      console.log("Не все поля заполнены")
    }
  }


  protected Reviews$ ?: Observable<Comment[]>
  constructor(private postService:PostService){}
  ngOnInit(){
    this.Reviews$ = this.postService.getComments()
  }
}
