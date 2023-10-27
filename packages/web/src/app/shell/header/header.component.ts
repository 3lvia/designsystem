import { Component } from '@angular/core';
import { CMSService } from 'src/app/core/services/cms/cms.service';
import { LocalizationService } from 'src/app/core/services/localization.service';
import { CMSMenu } from 'src/app/core/services/cms/cms.interface';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Theme, ThemeService } from 'src/app/core/services/theme.service';
import { ThemeClassName } from '@elvia/elvis-colors';
import { BreakpointService } from 'src/app/core/services/breakpoint.service';

type MenuType = 'search' | 'mobileMenu' | null;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  visibleMenuType: MenuType = null;
  mainMenu: CMSMenu;
  menuContentLoader = true;
  themeMenuIsOpen = false;
  currentTheme: Theme = 'light';

  get devMode(): boolean {
    return (
      window.location.href.indexOf('localhost') > -1 ||
      window.location.href.indexOf('elvis-designsystem.netlify.app') > -1 ||
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

  constructor(
    private cmsService: CMSService,
    private localizationService: LocalizationService,
    private themeService: ThemeService,
    private breakpointService: BreakpointService,
  ) {
    this.closeThemeMenuOnMobile();

    this.localizationService
      .listenLocalization()
      .pipe(takeUntilDestroyed())
      .subscribe(() => {
        // The main menu is only available in english until more pages are translated
        this.cmsService.getMenu('en-GB').then((data) => {
          this.mainMenu = data;
          this.menuContentLoader = false;
        });
      });

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

    document.body.style.colorScheme = theme;
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
