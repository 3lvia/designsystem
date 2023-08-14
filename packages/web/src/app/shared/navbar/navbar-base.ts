import { Directive, HostBinding } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { CMSNavbarItem } from '../../core/services/cms/cms.interface';
import { CMSService } from '../../core/services/cms/cms.service';
import { Locale, LocalizationService } from '../../core/services/localization.service';
import { RouterService } from '../../core/services/router.service';
import { combineLatest, startWith } from 'rxjs';

/**
 * This class serves to reduce code duplication that is shared between the
 * desktop navbar and the mobile navbar. It is not used as an directive,
 * but needs to be registered as one to use Angular features. This is why
 * the eslint rule for directive names is disabled for this class.
 */
@Directive({ selector: '[appNavbarBase]' })
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
    this.getNavItemsOnLocaleOrUrlChange();
    this.listenForCurrentLandingPage();
  }

  private getNavItemsOnLocaleOrUrlChange(): void {
    combineLatest([
      this.localeService.listenLocalization(),
      this.routerService.urlPathChange().pipe(startWith(null)),
    ])
      .pipe(takeUntilDestroyed())
      .subscribe(([locale]) => {
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
