import { Component, Injectable } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { Review, ReviewComponent } from '../../components/review/review.component';
import { MatDialog } from '@angular/material/dialog';
import { AddReviewsComponent } from '../../add-reviews/add-reviews.component';

@Component({
  selector: 'app-reviews',
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent,
    ReviewComponent,
  ],
  templateUrl: './reviews.component.html',
  styleUrl: './reviews.component.css'
})
export class ReviewsComponent {
  // constructor (private matDialog : MatDialog){}
  // openDialog() {
  //   this.matDialog.open(AddReviewsComponent,{
  //     width: '350px',
  //   })
  // }

  public reviews : Array<Review> = [
    {
      name: "ZoV",
      date: "22.04.2024",
      description: "Я в восторге от капсулы времени, которую приобрела в вашем магазине! Качество изделия выше всяких похвал, а удивительный выбор наполнения дал мне возможность создать настоящий клад воспоминаний. Спасибо за этот незабываемый опыт!",
      img1: "../../../assets/img/Набор 3.png",
      img2: "../../../assets/img/Капсула L 2.png"
    },
    {
      name: "Nagibator",
      date: "12.04.2024",
      description: "Отличный опыт покупки в вашем магазине! Продукт был точно таким, как описан, доставлен вовремя и без каких-либо проблем. Теперь у меня есть надежное место для хранения самых дорогих мне воспоминаний.",
      img1: "../../../assets/img/Набор 2.png",
      img2: "../../../assets/img/Капсула L.png"
    },
    {
      name: "Bebranuh_",
      date: "01.04.2024",
      description: "Спасибо вашему магазину за капсулу времени - это именно то, что я искал! Теперь у меня есть способ сохранить все важные воспоминания в одном месте. Очень доволен результатом!",
      img1: "../../../assets/img/Набор 1.png",
      img2: "../../../assets/img/Капсула S 2.png"
    },
    {
      name: "Tracktor",
      date: "31.03.2024",
      description: "Капсула времени, которую я заказал у вас, превзошла мои ожидания! Она оказалась идеальным местом для сохранения важных моментов моей жизни. К тому же, набор включал удивительные сувениры, которые придали капсуле особый шарм.",
      img1: "../../../assets/img/Набор 2.png",
      img2: "../../../assets/img/Флешка 1.png"
    },
    {
      name: "MbImlya",
      date: "20.03.2024",
      description: "Отличный выбор! Капсула времени, которую я приобрел у вас, помогла мне сохранить наши семейные традиции и воспоминания. Набор, в который входила капсула, также оказался очень полезным и вдохновляющим.",
      img1: "../../../assets/img/Календарь 1.png",
      img2: "../../../assets/img/Альбом.png"
    },
    {
      name: "U_U-->0o0",
      date: "15.03.2024",
      description: "У вас самые лучшие капсулы времени! Я приобрел набор, в который входила капсула L, и остался очень доволен. К тому же, в наборе был сувенирный календарь, который стал отличным дополнением к моей коллекции воспоминаний.",
      img1: "../../../assets/img/Жетон.png",
      img2: "../../../assets/img/Капсула M 2.png"
    },
    {
      name: "ZV",
      date: "13.03.2024",
      description: "Спасибо вашему магазину за потрясающие капсулы времени! Моя капсула времени M оказалась идеальным местом для хранения воспоминаний о моих путешествиях. Набор, в который входила капсула, также включал замечательные сувениры, которые я добавил в свою коллекцию.",
      img1: "../../../assets/img/Набор 1.png",
      img2: "../../../assets/img/Каплуса S.png"
    },
  ]

}
