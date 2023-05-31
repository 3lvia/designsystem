import { Component, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  bgClass = '';

  date = new Date();
  currentYear: number;

  constructor(private router: Router) {
    // subscribe to router navigation
    this.router.events.pipe(takeUntilDestroyed()).subscribe((event) => {
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
  ngOnInit(): void {
    this.currentYear = this.date.getFullYear();
  }
}
