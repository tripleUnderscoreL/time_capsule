import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { QuestionComponent } from '../../components/question/question.component';

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, QuestionComponent],
  templateUrl: './faq.component.html',
  styleUrl: './faq.component.css'
})
export class FaqComponent {

}
