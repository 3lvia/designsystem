import { Component } from '@angular/core';
import { getComponent } from 'src/app/shared/e-items';

@Component({
  selector: 'app-filter-button-doc',
  templateUrl: './filter-button-doc.component.html',
  styleUrls: ['./filter-button-doc.component.scss'],
})
export class FilterButtonDocComponent {
  figmaUrl = getComponent('filter-button-doc').figmaUrl;
  description = getComponent('filter-button-doc').description;
  selected = 'label1';

  // tslint:disable-next-line: max-line-length
  whens = ['Filter/toggle between different views of same content', 'When you want to have all options visible at all times and not hidden in a dropdown.'];
  whenNots = ['Toggle between different content (then use tabs or segmented control instead)'];

  filterButton = `<div class="e-filter-button-container">
  <button
    class="e-filter-button"
    (click)="selected = 'label1'"
    [ngClass]="{ 'e-filter-button--selected': selected === 'label1' }"
  >
    Filter 1
  </button>
  <button
    class="e-filter-button"
    (click)="selected = 'label2'"
    [ngClass]="{ 'e-filter-button--selected': selected === 'label2' }"
  >
    Filter 2
  </button>
  <button class="e-filter-button e-filter-button---disabled">
    Filter 3
  </button>
</div>
`;
  filterButtonTS = `selected = 'label1';
`;

}
