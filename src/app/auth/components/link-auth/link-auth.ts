import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-link-auth',
  imports: [RouterLink],
  templateUrl: './link-auth.html',
})
export class LinkAuth {
  title = input('');
  link = input('');
}
