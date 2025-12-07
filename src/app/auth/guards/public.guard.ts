import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { map, catchError, of } from 'rxjs';

export const publicGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const token = authService.getStoredToken();

  if (token) {
    return authService.loginWithToken(token).pipe(
      map((res) => {
        if (res.user) {
          router.navigateByUrl('/home');
          return false;
        } else {
          authService.clearStoredToken();
          return true;
        }
      }),
      catchError(() => {
        authService.clearStoredToken();
        return of(true);
      })
    );
  } else {
    return true;
  }
};
