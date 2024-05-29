import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Cart, CartItem } from '../../interfaces';
import { PostService } from '../../services/post.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-basket-product',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './basket-product.component.html',
  styleUrl: './basket-product.component.css'
})
export class BasketProductComponent {
  constructor(private postService: PostService){}
  @Input()
  public Item$!: CartItem;
  addAmount(){
    this.Item$.quantity = (Number(this.Item$.quantity)+1).toString()
  }
  decreaseAmount(){
    this.Item$.quantity = (Number(this.Item$.quantity)-1).toString()
  }
}
