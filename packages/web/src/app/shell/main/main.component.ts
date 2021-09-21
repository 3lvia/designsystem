import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { ScrollService } from 'src/app/core/services/scroll.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent {
  bgClass = '';
  isLandingPage = false;
  homePage = false;

  constructor(
    private router: Router,
    private scrollService: ScrollService,
    private activatedRoute: ActivatedRoute,
  ) {
    // subscribe to router navigation
    this.router.events.subscribe((event) => {
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
        if (eventUrl === '/' || eventUrl === '/home') {
          this.homePage = true;
        } else {
          this.homePage = false;
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
