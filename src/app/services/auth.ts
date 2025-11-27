import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../environments/environment';
import { AuthResponse, LoginRequest, RegisterRequest } from '../types/auth';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private userSubject = new BehaviorSubject<AuthResponse | null>(this.loadUser());
  user$ = this.userSubject.asObservable();

  get user() {
    return this.userSubject.value;
  }

  constructor(private http: HttpClient) {}

  register(req: RegisterRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${environment.apiUrl}/Users/register`, req)
      .pipe(tap(res => this.setUser(res)));
  }

  login(req: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${environment.apiUrl}/Users/login`, req)
      .pipe(tap(res => this.setUser(res)));
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    this.userSubject.next(null);
  }

  private setUser(res: AuthResponse) {
    localStorage.setItem('token', res.token);
    localStorage.setItem('userName', res.userName);
    this.userSubject.next(res);
  }

  private loadUser(): AuthResponse | null {
    const token = localStorage.getItem('token');
    const userName = localStorage.getItem('userName');
    if (!token || !userName) return null;
    return { token, userName, expiresAt: '' };
  }
}
