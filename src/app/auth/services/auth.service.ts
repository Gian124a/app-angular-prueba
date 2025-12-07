import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import {
  LoginPayload,
  LoginResponse,
  ProfileResponse, // Import ProfileResponse
  RegisterResponse,
  UserRegister,
} from '../interfaces/interfaces';
import { environment } from '../../../environments/environment.prod';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);

  private baseUrl: string = environment.api_url;
  private tokenKey = 'token';

  login(credentials: LoginPayload): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.baseUrl}/auth/login`, credentials).pipe(
      map((res) => {
        if (res && res.token) this.setStoredToken(res.token);
        return res;
      }),
      catchError((err) => {
        console.error('AuthService: Login error:', err);
        return throwError(() => err);
      })
    );
  }

  loginWithToken(token: string): Observable<LoginResponse> {
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

    return this.http.get<LoginResponse>(`${this.baseUrl}/auth/validate`, { headers }).pipe(
      map((res) => {
        this.setStoredToken(token);
        return res;
      }),
      catchError((err) => {
        console.error('AuthService: Token validation error:', err);
        return throwError(() => err);
      })
    );
  }

  register(payload: UserRegister): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>(`${this.baseUrl}/auth/register`, payload).pipe(
      map((res) => {
        return res;
      }),
      catchError((err) => {
        console.error('AuthService: Registration error:', err);
        return throwError(() => err);
      })
    );
  }

  // New method to get user profile
  getProfile(): Observable<ProfileResponse> {
    const token = this.getStoredToken();
    if (!token) {
      console.error('AuthService: No token found to get profile.');
      return throwError(() => new Error('No authentication token found.'));
    }

    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    return this.http.get<ProfileResponse>(`${this.baseUrl}/profile`, { headers }).pipe(
      map((res) => {
        return res;
      }),
      catchError((err) => {
        console.error('AuthService: Error getting profile:', err);
        return throwError(() => err);
      })
    );
  }

  // Helpers para token en localStorage
  private setStoredToken(token: string | null) {
    console.log('AuthService: Setting stored token:', token);
    if (token) {
      try {
        localStorage.setItem(this.tokenKey, token);
      } catch (e) {
        console.error('AuthService: Error setting token in localStorage:', e);
      }
    } else {
      try {
        localStorage.removeItem(this.tokenKey);
      } catch (e) {
        console.error('AuthService: Error removing token from localStorage:', e);
      }
    }
  }

  getStoredToken(): string | null {
    try {
      const token = localStorage.getItem(this.tokenKey);
      console.log('AuthService: Getting stored token:', token);
      return token;
    } catch (e) {
      console.error('AuthService: Error getting token from localStorage:', e);
      return null;
    }
  }

  clearStoredToken() {
    console.log('AuthService: Clearing stored token');
    this.setStoredToken(null);
  }
}
