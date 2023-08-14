import { Component, Input } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { RouterService } from '../../core/services/router.service';

@Component({
  selector: 'app-page-with-sidenav',
  templateUrl: './page-with-sidenav.component.html',
  styleUrls: ['./page-with-sidenav.component.scss'],
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
