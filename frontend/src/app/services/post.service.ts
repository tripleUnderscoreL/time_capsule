import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Post, User, UserInProfile, Comment, CommentNoImage, Cart, CartItem, AddProductToCart, ProductInCart } from '../../app/interfaces';
import { CookieService } from 'ngx-cookie-service';


@Injectable({
  providedIn: 'root'
})

export class PostService {

  localhost: string = 'localhost:8000'

  constructor(private _httpCLient: HttpClient, private cookieService: CookieService) { } //private cookieService: CookieService

  // get Categories for Products page
  public getCategory1(): Observable<Post[]>{
    return this._httpCLient.get<Post[]>('http://'+this.localhost+'/api/v1/category/1/products')
  }
  public getCategory2(): Observable<Post[]>{
    return this._httpCLient.get<Post[]>('http://'+this.localhost+'/api/v1/category/2/products')
  }
  public getCategory3(): Observable<Post[]>{
    return this._httpCLient.get<Post[]>('http://'+this.localhost+'/api/v1/category/3/products')
  }

  // register Account
  public postRegisterAccount(user: User): Observable<Post[]>{
    return this._httpCLient.post<Post[]>('http://'+this.localhost+'/api/v1/auth/users/', user)
  }

  // get data for Profile page
  public getUserData(): Observable<UserInProfile>{
    let header= new HttpHeaders().set('Authorization', 'Token '+localStorage.getItem('token'))
    return this._httpCLient.get<UserInProfile>('http://'+this.localhost+'/api/v1/auth/users/me', {headers:header})
  }

  // get reviews for Review page
  public getComments(): Observable<Comment[]>{
    return this._httpCLient.get<Comment[]>('http://'+this.localhost+'/api/v1/comments/')
  }

  // post review
  public postComment(comment: Comment): Observable<Comment>{
    let header= new HttpHeaders().set('Authorization', 'Token '+localStorage.getItem('token'))
    return this._httpCLient.post<Comment>('http://'+this.localhost+'/api/v1/comments/', comment, {headers:header})
  }

  //post review without image
  public postCommentNoImage(comment: CommentNoImage): Observable<CommentNoImage>{
    let header= new HttpHeaders().set('Authorization', 'Token '+localStorage.getItem('token'))
    return this._httpCLient.post<CommentNoImage>('http://'+this.localhost+'/api/v1/comments/', comment, {headers:header})
  }

  // get Cart items
  public getCart(): Observable<Cart>{//cookie:string
    let header =  'Token '+localStorage.getItem('token');
    // let csrfcookie =  this.cookieService.get('csrftoken')
    return this._httpCLient.get<Cart>('http://'+this.localhost+'/api/v1/cart', {headers: {'Authorization':header}})
    // , 'X-CSRFToken': csrfcookie
  }

  // post products into Cart
  public postCart(product: AddProductToCart): Observable<AddProductToCart>{
    let header =  'Token '+localStorage.getItem('token');
    let cookie = 'sessionid='+this.cookieService.get('sessionid')
    //let session = 'sessionid='+this.cookieService.get('cookieName');
    return this._httpCLient.post<AddProductToCart>('http://'+this.localhost+'/api/v1/cart/add_item/', product, {headers: {'Authorization':header}})//{'Authorization':header, 'Cookie':session}
  }

  // login user and get token
  login(username: string, password: string): Observable<any> {
    return this._httpCLient
      .post<any>('http://'+this.localhost+'/auth/token/login/ ', { username, password })
      .pipe(
        tap((response: { token: string; }) => {
          if (response && response.token) {

          }
        })
      );
  }

  // public increaseAmount(product:ProductInCart){
  //   let header =  'Token '+localStorage.getItem('token');
  //   console.log(product.id, 'http://'+this.localhost+'/api/v1/cart/'+product.id+'/increase_quantity/')
  //   return this._httpCLient.post<{}>('http://'+this.localhost+'/api/v1/cart/'+10+'/increase_quantity/', {}, {headers: {'Authorization':header}})
  // }

  // increaseAmount(product: ProductInCart) {
  //   const token = localStorage.getItem('token');
  //   const header = 'Token ' + token;
  //   const headers = new HttpHeaders().set('Authorization', header);

  //   const url = `http://${this.localhost}/api/v1/cart/${product.id}/increase_quantity/`;
  //   console.log(product.id, url);

  //   return this._httpCLient.post<{}>(url, {}, { headers: headers })
  // }

  increaseAmount(product: CartItem) {
    const token = localStorage.getItem('token');
    const header = 'Token ' + token;
    const headers = new HttpHeaders().set('Authorization', header);

    const url = `http://${this.localhost}/api/v1/cart/${product.id}/increase_quantity/`;
    console.log(product.id, url);

    return this._httpCLient.patch<{}>(url, {}, { headers: headers }).subscribe(
      response => console.log('Response:', response),
      error => console.error('Error:', error)
    );
  }

  decreaseAmount(product: CartItem){
    const token = localStorage.getItem('token');
    const header = 'Token ' + token;
    const headers = new HttpHeaders().set('Authorization', header);

    const url = `http://${this.localhost}/api/v1/cart/${product.id}/decrease_quantity/`;
    console.log(product.id, url);

    return this._httpCLient.patch<{}>(url, {}, { headers: headers }).subscribe(
      response => console.log('Response:', response),
      error => console.error('Error:', error)
    );
  }

  editProfile(profile: {}){
    const token = localStorage.getItem('token');
    const header = 'Token ' + token;
    const headers = new HttpHeaders().set('Authorization', header);

    const url = `http://${this.localhost}/api/v1/auth/users/me/`;

    return this._httpCLient.patch<{}>(url, profile, { headers: headers }).subscribe(
      response => console.log('Response:', response),
      error => console.error('Error:', error)
    );
  }

  // logout does it work? yes
  logout(): void {
    localStorage.removeItem('token');
  }
}
