import { Directive, HostBinding, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Subject, distinctUntilChanged, filter, map, startWith } from 'rxjs';

import { allDocPages } from '../doc-pages';
import { DocPage } from '../shared.interface';
import { LocalizationService } from 'src/app/core/services/localization.service';
import { RouterService } from 'src/app/core/services/router.service';

/**
 * This class serves to reduce code duplication that is shared between the
 * desktop navbar and the mobile navbar. It is not used as an directive,
 * but needs to be registered as one to use Angular features. This is why
 * the eslint rule for directive names is disabled for this class.
 */
@Directive({
  selector: '[appNavbarBase]',
})
// eslint-disable-next-line @angular-eslint/directive-class-suffix
export class NavbarBase {
  private navbarListChangedSubject = new Subject<void>();
  @HostBinding('attr.role') hostRole = 'navigation';
  navbarList: DocPage[] = [];
  navbarListChange = this.navbarListChangedSubject.asObservable();
  currentLocale = inject(LocalizationService).listenLocalization();

  constructor(protected routerService: RouterService) {
    this.getNavItemsOnLocaleOrUrlChange();
  }

  private getNavItemsOnLocaleOrUrlChange(): void {
    this.routerService
      .urlPathChange()
      .pipe(
        startWith(this.routerService.getCurrentUrlPath()), // Start with empty to ensure that we get navbar items on initial render
        map((path) => path.match(/\/[^/]+/)?.[0]), // Extract first segment (e.g., "/about")
        filter((path): path is string => !!path),
        distinctUntilChanged(), // Only get new items when root path changes
        map((path) => allDocPages.filter((page) => page.absolutePath?.startsWith(path)) ?? []),
        takeUntilDestroyed(),
      )
      .subscribe((navbarItems) => {
        this.navbarList = navbarItems;
        this.navbarListChangedSubject.next();
      });
  }
}
