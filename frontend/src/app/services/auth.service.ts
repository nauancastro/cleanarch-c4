import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Router } from '@angular/router';

import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private apiUrl = `${environment.apiUrl}/auth`;
    private currentUserSubject = new BehaviorSubject<string | null>(this.getUsername());
    currentUser$ = this.currentUserSubject.asObservable();

    constructor(private http: HttpClient, private router: Router) { }

    login(credentials: { username: string, password: string }): Observable<any> {
        return this.http.post<{ token: string }>(`${this.apiUrl}/login`, credentials).pipe(
            tap(response => {
                localStorage.setItem('token', response.token);
                localStorage.setItem('username', credentials.username);
                this.currentUserSubject.next(credentials.username);
            })
        );
    }

    logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        this.currentUserSubject.next(null);
        this.router.navigate(['/']);
    }

    getToken(): string | null {
        return localStorage.getItem('token');
    }

    getUsername(): string | null {
        return localStorage.getItem('username');
    }

    isAuthenticated(): boolean {
        return !!this.getToken();
    }
}
