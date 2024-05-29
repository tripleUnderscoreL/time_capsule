import { Routes } from '@angular/router';
import {ProductsComponent} from './pages/products/products.component';
import { PipesComponent } from './components/pipes/pipes.component';
import { InnerComponent } from './components/inner/inner.component';
import { SetsComponent } from './components/sets/sets.component';
import { MainComponent } from './pages/main/main.component';
import { BasketComponent } from './pages/basket/basket.component';
import { LoginComponent } from './pages/login/login.component';
import { RegistrationComponent } from './pages/registration/registration.component';
import { GalleryComponent } from './pages/gallery/gallery.component';
import { FaqComponent } from './pages/faq/faq.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ReviewsComponent } from './pages/reviews/reviews.component';
import { AboutComponent } from './pages/about/about.component';

export const routes: Routes = [
  {path: 'products', title: 'Продукты', component: ProductsComponent},
  {path: 'pipes', title: 'Капсулы', component: PipesComponent},
  {path: 'inner', title: 'Содержимое капсул', component: InnerComponent},
  {path: 'sets', title: 'Готовые наборы', component: SetsComponent},
  {path: 'main', title: 'Главная', component: MainComponent},
  {path: 'basket', title: 'Корзина', component: BasketComponent},
  {path: 'login', title: 'Вход', component: LoginComponent},
  {path: 'reg', title: 'Регистрация', component: RegistrationComponent},
  {path: 'gallery', title: 'Галлерея', component: GalleryComponent},
  {path: 'FAQ', title: 'FAQ', component: FaqComponent},
  {path: 'profile', title: 'Профиль', component: ProfileComponent},
  {path: 'reviews', title:'Отзывы', component: ReviewsComponent},
  {path: 'about', title: 'О нас', component: AboutComponent},
  {path: '**', component: RegistrationComponent}
];
