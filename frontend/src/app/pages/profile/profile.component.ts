import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { Observable, map, subscribeOn } from 'rxjs';
import { Post, User, UserInProfile } from '../../interfaces';
import { PostService } from '../../services/post.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { EmailValidator, FormControl, FormGroup, Validators } from '@angular/forms';
import { strings } from '@material/dialog';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  protected user?: Observable<UserInProfile>
  editInfo: boolean = false
  constructor(private postService:PostService){}

    username = ''
    phone_number = ''
    email = ''

  logout(){
    this.postService.logout()
    window.location.href = "/main"
  }
  getValue(event: Event): string {
    return (event.target as HTMLInputElement).value;
  }
  editProfile(){
    console.log(this.username, this.phone_number, this.email)
    let data: { [key: string]: any } = {}
    if (this.username != ''){
      data['username'] = this.username
    }
    if (this.phone_number != ''){
      data['phone_number'] = this.phone_number
    }
    if (this.email != ''){
      data['email'] = this.email
    }
    console.log(data)
    this.postService.editProfile(data)
  }
  ngOnInit() {
    this.user = this.postService.getUserData()
  }
}
