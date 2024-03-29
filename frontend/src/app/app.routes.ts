import { Routes } from '@angular/router';
import {ProductsComponent} from './products/products.component';
import { PipesComponent } from './pipes/pipes.component';
import { InnerComponent } from './inner/inner.component';
import { SetsComponent } from './sets/sets.component';

export const routes: Routes = [
  {path: 'products', title: 'Продукты', component: ProductsComponent},
  {path: 'pipes', title: 'Капсулы', component: PipesComponent},
  {path: 'inner', title: 'Содержимое капсул', component: InnerComponent},
  {path: 'sets', title: 'Готовые наборы', component: SetsComponent}
];
