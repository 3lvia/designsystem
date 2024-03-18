import { animate, style, transition, trigger } from '@angular/animations';
import { Component, HostListener, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

import { IllustrationsExhibitDetailsComponent } from './illustrations-exhibit-details/illustrations-exhibit-details.component';
import { IllustrationsExhibitFilterComponent } from './illustrations-exhibit-filter/illustrations-exhibit-filter.component';
import { IllustrationsExhibitListComponent } from './illustrations-exhibit-list/illustrations-exhibit-list.component';
import { IllustrationsExhibitService } from './illustrations-exhibit.service';

@Component({
  selector: 'app-illustrations-exhibit',
  standalone: true,
  imports: [
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
        animate('200ms ease-in-out', style({ opacity: 1, translate: '0' })),
      ]),
      transition(':leave', [animate('200ms ease-in-out', style({ opacity: 0, translate: '0 24px' }))]),
    ]),
  ],
})
export class IllustrationsExhibitComponent {
  private illustrationsExhibitService = inject(IllustrationsExhibitService);
  selectedIllustration = toSignal(this.illustrationsExhibitService.selectedIllustration);

  @HostListener('document:keydown.escape')
  closeOverlay = () => {
    this.illustrationsExhibitService.setSelectedIllustration(null);
  };

  @HostListener('document:click', ['$event'])
  closeOverlayOnClick = (event: MouseEvent) => {
    if (
      (event.target as HTMLElement)?.closest(
        'app-illustrations-exhibit-details, .illustration-example, elvia-radio-filter',
      )
    ) {
      return;
    }
    this.illustrationsExhibitService.setSelectedIllustration(null);
  };
}
