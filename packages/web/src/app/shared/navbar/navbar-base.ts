import { Directive, HostBinding } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { CMSNavbarItem } from 'src/app/core/services/cms/cms.interface';
import { CMSService } from 'src/app/core/services/cms/cms.service';
import { Locale, LocalizationService } from 'src/app/core/services/localization.service';
import { RouterService } from 'src/app/core/services/router.service';
import { Subject, combineLatest, distinctUntilChanged, map } from 'rxjs';

/**
 * This class serves to reduce code duplication that is shared between the
 * desktop navbar and the mobile navbar. It is not used as an directive,
 * but needs to be registered as one to use Angular features. This is why
 * the eslint rule for directive names is disabled for this class.
 */
@Directive({ selector: '[appNavbarBase]' })
// eslint-disable-next-line @angular-eslint/directive-class-suffix
export class NavbarBase {
  private navbarListChangedSubject = new Subject<void>();
  @HostBinding('attr.role') hostRole = 'navigation';
  navbarList: CMSNavbarItem[] = [];
  navbarListChange = this.navbarListChangedSubject.asObservable();

  constructor(
    private cmsService: CMSService,
    private localeService: LocalizationService,
    protected routerService: RouterService,
  ) {
    this.getNavItemsOnLocaleOrUrlChange();
  }

  private getNavItemsOnLocaleOrUrlChange(): void {
    combineLatest([
      this.localeService.listenLocalization(),
      this.routerService.urlPathChange().pipe(
        map((path) => path.split('/')[1]), // Only get new items when root path changes
        distinctUntilChanged(),
      ),
    ])
      .pipe(takeUntilDestroyed())
      .subscribe(([locale]) => this.getNavbarList(locale));
  }

  private getNavbarList(locale: Locale): void {
    this.cmsService.getSubMenuList(locale).then((navbarList) => {
      this.navbarList = navbarList;
      this.navbarListChangedSubject.next();
    });
  }
}
