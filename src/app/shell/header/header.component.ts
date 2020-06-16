import { Component } from '@angular/core';
import { GlobalService } from 'src/app/core/services/global.service';
import { MobileMenuService } from 'src/app/core/services/mobile-menu.service';
import { OverlayRef } from '@angular/cdk/overlay';
import { MobileMenuComponent } from './mobile-menu/mobile-menu.component';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  version = require('../../../../style/elvis/package.json').version;

  constructor(
    private globalService: GlobalService,
    private mobileMenu: MobileMenuService,
  ) { }

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

}
