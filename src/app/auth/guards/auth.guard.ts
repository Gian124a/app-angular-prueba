import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { map, catchError, of } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const token = authService.getStoredToken();
  console.log(token);

  if (token) {
    return authService.loginWithToken(token).pipe(
      map((res) => {
        if (res?.valid && res?.user) {
          return true;
        } else {
          authService.clearStoredToken();
          return router.parseUrl('/login');
        }
      }),
      catchError(() => {
        authService.clearStoredToken();
        return of(router.parseUrl('/login'));
      })
    );
  } else {
    return router.parseUrl('/login');
  }
};
