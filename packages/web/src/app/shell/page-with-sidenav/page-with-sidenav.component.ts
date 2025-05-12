import { TitleCasePipe } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, Component, inject, input, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';

import { RouterService } from '../../core/services/router.service';
import { DesktopNavbarComponent } from '../../shared/navbar/desktop-navbar/desktop-navbar.component';
import { LocalePickerComponent } from '../../shared/navbar/locale-picker/locale-picker.component';
import { MobileNavbarComponent } from '../../shared/navbar/mobile-navbar/mobile-navbar.component';
import { IfViewportSizeDirective } from '../../shared/viewport-size/if-viewport-size.directive';

@Component({
  selector: 'app-page-with-sidenav',
  templateUrl: './page-with-sidenav.component.html',
  styleUrls: ['./page-with-sidenav.component.scss'],
  imports: [
    IfViewportSizeDirective,
    DesktopNavbarComponent,
    RouterLink,
    LocalePickerComponent,
    MobileNavbarComponent,
    TitleCasePipe,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PageWithSidenavComponent {
  private routerService = inject(RouterService);

  isLandingPage = input(false);
  backBtn = signal('');
  currentRoute = signal('');

  constructor() {
    /**
     * We need this initial setter, because the url is resolved
     * before this component is mounted, thus the urlPathChange()
     * will not trigger on initial render (when pressing F5).
     */
    this.setCurrentRoute(this.routerService.getCurrentUrlPath());

    this.routerService
      .urlPathChange()
      .pipe(takeUntilDestroyed())
      .subscribe((e) => this.setCurrentRoute(e));
  }

  private setCurrentRoute(url: string): void {
    // @ts-expect-error TS2345 (LEGO-3683)
    this.currentRoute.set(url.split('/')[1]);
    this.backBtn.set(this.currentRoute().replace('-', ' '));
  }
}
