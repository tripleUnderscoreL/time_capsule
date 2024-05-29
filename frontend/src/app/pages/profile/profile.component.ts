import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { Observable, map, subscribeOn } from 'rxjs';
import { Post, User, UserInProfile } from '../../interfaces';
import { PostService } from '../../services/post.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  protected user?: Observable<UserInProfile>
  constructor(private postService:PostService){}

  //userData?: UserInProfile
  log(){
    console.log(this.user)
  }
  ngOnInit() {
    this.user = this.postService.getUserData()
    //console.log(this.userData)
  }
}
