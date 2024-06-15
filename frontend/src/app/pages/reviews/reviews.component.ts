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

class ImageSnippet {
  constructor(public src: string, public file: File) {}
}

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
  comment: Comment = {id: '', user: '', user_name: '', content: '', date_added: '', images: [{id:0, comment:0, image:''}] }
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
      this.postService.postComment(this.comment).subscribe({
        next:(data: Comment) => {this.comment.content=data.content; true; console.log(data, 'data')},
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
  selectedFile!: ImageSnippet;
  processFile(imageInput: any) {
    // var file = imageInput.dataTransfer ? imageInput.dataTransfer.files[0] : imageInput.target.files[0];
    // var pattern = /image-*/;
    // var reader = new FileReader();
    // if (!file.type.match(pattern)) {
    //   alert('invalid format');
    //   return;
    // }
    // reader.onload = this._handleReaderLoaded.bind(this);
    // reader.readAsDataURL(file);
    //

    const file: File = imageInput.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {
      this.selectedFile = new ImageSnippet(event.target.result, file);
      this.comment.images[0].image = {'a.png':this.selectedFile.src}

    });
    reader.readAsDataURL(file);
  }
}
