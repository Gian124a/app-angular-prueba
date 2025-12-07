import { ChangeDetectionStrategy, Component, effect, inject, signal } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-home-user-page',
  templateUrl: './home-user-page.html',
})
export class HomeUserPageComponent {
  authService = inject(AuthService);

  username = signal('');

  welcome = effect(() => {
    this.getCredencials();
  });

  getCredencials = () => {
    this.authService.getProfile().subscribe((profile) => {
      this.username.set(profile.message);
    });
  };
}
