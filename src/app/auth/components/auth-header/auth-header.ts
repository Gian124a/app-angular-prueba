import { Component, input } from '@angular/core';

@Component({
  selector: 'app-auth-header',
  imports: [],
  templateUrl: './auth-header.html',
})
export class AuthHeaderComponent {
  title = input<string>('');
}
