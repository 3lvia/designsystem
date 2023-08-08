import { Component } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent {
  isLandingPage = false;
  isHomePage = false;
  isNotFound = false;

  constructor(private router: Router) {
    // subscribe to router navigation
    this.router.events.pipe(takeUntilDestroyed()).subscribe((event) => {
      // filter `NavigationEnd` events
      if (event instanceof NavigationEnd) {
        // get current route without leading slash `/`
        const eventUrl = event.urlAfterRedirects;
        // set bgClass property with the value of the current route
        this.isNotFound = eventUrl === '/not-found';

        this.isHomePage = eventUrl === '/' || eventUrl.includes('/#') || eventUrl === '/home';

        this.isLandingPage = !eventUrl.split('/')[2];
      }
    });
  }
}
