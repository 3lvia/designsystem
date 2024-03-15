import { Component, inject } from '@angular/core';

import { IllustrationsExhibitFilterComponent } from './illustrations-exhibit-filter/illustrations-exhibit-filter.component';
import { IllustrationsExhibitListComponent } from './illustrations-exhibit-list/illustrations-exhibit-list.component';
import { IllustrationsExhibitService } from './illustrations-exhibit.service';

@Component({
  selector: 'app-illustrations-exhibit',
  standalone: true,
  imports: [IllustrationsExhibitFilterComponent, IllustrationsExhibitListComponent],
  templateUrl: './illustrations-exhibit.component.html',
  styleUrl: './illustrations-exhibit.component.scss',
})
export class IllustrationsExhibitComponent {
  searchValue = inject(IllustrationsExhibitService).searchValue;
  colorValue = inject(IllustrationsExhibitService).colorValue;
}
