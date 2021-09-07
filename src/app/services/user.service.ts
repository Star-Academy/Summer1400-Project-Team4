import { HttpClient, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {Token, userLogin , userSignUp , UserEditData} from "../interfaces/interface";

const API = 'https://songs.code-star.ir';

const httpOptions = {
  headers: new HttpHeaders({
    Accept: 'application/json',
    'Content-Type': 'application/json',
  }),
};
const getRequestHeader = {
  headers  : new HttpHeaders({
    'Cache-Control':  'no-cache , no-store, must-revalidate',
    'Pragma': 'no-cache',
    'Expires': '0'
    }),
};
@Injectable({
  providedIn: 'root'
})
export class UserService  {

  constructor(private http: HttpClient) {}

  getUser(userData : userLogin) : Observable<Token>
  {
    return this.http.post<Token>(`${API}/user/login` , userData  , httpOptions)
  }

  getSignUp(userData : userSignUp) : Observable<Token>
  {
    return this.http.post<Token>(`${API}/user/register` , userData , httpOptions);
  }

  getUserInfos(id: string | null) : Observable<UserEditData>
  {
    return this.http.get<UserEditData>(`${API}/user/one/${id}` , getRequestHeader)
  }
  updateUserInfos( userData : Object) : Observable<void>
  {
    return this.http.post<void>(`${API}/user/alter` , userData , httpOptions);
  }

}
