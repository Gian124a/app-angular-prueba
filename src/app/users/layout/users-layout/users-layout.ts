import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router'; // Import RouterLink
import { AuthService } from '../../../auth/services/auth.service'; // Import AuthService

@Component({
  selector: 'app-users-layout',
  standalone: true, // Ensure it's standalone
  imports: [RouterOutlet, RouterLink], // Add RouterLink here
  templateUrl: './users-layout.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersLayout {
  authService = inject(AuthService);
  router = inject(Router);

  logout() {
    this.authService.clearStoredToken();
    this.router.navigateByUrl('/auth/login');
  }
}
