import { Component, OnDestroy } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { LocalizationService } from 'src/app/core/services/localization.service';
import { CMSService } from 'src/app/core/services/cms/cms.service';
import { CMSMenu } from 'src/app/core/services/cms/cms.interface';
@Component({
  selector: 'app-mobile-menu',
  templateUrl: './mobile-menu.component.html',
  styleUrls: ['./mobile-menu.component.scss'],
})
export class MobileMenuComponent implements OnDestroy {
  mainMenu: CMSMenu;
  devMode = false;
  isLoaded = false;

  private onDestroy = new Subject<void>();

  private onDestroy$ = this.onDestroy.asObservable();

  private subscriptions: Subscription = new Subscription();

  constructor(
    private router: Router,
    private cmsService: CMSService,
    private localizationService: LocalizationService,
  ) {
    this.localizationService.listenLocalization().subscribe((locale) => {
      this.cmsService.getMenu(locale).then((data) => {
        this.mainMenu = data;
        this.isLoaded = true;
      });
    });

    if (
      window.location.href.indexOf('localhost') > -1 ||
      window.location.href.indexOf('elvis-designsystem.netlify.app') > -1 ||
      window.location.href.indexOf('#dev') > -1
    ) {
      this.devMode = true;
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  onClose(): void {
    this.onDestroy.next();
  }

  navigate(path?: string): void {
    if (!path) return;
    this.router.navigate(['/' + path]);
    this.onClose();
  }
}
