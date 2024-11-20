import { TitleCasePipe } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, Component, input, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';

import { RouterService } from '../../core/services/router.service';
import { FeedbackLinkComponent } from '../../shared/feedback/feedback-link/feedback-link.component';
import { FeedbackComponent } from '../../shared/feedback/feedback.component';
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
    FeedbackLinkComponent,
    LocalePickerComponent,
    MobileNavbarComponent,
    FeedbackComponent,
    TitleCasePipe,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PageWithSidenavComponent {
  isLandingPage = input(false);
  backBtn = signal('');
  currentRoute = signal('');

  constructor(urlService: RouterService) {
    /**
     * We need this initial setter, because the url is resolved
     * before this component is mounted, thus the urlPathChange()
     * will not trigger on initial render (when pressing F5).
     */
    this.setCurrentRoute(urlService.getCurrentUrlPath());

    urlService
      .urlPathChange()
      .pipe(takeUntilDestroyed())
      .subscribe((e) => this.setCurrentRoute(e));
  }

  private setCurrentRoute(url: string): void {
    this.currentRoute.set(url.split('/')[1]);
    this.backBtn.set(this.currentRoute().replace('-', ' '));
  }
}
