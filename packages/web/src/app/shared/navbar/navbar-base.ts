import { Directive, HostBinding } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Subject, distinctUntilChanged, map, startWith, switchMap } from 'rxjs';

import { CMSNavbarItem } from 'src/app/core/services/cms/cms.interface';
import { CMSService } from 'src/app/core/services/cms/cms.service';
import { LocalizationService } from 'src/app/core/services/localization.service';
import { RouterService } from 'src/app/core/services/router.service';

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
    this.routerService
      .urlPathChange()
      .pipe(
        takeUntilDestroyed(),
        map((path) => path.split('/')[1]), // Only get new items when root path changes
        distinctUntilChanged(),
        startWith(''), // Start with empty to ensure that we get navbar items on initial render
        switchMap(() => this.localeService.listenLocalization()),
        switchMap((locale) => this.cmsService.getSubMenuList(locale)),
      )
      .subscribe((navbarItems) => {
        /**
         * Just map over the new titles, if the navbar just changed locale.
         */
        if (this.localeChangedForExistingNavItems(navbarItems)) {
          this.navbarList.forEach(
            (item) =>
              (item.title =
                navbarItems.find((newItem) => newItem.fullPath === item.fullPath)?.title ?? item.title),
          );
        } else {
          this.navbarList = navbarItems;
          this.navbarList.unshift({
            title: 'CSS Library',
            isMainPage: true,
            fullPath: '/components/css-library',
          });
          this.navbarListChangedSubject.next();
        }
      });
  }

  private localeChangedForExistingNavItems(newItems: CMSNavbarItem[]): boolean {
    return (
      this.navbarList.length > 0 &&
      this.navbarList.every((existingItem) =>
        newItems.find((newItem) => newItem.fullPath === existingItem.fullPath),
      )
    );
  }
}
