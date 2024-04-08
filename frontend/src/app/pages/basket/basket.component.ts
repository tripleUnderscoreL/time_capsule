import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { BasketProductComponent } from '../../components/basket-product/basket-product.component';

@Component({
  selector: 'app-basket',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, BasketProductComponent],
  templateUrl: './basket.component.html',
  styleUrl: './basket.component.css'
})
export class BasketComponent {

}
