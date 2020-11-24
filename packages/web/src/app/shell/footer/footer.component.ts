import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';


@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {

  bgClass = '';

  constructor(
    private router: Router,
  ) {
    // subscribe to router navigation
    this.router.events.subscribe(event => {
      // filter `NavigationEnd` events
      if (event instanceof NavigationEnd) {
        // get current route without leading slash `/`
        const eventUrl = /(?<=\/).+/.exec(event.urlAfterRedirects);
        const currentRoute = (eventUrl || []).join('');
        // set bgClass property with the value of the current route
        if (currentRoute === 'not-found') {
          this.bgClass = currentRoute;
        } else {
          this.bgClass = '';
        }

      }
    });
  }
}
