import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() {}

  setUserLocal(username : string , id : string  , token : string) : void
  {
    localStorage.setItem('username' , username);
    localStorage.setItem('id', id);
    localStorage.setItem('token' , token);
  }
  removeUserLocal()  : void
  {
    localStorage.removeItem('username');
    localStorage.removeItem('id');
    localStorage.removeItem('token');
  }

  getUser() : string | null
  {
    return (localStorage.getItem('username') || null);
  }
  getToken() : string | null
  {
    return (localStorage.getItem('token') || null)
  }
  getUserId() : string | null
  {
    return (localStorage.getItem('id') || null)
  }

  isLogged() : boolean
  {
    return !!this.getToken() ;
  }
}
