import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { PostService } from '../../services/post.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(private postService:PostService, private router: Router){}
  // user:User = {email:'', username:'', password:''}
  // receivedUser: User | undefined;
  user = {username: '', password: ''}
  getValue(event: Event): string {
    return (event.target as HTMLInputElement).value;
  }
  logUser(): void {
    this.postService.login(this.user.username, this.user.password).subscribe(
      (response) => {
        localStorage.setItem('token', response.auth_token);
        console.log(localStorage.getItem('token'))
        this.router.navigate(['/main']); // Redirect to the dashboard after successful login
      },
      (error) => {
        console.error(error);
        // Handle error (e.g., display a message to the user)
      },
    );
  }
}
