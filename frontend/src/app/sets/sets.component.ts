import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { ProductComponent } from '../product/product.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-sets',
  standalone: true,
  imports: [HeaderComponent, ProductComponent, FooterComponent],
  templateUrl: './sets.component.html',
  styleUrl: './sets.component.css'
})
export class SetsComponent {

}
