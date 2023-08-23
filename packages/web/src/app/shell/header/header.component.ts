import { Component, HostListener, OnDestroy } from '@angular/core';
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
import { Subject, merge, takeUntil } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnDestroy {
  private unsubscriber = new Subject<void>();
  searchMenuOpen = false;
  searchOverlay: OverlayRef;
  headerLogoLoaded = false;
  devMode = false;
  mainMenu: CMSMenu;
  menuContentLoader = true;
  isPrideMonth = false;
  showThemeAnnouncement = false;
  themeMenuIsOpen = false;
  currentTheme: Theme = 'light';

  constructor(
    private mobileMenu: MobileMenuService,
    private searchMenu: MobileMenuService,
    private cmsService: CMSService,
    private localizationService: LocalizationService,
    private themeService: ThemeService,
  ) {
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

    if (
      window.location.href.indexOf('localhost') > -1 ||
      window.location.href.indexOf('elvis-designsystem.netlify.app') > -1 ||
      window.location.href.indexOf('#dev') > -1
    ) {
      this.devMode = true;
    }

    this.themeService
      .listenTheme()
      .pipe(takeUntilDestroyed())
      .subscribe((theme) => {
        this.currentTheme = theme;
        this.addDarkThemeClass(this.currentTheme);
      });

    this.checkIfPrideMonth();
    this.getThemeAnnouncementVisibility();
  }

  ngOnDestroy(): void {
    this.unsubscriber.next();
    this.unsubscriber.complete();
  }

  checkIfPrideMonth(): void {
    const currentMonth = new Date().getMonth();
    if (currentMonth === 5) {
      this.isPrideMonth = true;
    }
  }

  hideContentLoader(evt: Event): void {
    if (evt && evt.target) {
      this.headerLogoLoaded = true;
    }
  }

  openMobileMenu(): void {
    const overlayRef: OverlayRef = this.mobileMenu.setupOverlay();
    const compInstance = this.mobileMenu.openOverlay(overlayRef, MobileMenuComponent);
    merge(overlayRef.backdropClick(), compInstance.onDestroy$)
      .pipe(takeUntil(this.unsubscriber))
      .subscribe(() => {
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

    merge(this.searchOverlay.backdropClick(), compInstance.onDestroy$)
      .pipe(takeUntil(this.unsubscriber))
      .subscribe(() => {
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

  private addDarkThemeClass = (theme: Theme): void => {
    const classToRemove: ThemeClassName = theme === 'light' ? 'e-theme-dark' : 'e-theme-light';
    const classToAdd: ThemeClassName = theme === 'light' ? 'e-theme-light' : 'e-theme-dark';

    document.body.classList.remove(classToRemove);
    if (!document.body.classList.contains(classToAdd)) {
      document.body.classList.add(classToAdd);
    }
  };

  closeSearchMenu(): void {
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

  @HostListener('window:resize', ['$event'])
  onWindowResize = () => {
    if (window.innerWidth <= 1023) {
      this.closeThemeMenu();
    }
  };
}
