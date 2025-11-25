import { CdkTrapFocus } from '@angular/cdk/a11y';
import { Component, inject } from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { filter, fromEvent } from 'rxjs';

import { entranceAnimation } from '../../exhibit-detail-animation';
import { IllustrationsExhibitDetailsComponent } from './illustrations-exhibit-details/illustrations-exhibit-details.component';
import { IllustrationsExhibitFilterComponent } from './illustrations-exhibit-filter/illustrations-exhibit-filter.component';
import { IllustrationsExhibitListComponent } from './illustrations-exhibit-list/illustrations-exhibit-list.component';
import { IllustrationsExhibitService } from './illustrations-exhibit.service';

@Component({
  selector: 'app-illustrations-exhibit',
  imports: [
    CdkTrapFocus,
    IllustrationsExhibitFilterComponent,
    IllustrationsExhibitListComponent,
    IllustrationsExhibitDetailsComponent,
  ],
  templateUrl: './illustrations-exhibit.component.html',
  styleUrl: './illustrations-exhibit.component.scss',
  animations: [entranceAnimation],
})
export class IllustrationsExhibitComponent {
  private illustrationsExhibitService = inject(IllustrationsExhibitService);
  selectedIllustration = toSignal(this.illustrationsExhibitService.selectedIllustration);
  theme = toSignal(this.illustrationsExhibitService.theme);

  constructor() {
    fromEvent(document, 'keydown')
      .pipe(
        takeUntilDestroyed(),
        filter((event) => event instanceof KeyboardEvent && event.key === 'Escape'),
      )
      .subscribe(() => {
        this.illustrationsExhibitService.setSelectedIllustration(null);
      });

    fromEvent(document, 'click')
      .pipe(
        takeUntilDestroyed(),
        filter(
          (event) =>
            !(event.target as HTMLElement)?.closest(
              'app-illustrations-exhibit-details, .illustration-example, elvia-radio-filter, elvia-segmented-control',
            ),
        ),
      )
      .subscribe(() => {
        this.illustrationsExhibitService.setSelectedIllustration(null);
      });
  }
}
