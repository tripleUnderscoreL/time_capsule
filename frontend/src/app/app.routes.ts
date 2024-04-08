import { Routes } from '@angular/router';
import {ProductsComponent} from './pages/products/products.component';
import { PipesComponent } from './components/pipes/pipes.component';
import { InnerComponent } from './components/inner/inner.component';
import { SetsComponent } from './components/sets/sets.component';
import { MainComponent } from './pages/main/main.component';
import { BasketComponent } from './pages/basket/basket.component';

export const routes: Routes = [
  {path: 'products', title: 'Продукты', component: ProductsComponent},
  {path: 'pipes', title: 'Капсулы', component: PipesComponent},
  {path: 'inner', title: 'Содержимое капсул', component: InnerComponent},
  {path: 'sets', title: 'Готовые наборы', component: SetsComponent},
  {path: 'main', title: 'Главная', component: MainComponent},
  {path: 'basket', title: 'Корзина', component: BasketComponent}
];
