import { Component, HostListener, OnInit } from '@angular/core';
import { DocumentEventListenerService } from './core/services/document-event-listener.service';
import { RouterService } from './core/services/router.service';
import { ViewportScroller } from '@angular/common';
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

  constructor(
    private documentEventListenerService: DocumentEventListenerService,
    private routerService: RouterService,
    private viewportScroller: ViewportScroller,
  ) {
    this.enableScrollRestorationOnUrlPathChange();
    this.listenForCurrentPage();
  }

  @HostListener('document:keypress', ['$event'])
  navigateOnKeyboardEvents(event: KeyboardEvent): void {
    this.documentEventListenerService.handleKeyboardEvent(event);
  }

  ngOnInit(): void {
    const darkMode = window.matchMedia('(prefers-color-scheme: dark)');
    this.handleMode(darkMode.matches);
  }

  private listenForCurrentPage(): void {
    this.routerService
      .urlPathChange()
      .pipe(takeUntilDestroyed())
      .subscribe((url) => {
        this.isLandingPage = !url.split('/')[2];

        if (url === '/not-found') {
          this.currentRoute = 'notFound';
        } else if (url === '/' || url.includes('/#') || url === '/home') {
          this.currentRoute = 'standalonePage';
        } else {
          this.currentRoute = 'pageWithSidenav';
        }
      });
  }

  private enableScrollRestorationOnUrlPathChange(): void {
    this.routerService
      .urlPathChange()
      .pipe(takeUntilDestroyed())
      .subscribe(() => {
        this.viewportScroller.scrollToPosition([0, 0]);
      });
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
