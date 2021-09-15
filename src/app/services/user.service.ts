import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
    Token,
    userLogin,
    userSignUp,
    UserEditData,
} from '../interfaces/interface';
import { ApiService } from './api.service';

@Injectable()
export class UserService {
    constructor(private api: ApiService) {}

    getUser(userData: userLogin): Observable<Token> {
        return this.api.post<Token>(`Users/login`, userData);
    }

    getSignUp(userData: userSignUp): Observable<Token> {
        return this.api.post<Token>(`Users/register`, userData);
    }

    getUserInfos(id: string | null): Observable<UserEditData> {
        return this.api.get<UserEditData>(`user/one/${id}`);
    }
    updateUserInfos(userData: Object): Observable<void> {
        return this.api.post<void>(`Users/alter`, userData);
    }
}
