import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class ApiService {
    API_URL = 'https://songs.code-star.ir/' as const;

    constructor(private http: HttpClient) {}

    get<T>(path: string): Observable<T> {
        return this.http.get<T>(this.API_URL + path, {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Cache-Control':
                    'no-cache, no-store, must-revalidate, post-check=0, pre-check=0',
                Pragma: 'no-cache',
                Expires: '0',
            },
        });
    }

    post<T>(path: string, body: any): Observable<T> {
        return this.http.post<T>(this.API_URL + path, body, {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Cache-Control':
                    'no-cache, no-store, must-revalidate, post-check=0, pre-check=0',
                Pragma: 'no-cache',
                Expires: '0',
            },
        });
    }

    put<T>(path: string, body: any): Observable<T> {
        return this.http.put<T>(this.API_URL + path, body, {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Cache-Control':
                    'no-cache, no-store, must-revalidate, post-check=0, pre-check=0',
                Pragma: 'no-cache',
                Expires: '0',
            },
        });
    }

    delete<T>(path: string): Observable<T> {
        return this.http.delete<T>(this.API_URL + path, {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Cache-Control':
                    'no-cache, no-store, must-revalidate, post-check=0, pre-check=0',
                Pragma: 'no-cache',
                Expires: '0',
            },
        });
    }
}
