import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent {
  bgClass = '';

  constructor(
    private router: Router,
  ) {
    // subscribe to router navigation
    this.router.events.subscribe(event => {
      // filter `NavigationEnd` events
      if (event instanceof NavigationEnd) {
        // get current route without leading slash `/`
        const eventUrl = event.urlAfterRedirects;
        // set bgClass property with the value of the current route
        if (eventUrl === '/not-found') {
          this.bgClass = 'not-found';
        } else {
          this.bgClass = '';
        }
      }
    });
  }
}
