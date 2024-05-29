import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AddProductToCart, Cart, Post } from '../../interfaces';
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
  protected Cart$ ?: Observable<Cart>
  protected Pipes$?: Observable<Post[]>
  protected Inner$?: Observable<Post[]>
  protected Sets$?: Observable<Post[]>

  public product: AddProductToCart = {product_id: 1, quantity: 1}

  @Input()
  public type!: string;
  @Input()
  public kind!: string;
  @Input() card!: Post
  constructor(private postService:PostService){}
  trackByItemId(index: number, item: any): number {
    return item.id;
  }
  postCart(id: number){
    this.product.product_id = id
    this.postService.postCart(this.product).subscribe({
      next: cart => {console.log('Полученный товар:', cart)},
      error: error => console.error('Ошибка при получении товара:', error)
    });
    console.log(this.product)
    console.log('UserToken:',localStorage.getItem('token'))
    this.Cart$ = this.postService.getCart()
    this.Cart$.subscribe({
      next: cart => {console.log('Полученная корзина:', cart)},
      error: error => console.error('Ошибка при получении корзины:', error)
    });
  }
  ngOnInit() {
    this.Pipes$ = this.postService.getCategory1()
    this.Inner$ = this.postService.getCategory2()
    this.Sets$ = this.postService.getCategory3()
  }
}
