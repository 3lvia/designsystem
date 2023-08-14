import { Directive, HostBinding } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { CMSNavbarItem } from '../../core/services/cms/cms.interface';
import { CMSService } from '../../core/services/cms/cms.service';
import { Locale, LocalizationService } from '../../core/services/localization.service';
import { RouterService } from '../../core/services/router.service';

@Directive({ selector: '[appNavbarBase]' })
// Since this class is not used as an actual directive, the name has been simplified
// eslint-disable-next-line @angular-eslint/directive-class-suffix
export class NavbarBase {
  @HostBinding('attr.role') readOnly = 'navigation';
  currentLandingPage = '';
  navbarList: CMSNavbarItem[] = [];

  constructor(
    private cmsService: CMSService,
    private localeService: LocalizationService,
    private routerService: RouterService,
  ) {
    this.currentLandingPage = routerService.getCurrentUrlPath().split('/')[1];
    this.listenForLocaleChanges();
    this.listenForCurrentLandingPage();
  }

  private listenForLocaleChanges(): void {
    this.localeService
      .listenLocalization()
      .pipe(takeUntilDestroyed())
      .subscribe((locale) => {
        this.getNavbarList(locale);
      });
  }

  private listenForCurrentLandingPage(): void {
    this.routerService
      .urlPathChange()
      .pipe(takeUntilDestroyed())
      .subscribe((url) => {
        this.currentLandingPage = url.split('/')[1];
      });
  }

  private getNavbarList(locale: Locale): void {
    this.cmsService.getSubMenuList(locale).then((navbarList) => (this.navbarList = navbarList));
  }
}
