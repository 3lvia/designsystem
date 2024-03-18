import { animate, style, transition, trigger } from '@angular/animations';
import { Overlay, OverlayModule } from '@angular/cdk/overlay';
import { CdkPortal, PortalModule } from '@angular/cdk/portal';
import { AsyncPipe } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { IllustrationsExhibitDetailsComponent } from './illustrations-exhibit-details/illustrations-exhibit-details.component';
import { IllustrationsExhibitFilterComponent } from './illustrations-exhibit-filter/illustrations-exhibit-filter.component';
import { IllustrationsExhibitListComponent } from './illustrations-exhibit-list/illustrations-exhibit-list.component';
import { IllustrationsExhibitService } from './illustrations-exhibit.service';

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

  constructor(illustrationsExhibitService: IllustrationsExhibitService, overlay: Overlay) {
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
  }
}
