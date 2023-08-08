import { Component } from '@angular/core';
import { RouterService } from '../../core/services/router.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-page-with-sidenav',
  templateUrl: './page-with-sidenav.component.html',
  styleUrls: ['./page-with-sidenav.component.scss'],
})
export class PageWithSidenavComponent {
  isLandingPage = false;

  constructor(private urlService: RouterService) {
    this.urlService.urlPathChange().subscribe((url) => {
      console.log(url);
      this.isLandingPage = !url.split('/')[2];
    });
  }
}
