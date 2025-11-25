import { A11yModule, CdkTrapFocus } from '@angular/cdk/a11y';
import { NgClass } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, Component, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive, RouterModule } from '@angular/router';
import { ThemeClassName } from '@elvia/elvis-colors';

import { MobileMenuComponent } from './mobile-menu/mobile-menu.component';
import { SearchMenuComponent } from './search-menu/search-menu.component';
import { ThemeSwitchComponent } from './theme-switch/theme-switch.component';
import { BreakpointService } from 'src/app/core/services/breakpoint.service';
import { Theme, ThemeService } from 'src/app/core/services/theme.service';
import { mainMenuItems } from 'src/app/shared/doc-pages';

type MenuType = 'search' | 'mobileMenu' | null;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  imports: [
    NgClass,
    CdkTrapFocus,
    RouterLink,
    RouterLinkActive,
    ThemeSwitchComponent,
    SearchMenuComponent,
    MobileMenuComponent,
    RouterModule,
    FormsModule,
    A11yModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HeaderComponent {
  private themeService = inject(ThemeService);
  private breakpointService = inject(BreakpointService);

  visibleMenuType: MenuType = null;
  mainMenuItems = mainMenuItems;

  themeMenuIsOpen = false;
  currentTheme: Theme = 'light';

  get devMode(): boolean {
    return (
      window.location.href.indexOf('localhost') > -1 ||
      window.location.href.indexOf('azurestaticapps.net') > -1 ||
      window.location.href.indexOf('#dev') > -1
    );
  }

  get logoUrl(): string {
    const isPrideMonth = new Date().getMonth() === 5;
    if (isPrideMonth) {
      return 'assets/logo/elvia_pride_rgb.svg';
    } else if (this.visibleMenuType && this.currentTheme !== 'dark') {
      return 'assets/logo/elvia_positive_1.svg';
    } else {
      return 'assets/logo/elvia_negative_1.svg';
    }
  }

  constructor() {
    this.closeThemeMenuOnMobile();

    this.themeService
      .listenTheme()
      .pipe(takeUntilDestroyed())
      .subscribe((theme) => {
        this.currentTheme = theme;
        this.addDarkThemeClass(this.currentTheme);
      });
  }

  openOverlay(menuType: MenuType): void {
    document.documentElement.style.overflow = 'hidden';
    this.visibleMenuType = menuType;
  }

  closeOverlay(): void {
    document.documentElement.style.overflow = '';
    this.visibleMenuType = null;
  }

  openThemeMenu = (): void => {
    this.closeOverlay();

    this.themeMenuIsOpen = true;
  };

  closeThemeMenu = (): void => {
    this.themeMenuIsOpen = false;
  };

  private addDarkThemeClass = (theme: Theme): void => {
    const classToRemove: ThemeClassName = theme === 'light' ? 'e-theme-dark' : 'e-theme-light';
    const classToAdd: ThemeClassName = theme === 'light' ? 'e-theme-light' : 'e-theme-dark';

    document.documentElement.style.colorScheme = theme;
    document.body.classList.remove(classToRemove);
    if (!document.body.classList.contains(classToAdd)) {
      document.body.classList.add(classToAdd);
    }
  };

  private closeThemeMenuOnMobile(): void {
    this.breakpointService
      .matches(['sm', 'md'])
      .pipe(takeUntilDestroyed())
      .subscribe((isMobileOrTablet) => {
        if (this.themeMenuIsOpen && isMobileOrTablet) {
          this.closeThemeMenu();
        }
      });
  }
}
