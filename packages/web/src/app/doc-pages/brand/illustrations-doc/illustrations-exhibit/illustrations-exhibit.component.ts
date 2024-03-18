import { animate, style, transition, trigger } from '@angular/animations';
import { Overlay, OverlayModule } from '@angular/cdk/overlay';
import { CdkPortal, PortalModule } from '@angular/cdk/portal';
import { AsyncPipe } from '@angular/common';
import { Component, HostListener, ViewChild } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { IllustrationsExhibitDetailsComponent } from './illustrations-exhibit-details/illustrations-exhibit-details.component';
import { IllustrationsExhibitFilterComponent } from './illustrations-exhibit-filter/illustrations-exhibit-filter.component';
import { IllustrationsExhibitListComponent } from './illustrations-exhibit-list/illustrations-exhibit-list.component';
import { IllustrationsExhibitService } from './illustrations-exhibit.service';
import { BreakpointService } from 'src/app/core/services/breakpoint.service';

@Component({
  selector: 'app-illustrations-exhibit',
  standalone: true,
  imports: [
    AsyncPipe,
    OverlayModule,
    PortalModule,
    IllustrationsExhibitFilterComponent,
    IllustrationsExhibitListComponent,
    IllustrationsExhibitDetailsComponent,
  ],
  templateUrl: './illustrations-exhibit.component.html',
  styleUrl: './illustrations-exhibit.component.scss',
  animations: [
    trigger('entranceAnimation', [
      transition(':enter', [
        style({ opacity: 0, translate: '0 24px' }),
        animate('200ms ease-in', style({ opacity: 1, translate: '0' })),
      ]),
      transition(':leave', [animate('200ms ease-in', style({ opacity: 0, translate: '0 24px' }))]),
    ]),
  ],
})
export class IllustrationsExhibitComponent {
  @ViewChild(CdkPortal) portal: CdkPortal;

  constructor(
    private illustrationsExhibitService: IllustrationsExhibitService,
    overlay: Overlay,
    breakpointService: BreakpointService,
  ) {
    const overlayRef = overlay.create({
      positionStrategy: overlay.position().global().centerHorizontally().bottom('16px'),
      maxWidth: 'calc(100vw - 32px)',
      scrollStrategy: overlay.scrollStrategies.reposition(),
    });

    overlayRef.outsidePointerEvents().subscribe((e) => {
      // Do not close if the click is on another illustration example
      if ((e.target as HTMLElement)?.closest('.illustration-example')) {
        return;
      }
      illustrationsExhibitService.setSelectedIllustration(null);
    });

    illustrationsExhibitService.selectedIllustration
      .pipe(takeUntilDestroyed())
      .subscribe((selectedIllustration) => {
        if (selectedIllustration) {
          if (!overlayRef.hasAttached()) {
            overlayRef.attach(this.portal);
          }
        } else {
          overlayRef.detach();
        }
      });

    breakpointService
      .matches(['sm'])
      .pipe(takeUntilDestroyed())
      .subscribe((isMobile) => {
        overlayRef.updatePositionStrategy(
          isMobile
            ? overlay.position().global().centerHorizontally().bottom('0')
            : overlay.position().global().centerHorizontally().bottom('16px'),
        );
        overlayRef.updateSize({
          maxWidth: isMobile ? '100vw' : 'calc(100vw - 32px)',
          width: isMobile ? '100vw' : undefined,
        });
        overlayRef.updatePosition();
      });
  }

  @HostListener('document:keydown.escape') closeOverlay = () => {
    this.illustrationsExhibitService.setSelectedIllustration(null);
  };
}
