import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { PostService } from '../../services/post.service';
import { User } from '../../interfaces';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css'
})
export class RegistrationComponent {
  constructor(private postService:PostService, private router: Router){}
  user:User = {email:'', username:'', password:'', phone_number:''}
  receivedUser: User | undefined;
  public err: string = ''
  getValue(event: Event): string {
    return (event.target as HTMLInputElement).value;
  }
  public postUser(){
    if (this.user.email != '' && this.user.username != '' && this.user.password != ''){
      console.log(this.user)
      this.postService.postRegisterAccount(this.user).subscribe({
        next:(data: any) => {this.receivedUser=data; true; this.router.navigate(['/login']);},
        error: error => {console.log(error); this.err = error.error.email[0] + " E-mail должен быть такого формата: ***@***.com"},

      }
    );
    }
    else {
      console.log("Не все поля заполнены")
      this.err = "Не все поля заполнены"
    }
  }
}
