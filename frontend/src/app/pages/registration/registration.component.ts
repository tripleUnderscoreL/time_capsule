import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { PostService } from '../../services/post.service';
import { User } from '../../interfaces';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css'
})
export class RegistrationComponent {
  constructor(private postService:PostService){}
  user:User = {email:'', username:'', password:''}
  receivedUser: User | undefined;
  getValue(event: Event): string {
    return (event.target as HTMLInputElement).value;
  }
  public postUser(){
    if (this.user.email != '' && this.user.username != '' && this.user.password != ''){
      console.log(this.user)
      this.postService.postRegisterAccount(this.user).subscribe({
        next:(data: any) => {this.receivedUser=data; true;},
        error: error => console.log(error)
    });
    }
    else {
      console.log("Не все поля заполнены")
    }
  }
}
