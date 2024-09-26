import { NgClass, ViewportScroller } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterOutlet } from '@angular/router';
import '@elvia/elvis-accordion';
import '@elvia/elvis-app-bridge';
import '@elvia/elvis-autocomplete';
import '@elvia/elvis-badge';
import '@elvia/elvis-box';
import '@elvia/elvis-breadcrumb';
import '@elvia/elvis-card';
import '@elvia/elvis-carousel';
import '@elvia/elvis-chip';
import '@elvia/elvis-context-menu';
import '@elvia/elvis-datepicker';
import '@elvia/elvis-datepicker-range';
import '@elvia/elvis-divider';
import '@elvia/elvis-dropdown';
import '@elvia/elvis-header';
import '@elvia/elvis-illustrations/broken';
import '@elvia/elvis-illustrations/clock';
import '@elvia/elvis-illustrations/confirmation';
import '@elvia/elvis-illustrations/connected';
import '@elvia/elvis-illustrations/consumption';
import '@elvia/elvis-illustrations/explain';
import '@elvia/elvis-illustrations/heating';
import '@elvia/elvis-illustrations/hello';
import '@elvia/elvis-illustrations/installation';
import '@elvia/elvis-illustrations/meter-reading';
import '@elvia/elvis-illustrations/new';
import '@elvia/elvis-illustrations/no-connection';
import '@elvia/elvis-illustrations/no-notifications';
import '@elvia/elvis-illustrations/no-position';
import '@elvia/elvis-illustrations/no-results';
import '@elvia/elvis-illustrations/nothing-new';
import '@elvia/elvis-illustrations/office';
import '@elvia/elvis-illustrations/photo';
import '@elvia/elvis-illustrations/power-line';
import '@elvia/elvis-illustrations/power-meter';
import '@elvia/elvis-illustrations/price';
import '@elvia/elvis-illustrations/secret';
import '@elvia/elvis-illustrations/sharing';
import '@elvia/elvis-illustrations/statistics';
import '@elvia/elvis-illustrations/support';
import '@elvia/elvis-illustrations/unplugged';
import '@elvia/elvis-illustrations/user';
import '@elvia/elvis-modal';
import '@elvia/elvis-outline';
import '@elvia/elvis-pagination';
import '@elvia/elvis-popover';
import '@elvia/elvis-progress-linear';
import '@elvia/elvis-radio-filter';
import '@elvia/elvis-segmented-control';
import '@elvia/elvis-slider';
import '@elvia/elvis-spotlight';
import '@elvia/elvis-stepper';
import '@elvia/elvis-tabs';
import '@elvia/elvis-timepicker';
import '@elvia/elvis-toast';
import '@elvia/elvis-tooltip';

import { RouterService } from './core/services/router.service';
import { FooterComponent } from './shell/footer/footer.component';
import { HeaderComponent } from './shell/header/header.component';
import { PageWithSidenavComponent } from './shell/page-with-sidenav/page-with-sidenav.component';
import { ShortcutComponent } from './shell/shortcut/shortcut.component';

type PageLayout = 'notFound' | 'standalonePage' | 'pageWithSidenav';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [
    HeaderComponent,
    NgClass,
    RouterOutlet,
    PageWithSidenavComponent,
    FooterComponent,
    ShortcutComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppComponent {
  currentRoute: PageLayout = 'standalonePage';
  isLandingPage = false;

  constructor(
    private routerService: RouterService,
    viewportScroller: ViewportScroller,
  ) {
    viewportScroller.setOffset([0, 80]);
    this.setCurrentRouteFromUrl(location.pathname);
    this.listenForCurrentPageLayout();
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
}
