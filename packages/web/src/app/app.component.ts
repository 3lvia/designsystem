import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { DocumentEventListenerService } from './core/services/document-event-listener.service';
import { RouterService } from './core/services/router.service';
import { ViewportScroller } from '@angular/common';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit, OnDestroy {
  private unsubscriber = new Subject();

  constructor(
    private documentEventListenerService: DocumentEventListenerService,
    private routerService: RouterService,
    private viewportScroller: ViewportScroller,
  ) {}

  @HostListener('document:keypress', ['$event'])
  navigateOnKeyboardEvents(event: KeyboardEvent): void {
    this.documentEventListenerService.handleKeyboardEvent(event);
  }

  ngOnInit(): void {
    const darkMode = window.matchMedia('(prefers-color-scheme: dark)');
    this.handleMode(darkMode.matches);
    this.enableScrollRestorationOnUrlPathChange();
  }

  ngOnDestroy(): void {
    this.unsubscriber.next();
    this.unsubscriber.complete();
  }

  private enableScrollRestorationOnUrlPathChange(): void {
    this.routerService
      .urlPathChange()
      .pipe(takeUntil(this.unsubscriber))
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
