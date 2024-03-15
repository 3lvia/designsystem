import { Component, inject } from '@angular/core';

import { IllustrationsExhibitFilterComponent } from './illustrations-exhibit-filter/illustrations-exhibit-filter.component';
import { IllustrationsExhibitService } from './illustrations-exhibit.service';

@Component({
  selector: 'app-illustrations-exhibit',
  standalone: true,
  imports: [IllustrationsExhibitFilterComponent],
  templateUrl: './illustrations-exhibit.component.html',
  styleUrl: './illustrations-exhibit.component.scss',
})
export class IllustrationsExhibitComponent {
  searchValue = inject(IllustrationsExhibitService).searchValue;
  colorValue = inject(IllustrationsExhibitService).colorValue;
}
