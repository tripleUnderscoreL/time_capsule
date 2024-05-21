import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Post } from '../../interfaces';
import { PostService } from '../../services/post.service';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-product',
  standalone: true,
  imports: [RouterLink, CommonModule, ],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {
  protected Pipes$?: Observable<Post[]>
  protected Inner$?: Observable<Post[]>
  protected Sets$?: Observable<Post[]>
  @Input()
  public type!: string;
  @Input()
  public kind!: string;
  @Input() card!: Post
  constructor(private postService:PostService){}

  ngOnInit() {
    this.Pipes$ = this.postService.getCategory1()
    this.Inner$ = this.postService.getCategory2()
    this.Sets$ = this.postService.getCategory3()
  }
}
