import { Component, signal } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import clarity from '@microsoft/clarity';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
})
export class App {
  constructor(private router: Router) {
    clarity.init('uhvm84etaf'); // tu project ID

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Usa setTag para marcar la página
        clarity.setTag('page', event.urlAfterRedirects);
      }
    });
  }
}
