import { Routes } from '@angular/router';
import {ProductsComponent} from './products/products.component';
import { PipesComponent } from './pipes/pipes.component';

export const routes: Routes = [
  {path: 'products', title: 'Продукты', component: ProductsComponent},
  {path: 'pipes', title: 'Капсулы', component: PipesComponent}
];
