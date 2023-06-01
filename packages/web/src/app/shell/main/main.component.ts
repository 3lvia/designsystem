import { Component } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router } from '@angular/router';
import { ScrollService } from 'src/app/core/services/scroll.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent {
  bgClass = '';
  isLandingPage = false;
  isHomePage = false;
  isNotFound = false;

  constructor(private router: Router, private scrollService: ScrollService) {
    // subscribe to router navigation
    this.router.events.pipe(takeUntilDestroyed()).subscribe((event) => {
      // filter `NavigationEnd` events
      if (event instanceof NavigationEnd) {
        // get current route without leading slash `/`
        const eventUrl = event.urlAfterRedirects;
        // set bgClass property with the value of the current route
        if (eventUrl === '/not-found') {
          this.bgClass = 'not-found';
          this.isNotFound = true;
        } else {
          this.bgClass = '';
          this.isNotFound = false;
        }
        if (eventUrl === '/' || eventUrl.includes('/#') || eventUrl === '/home') {
          this.isHomePage = true;
        } else {
          this.isHomePage = false;
        }
        if (eventUrl.split('/')[2]) {
          this.isLandingPage = false;
        } else {
          this.isLandingPage = true;
        }
      }
    });
  }

  scrollToFeedback(): void {
    const offsetTop = document.body.scrollHeight;
    this.scrollService.scrollToElement(offsetTop);
  }
}
