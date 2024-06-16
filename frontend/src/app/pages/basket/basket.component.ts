import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { BasketProductComponent } from '../../components/basket-product/basket-product.component';
import { PostService } from '../../services/post.service';
import { Observable, async } from 'rxjs';
import { Cart, CartItem } from '../../interfaces';
import { CommonModule } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-basket',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, BasketProductComponent, CommonModule],
  templateUrl: './basket.component.html',
  styleUrl: './basket.component.css'
})
export class BasketComponent {
  protected Cart$ ?: Observable<Cart>
  constructor(private postService:PostService, private cookieService: CookieService){}

  public total: number = 0
  updateTotal(item: CartItem){
    this.total+= Number(item.product.price)*Number(item.quantity)
  }
  reloadTotal(){
    this.total = 0
  }
  private readonly cookie = 'sessionid='+this.cookieService.get('sessionid')

  ngOnInit(){
    this.Cart$ = this.postService.getCart()//this.cookie)
    this.Cart$.subscribe({
      next: cart => {console.log('Полученная корзина:', cart)},
      error: error => console.error('Ошибка при получении корзины:', error)
    });
  }
}
