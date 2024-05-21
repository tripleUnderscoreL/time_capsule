import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post, User } from '../../app/interfaces';



@Injectable({
  providedIn: 'root'
})

export class PostService {

  constructor(private _httpCLient: HttpClient) { }

  public getCategory1(): Observable<Post[]>{
    return this._httpCLient.get<Post[]>('http://127.0.0.1:8000/api/v1/category/1/products')
  }
  public getCategory2(): Observable<Post[]>{
    return this._httpCLient.get<Post[]>('http://127.0.0.1:8000/api/v1/category/2/products')
  }
  public getCategory3(): Observable<Post[]>{
    return this._httpCLient.get<Post[]>('http://127.0.0.1:8000/api/v1/category/3/products')
  }
  public postRegisterAccount(user: User): Observable<Post[]>{
    //const body: User = {email = user.email, name = user.name, password = user.password}
    return this._httpCLient.post<Post[]>('http://127.0.0.1:8000/api/v1/auth/users/', user)
  }

}
