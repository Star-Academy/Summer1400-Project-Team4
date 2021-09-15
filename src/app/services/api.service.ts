import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class ApiService {
    API_URL = 'http://team4.somee.com/api/' as const;

    HEADERS: { [header: string]: string } = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      'Cache-Control': 'no-cache, no-store, must-revalidate, post-check=0, pre-check=0' ,
        Pragma: 'no-cache',
        Expires: '0',
    };

    constructor(private http: HttpClient) {}

    get<T>(path: string, token?: string): Observable<T> {
        let headers = { ...this.HEADERS };
        if (token !== undefined) headers.token = token;

        return this.http.get<T>(this.API_URL + path, {
            headers: headers,
        });
    }

    post<T>(path: string, body?: any, token?: string): Observable<T> {
        let headers = { ...this.HEADERS };
        if (token !== undefined) headers.token = token;

        return this.http.post<T>(this.API_URL + path, body, {
            headers: headers,
        });
    }

    put<T>(path: string, body?: any, token?: string): Observable<T> {
        let headers = { ...this.HEADERS };
        if (token !== undefined) headers.token = token;

        return this.http.put<T>(this.API_URL + path, body, {
            headers: headers,
        });
    }

    delete<T>(path: string, token?: string): Observable<T> {
        let headers = { ...this.HEADERS };
        if (token !== undefined) headers.token = token;

        return this.http.delete<T>(this.API_URL + path, {
            headers: headers,
        });
    }
}
