import { Component, OnInit } from '@angular/core';
import { RouterService } from './core/services/router.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

type PageLayout = 'notFound' | 'standalonePage' | 'pageWithSidenav';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  currentRoute: PageLayout = 'standalonePage';
  isLandingPage = false;

  constructor(private routerService: RouterService) {
    this.setCurrentRouteFromUrl(location.pathname);
    this.listenForCurrentPageLayout();
  }

  ngOnInit(): void {
    const darkMode = window.matchMedia('(prefers-color-scheme: dark)');
    this.handleMode(darkMode.matches);
  }

  private listenForCurrentPageLayout(): void {
    this.routerService
      .urlPathChange()
      .pipe(takeUntilDestroyed())
      .subscribe((url) => {
        this.isLandingPage = !url.split('/')[2];
        this.setCurrentRouteFromUrl(url);
      });
  }

  private setCurrentRouteFromUrl(url: string): void {
    if (url === '/not-found') {
      this.currentRoute = 'notFound';
    } else if (url === '/' || url === '/home' || url === '/dev') {
      this.currentRoute = 'standalonePage';
    } else {
      this.currentRoute = 'pageWithSidenav';
    }
  }

  private handleMode(darkMode: boolean): void {
    const favicon = document.querySelector('link[rel="icon"]');
    if (!favicon) {
      console.warn('Cant find favicon element');
      return;
    }
    if (darkMode) {
      favicon.setAttribute('href', './../assets/favicon/favicon_final_white/favicon.ico');
    } else {
      favicon.setAttribute('href', './../assets/favicon/favicon_final_black/favicon.ico');
    }
  }
}
