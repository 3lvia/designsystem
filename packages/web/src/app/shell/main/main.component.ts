import { Component, HostListener } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router } from '@angular/router';
import { DocumentEventListenerService } from 'src/app/core/services/document-event-listener.service';
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

  showShortcutGlossary = false;
  showShortcutGlossaryButton = false;
  private shortcutGlossaryTimeoutId: ReturnType<typeof setTimeout> | undefined;

  constructor(
    private router: Router,
    private scrollService: ScrollService,
    private documentEventListenerService: DocumentEventListenerService,
  ) {
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

    this.documentEventListenerService
      .listenShortcutTriggered()
      .pipe(takeUntilDestroyed())
      .subscribe(() => {
        this.closeShortcutGlossary();
        this.showShortcutGlossaryButton = false;
        clearTimeout(this.shortcutGlossaryTimeoutId);
      });
  }

  openShortcutGlossary = (): void => {
    this.showShortcutGlossary = true;
  };

  closeShortcutGlossary = (): void => {
    this.showShortcutGlossary = false;
  };

  @HostListener('window:keypress', ['$event'])
  handleShortcutGlossary = (event: KeyboardEvent): void => {
    const shortcutGlossary = (event.target as HTMLElement)?.closest('#elvia-shortcut-glossary-modal');

    if (!shortcutGlossary && event.target !== document.body) {
      return;
    }

    if (event.key.toLowerCase() === 'g') {
      if (!this.showShortcutGlossary) {
        this.shortcutGlossaryTimeoutId = setTimeout(this.openShortcutGlossary, 250);
      }
    } else {
      clearTimeout(this.shortcutGlossaryTimeoutId);
    }
  };

  @HostListener('window:keydown.tab', ['$event'])
  handleShortcutGlossaryButton = (): void => {
    this.showShortcutGlossaryButton = true;
  };

  scrollToFeedback(): void {
    const offsetTop = document.body.scrollHeight;
    this.scrollService.scrollToElement(offsetTop);
  }
}
