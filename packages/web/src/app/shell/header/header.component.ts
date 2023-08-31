import { Component } from '@angular/core';
import { MobileMenuService } from 'src/app/core/services/mobile-menu.service';
import { OverlayRef } from '@angular/cdk/overlay';
import { MobileMenuComponent } from './mobile-menu/mobile-menu.component';
import { SearchMenuComponent } from './search-menu/search-menu.component';
import { CMSService } from 'src/app/core/services/cms/cms.service';
import { Locale, LocalizationService } from 'src/app/core/services/localization.service';
import { CMSMenu } from 'src/app/core/services/cms/cms.interface';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Theme, ThemeService } from 'src/app/core/services/theme.service';
import { ThemeClassName } from '@elvia/elvis-colors';
import { BreakpointService } from 'src/app/core/services/breakpoint.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  private searchMenuOpen = false;
  private searchOverlay: OverlayRef;
  headerLogoLoaded = false;
  mainMenu: CMSMenu;
  menuContentLoader = true;
  isPrideMonth = false;
  showThemeAnnouncement = !localStorage.getItem('elvisThemeAnnouncementIsClosed');
  themeMenuIsOpen = false;
  currentTheme: Theme = 'light';

  get devMode(): boolean {
    return (
      window.location.href.indexOf('localhost') > -1 ||
      window.location.href.indexOf('elvis-designsystem.netlify.app') > -1 ||
      window.location.href.indexOf('#dev') > -1
    );
  }

  constructor(
    private mobileMenu: MobileMenuService,
    private searchMenu: MobileMenuService,
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
        this.cmsService.getMenu(Locale['en-GB']).then((data) => {
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

    this.checkIfPrideMonth();
  }

  hideContentLoader(evt: Event): void {
    if (evt && evt.target) {
      this.headerLogoLoaded = true;
    }
  }

  openMobileMenu(): void {
    const overlayRef: OverlayRef = this.mobileMenu.setupOverlay();
    const compInstance = this.mobileMenu.openOverlay(overlayRef, MobileMenuComponent);
    overlayRef.backdropClick().subscribe(() => {
      this.mobileMenu.detach(overlayRef);
    });
    compInstance.onDestroy$.subscribe(() => {
      this.mobileMenu.detach(overlayRef);
    });
  }

  openSearchMenu(): void {
    if (this.searchMenuOpen) {
      return;
    }
    this.searchMenuOpen = true;
    this.searchOverlay = this.searchMenu.setupOverlay();
    const compInstance = this.searchMenu.openOverlay(this.searchOverlay, SearchMenuComponent);
    this.searchOverlay.backdropClick().subscribe(() => {
      this.closeSearchMenu();
    });
    compInstance.onDestroy$.subscribe(() => {
      this.closeSearchMenu();
    });
  }

  openThemeMenu = (): void => {
    if (this.themeMenuIsOpen) {
      return;
    }

    this.themeMenuIsOpen = true;
  };

  closeThemeMenu = (): void => {
    this.themeMenuIsOpen = false;
  };

  private checkIfPrideMonth(): void {
    const currentMonth = new Date().getMonth();
    if (currentMonth === 5) {
      this.isPrideMonth = true;
    }
  }

  private addDarkThemeClass = (theme: Theme): void => {
    const classToRemove: ThemeClassName = theme === 'light' ? 'e-theme-dark' : 'e-theme-light';
    const classToAdd: ThemeClassName = theme === 'light' ? 'e-theme-light' : 'e-theme-dark';

    document.body.style.colorScheme = theme;
    document.body.classList.remove(classToRemove);
    if (!document.body.classList.contains(classToAdd)) {
      document.body.classList.add(classToAdd);
    }
  };

  private closeSearchMenu(): void {
    this.searchMenu.detach(this.searchOverlay);
    this.searchMenuOpen = false;
  }

  getThemeAnnouncementVisibility = () => {
    this.showThemeAnnouncement = !localStorage.getItem('elvisThemeAnnouncementIsClosed');
  };

  closeThemeAnnouncement = () => {
    localStorage.setItem('elvisThemeAnnouncementIsClosed', 'true');
    this.showThemeAnnouncement = false;
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
