import { Component } from '@angular/core';
import { GlobalService } from 'src/app/core/services/global.service';
import { MobileMenuService } from 'src/app/core/services/mobile-menu.service';
import { OverlayRef } from '@angular/cdk/overlay';
import { MobileMenuComponent } from './mobile-menu/mobile-menu.component';
import { NavigationEnd, Router } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  version = require('../../../../style/elvis/package.json').version;
  internalHeader = false;

  constructor(
    private globalService: GlobalService,
    private mobileMenu: MobileMenuService,
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

  removeWarning(): void {
    this.globalService.headerWarning.show = false;
  }

  showWarning(): boolean {
    return this.globalService.headerWarning.show;
  }

  removableWarning(): boolean {
    return this.globalService.headerWarning.closable;
  }

  openMobileMenu(): void {
    const overlayRef: OverlayRef = this.mobileMenu.setupOverlay();
    const compInstance = this.mobileMenu.openOverlay(overlayRef, MobileMenuComponent);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    overlayRef.backdropClick().subscribe(next => {
      this.mobileMenu.detach(overlayRef);
    });
    compInstance.onDestroy$.subscribe(() => {
      this.mobileMenu.detach(overlayRef);
    });
  }

  testInternalHeader(): void {
    this.removeWarning();
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
