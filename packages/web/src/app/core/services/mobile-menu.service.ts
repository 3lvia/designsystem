import { Injectable } from '@angular/core';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal, ComponentType } from '@angular/cdk/portal';

@Injectable({
  providedIn: 'root',
})
export class MobileMenuService {
  constructor(private overlay: Overlay) {}

  setupOverlay(): OverlayRef {
    return this.overlay.create({
      hasBackdrop: true,
      minWidth: '100%',
      scrollStrategy: this.overlay.scrollStrategies.block(),
      positionStrategy: this.overlay.position().global().centerHorizontally().top(),
    });
  }

  openOverlay<ComponentT>(overlayRef: OverlayRef, overlayComponent: ComponentType<ComponentT>): ComponentT {
    const portal = new ComponentPortal(overlayComponent, null);
    const componentRef = overlayRef.attach(portal);
    return componentRef.instance;
  }

  detach(overlayRef: OverlayRef): void {
    overlayRef.detach();
    overlayRef.dispose();
  }
}
