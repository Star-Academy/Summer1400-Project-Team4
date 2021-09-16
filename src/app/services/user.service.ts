import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
    Token,
    userLogin,
    userSignUp,
    UserEditData,
} from '../interfaces/interface';
import { ApiService } from './api.service';
import {AuthService} from "./auth.service";

@Injectable()
export class UserService {
    constructor(private api: ApiService , public auth : AuthService) {}

    getUser(userData: userLogin): Observable<string> {
        return this.api.post<string>(`Users/login`, userData);
    }

    getSignUp(userData: userSignUp): Observable<string> {
        return this.api.post<string>(`Users/register`, userData);
    }

  getUserInfos(token: string ): Observable<any>  {
        return this.api.get<any>(`Users/UserData` , token);
    }
    updateUserInfos(userData: Object , token : string): Observable<any> {
        return this.api.post<any>(`Users/alter`, userData , token);
    }
}
