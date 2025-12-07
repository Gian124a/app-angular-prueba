import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../../auth/services/auth.service';
import { User } from '../interfaces/interfaces';
import { environment } from '../../../environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private http = inject(HttpClient);
  private authService = inject(AuthService);

  private baseUrl: string = environment.api_url;

  getUsers(): Observable<User[]> {
    const token = this.authService.getStoredToken();
    if (!token) {
      return throwError(() => new Error('No authentication token found.'));
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.get<User[]>(`${this.baseUrl}/users`, { headers }).pipe(
      catchError((err) => {
        console.error('UsersService: Error fetching users:', err);
        return throwError(() => err);
      })
    );
  }
}
