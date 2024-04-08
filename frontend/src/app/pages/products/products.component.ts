import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { ProductComponent } from '../../components/product/product.component';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [HeaderComponent, ProductComponent, FooterComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {

}
