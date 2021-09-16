import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class ApiService {
    DEFAULT_API_URL = 'http://team4.somee.com/api/' as const;
    LOCAL_API_URL = 'localhost:443/api/' as const;
    HEADERS: { [header: string]: string } = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Cache-Control':
            'no-cache, no-store, must-revalidate, post-check=0, pre-check=0',
        Pragma: 'no-cache',
        Expires: '0',
    };

    apiUrl: string;

    constructor(private http: HttpClient) {
        this.apiUrl = prompt(
            'آدرس API خود را وارد کنید به عنوان مثال:\n' +
                this.DEFAULT_API_URL +
                '\n' +
                this.LOCAL_API_URL,
            this.DEFAULT_API_URL
        )!;
    }

    get<T>(path: string, token?: string): Observable<T> {
        let headers = { ...this.HEADERS };
        if (token !== undefined) headers.token = token;

        return this.http.get<T>(this.apiUrl + path, {
            headers: headers,
        });
    }

    post<T>(path: string, body?: any, token?: string): Observable<T> {
        let headers = { ...this.HEADERS };
        if (token !== undefined) headers.token = token;

        return this.http.post<T>(this.apiUrl + path, body, {
            headers: headers,
        });
    }

    put<T>(path: string, body?: any, token?: string): Observable<T> {
        let headers = { ...this.HEADERS };
        if (token !== undefined) headers.token = token;

        return this.http.put<T>(this.apiUrl + path, body, {
            headers: headers,
        });
    }

    delete<T>(path: string, token?: string): Observable<T> {
        let headers = { ...this.HEADERS };
        if (token !== undefined) headers.token = token;

        return this.http.delete<T>(this.apiUrl + path, {
            headers: headers,
        });
    }
}
