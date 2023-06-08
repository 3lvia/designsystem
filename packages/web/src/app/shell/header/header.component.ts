import { Component } from '@angular/core';
import { MobileMenuService } from 'src/app/core/services/mobile-menu.service';
import { OverlayRef } from '@angular/cdk/overlay';
import { MobileMenuComponent } from './mobile-menu/mobile-menu.component';
import { SearchMenuComponent } from './search-menu/search-menu.component';
import { CMSService } from 'src/app/core/services/cms/cms.service';
import { Locale, LocalizationService } from 'src/app/core/services/localization.service';
import { CMSMenu } from 'src/app/core/services/cms/cms.interface';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  searchMenuOpen = false;
  searchOverlay: OverlayRef;
  headerLogoLoaded = false;
  devMode = false;
  mainMenu: CMSMenu;
  menuContentLoader = true;
  isPrideMonth = false;

  constructor(
    private mobileMenu: MobileMenuService,
    private searchMenu: MobileMenuService,
    private cmsService: CMSService,
    private localizationService: LocalizationService,
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

    this.checkIfPrideMonth();
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

  closeSearchMenu(): void {
    this.searchMenu.detach(this.searchOverlay);
    this.searchMenuOpen = false;
  }

  toggleTheme = () => {
    document.body.classList.toggle('e-theme-dark');
  };
}
