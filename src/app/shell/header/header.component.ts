import { Component } from '@angular/core';
import { GlobalService } from 'src/app/core/services/global.service';
import { MobileMenuService } from 'src/app/core/services/mobile-menu.service';
import { OverlayRef } from '@angular/cdk/overlay';
import { MobileMenuComponent } from './mobile-menu/mobile-menu.component';
import { NavigationEnd, Router } from '@angular/router';
import { SearchMenuComponent } from './search-menu/search-menu.component';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  version = require('../../../../packages/elvis/package.json').version;
  internalHeader = false;
  searchMenuOpen = false;
  searchOverlay: OverlayRef;

  constructor(
    private globalService: GlobalService,
    private mobileMenu: MobileMenuService,
    private searchMenu: MobileMenuService,
    private router: Router,
  ) {
    this.globalService.listenShowInternalHeader().subscribe((show) => {
      if (show) {
        this.testInternalHeader();
      } else {
        this.hideInternalHeader();
      }
    });
    this.router.events.subscribe((ev) => {
      if (ev instanceof NavigationEnd && ev.url !== '/components/header-doc') {
        this.hideInternalHeader();
      }
    });
  }

  shortcutEvent(e: KeyboardEvent): void {
    if (!e.shiftKey || e.code !== 'Digit7') {
      return;
    }
    if (this.searchMenuOpen === false) {
      setTimeout(() => { this.openSearchMenu(); }, 50);
    } else {
      this.searchMenu.detach(this.searchOverlay);
      this.searchMenuOpen = false;
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
    this.searchMenuOpen = true;
    this.searchOverlay = this.searchMenu.setupOverlay();
    const compInstance = this.searchMenu.openOverlay(this.searchOverlay, SearchMenuComponent);
    this.searchOverlay.backdropClick().subscribe(() => {
      this.searchMenu.detach(this.searchOverlay);
      this.searchMenuOpen = false;
    });
    compInstance.onDestroy$.subscribe(() => {
      this.searchMenu.detach(this.searchOverlay);
      this.searchMenuOpen = false;
    });
  }

  testInternalHeader(): void {
    this.internalHeader = true;
    const element = document.querySelectorAll('.main-content')[0] as HTMLElement;
    element.classList.add('e-bg-grey-05');
  }

  hideInternalHeader(): void {
    this.internalHeader = false;
    const element = document.querySelectorAll('.main-content')[0] as HTMLElement;
    element.classList.remove('e-bg-grey-05');
  }

  toggleElement(el: string, elClass: string): void {
    const element = document.querySelectorAll(el);
    if (!element[0].classList.contains(elClass)) {
      element[0].classList.add(elClass);
    } else {
      element[0].classList.remove(elClass);
    }
  }

}
