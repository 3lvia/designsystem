import { Injectable, Injector } from '@angular/core';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal, ComponentType } from '@angular/cdk/portal';

@Injectable({
  providedIn: 'root',
})
export class MobileMenuService {

  constructor(
    private overlay: Overlay,
    private injector: Injector,
  ) { }

  setupOverlay(): OverlayRef {
    return this.overlay.create({
      hasBackdrop: true,
      minWidth: '100%',
      scrollStrategy: this.overlay.scrollStrategies.noop(),
      positionStrategy: this.overlay.position().global().centerHorizontally().top(),
    });
  }

  openOverlay<mobileMenuComp>(overlayRef: OverlayRef, overlayComponent: ComponentType<mobileMenuComp>): any {
    const portal = new ComponentPortal(overlayComponent, null);
    const componentRef = overlayRef.attach(portal);
    return componentRef.instance;
  }

  detach(overlayRef: OverlayRef): void {
    overlayRef.detach();
    overlayRef.dispose();
  }
}
