import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {
    constructor() {}

    set authToken(value: string | null) {
        if (value === null) {
            localStorage.removeItem('authToken');
        } else localStorage.setItem('authToken', value);
    }

    get authToken(): string | null {
        return localStorage.getItem('authToken');
    }

    get isLoggedIn(): boolean {
        return this.authToken !== null;
    }
}
