import { Component, HostListener } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ScrollService } from 'src/app/core/services/scroll.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent {
  bgClass = '';

  listenOnScrollSubscription: Subscription;

  constructor(private router: Router, private scrollService: ScrollService) {
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
      }
    });
  }

  @HostListener('window:scroll', ['$event']) // for window scroll events
  onScroll(): void {
    this.findNewNavbarHeight();
  }

  findNewNavbarHeight(): void {
    this.scrollService.newScrollPosition();
  }
}
