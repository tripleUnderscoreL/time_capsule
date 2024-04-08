import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { ProductComponent } from '../product/product.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-inner',
  standalone: true,
  imports: [HeaderComponent, ProductComponent, FooterComponent],
  templateUrl: './inner.component.html',
  styleUrl: './inner.component.css'
})
export class InnerComponent {

}
