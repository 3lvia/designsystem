import { TitleCasePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';

import { RouterService } from '../../core/services/router.service';
import { FeedbackLinkComponent } from '../../shared/feedback/feedback-link/feedback-link.component';
import { FeedbackComponent } from '../../shared/feedback/feedback.component';
import { DesktopNavbarComponent } from '../../shared/navbar/desktop-navbar/desktop-navbar.component';
import { FlexibleFullHeightDirective } from '../../shared/navbar/desktop-navbar/flexible-full-height.directive';
import { LocalePickerComponent } from '../../shared/navbar/locale-picker/locale-picker.component';
import { MobileNavbarComponent } from '../../shared/navbar/mobile-navbar/mobile-navbar.component';
import { IfViewportSizeDirective } from '../../shared/viewport-size/if-viewport-size.directive';

@Component({
  selector: 'app-page-with-sidenav',
  templateUrl: './page-with-sidenav.component.html',
  styleUrls: ['./page-with-sidenav.component.scss'],
  standalone: true,
  imports: [
    IfViewportSizeDirective,
    FlexibleFullHeightDirective,
    DesktopNavbarComponent,
    RouterLink,
    FeedbackLinkComponent,
    LocalePickerComponent,
    MobileNavbarComponent,
    FeedbackComponent,
    TitleCasePipe,
  ],
})
export class PageWithSidenavComponent {
  @Input() isLandingPage = false;
  backBtn = '';
  currentRoute = '';

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
    this.currentRoute = url.split('/')[1];
    this.backBtn = this.currentRoute.replace('-', ' ');
  }
}
