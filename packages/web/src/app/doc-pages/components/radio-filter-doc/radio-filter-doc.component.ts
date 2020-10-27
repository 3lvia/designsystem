import { Component } from '@angular/core';
import { getComponent } from 'src/app/shared/e-items';

@Component({
  selector: 'app-radio-filter-doc',
  templateUrl: './radio-filter-doc.component.html',
  styleUrls: ['./radio-filter-doc.component.scss'],
})
export class RadioFilterDocComponent {
  figmaUrl = getComponent('radio-filter').figmaUrl;
  description = getComponent('radio-filter').description;
  selected = 'label1';

  // tslint:disable-next-line: max-line-length
  whens = ['Filter/toggle between different views of same content', 'When you want to have all options visible at all times and not hidden in a dropdown.'];
  whenNots = ['Toggle between different content (then use tabs or segmented control instead)'];

  RadioFilter = `<div class="e-radio-filter-container">
  <button
    class="e-radio-filter"
    (click)="selected = 'label1'"
    [ngClass]="{ 'e-radio-filter--selected': selected === 'label1' }"
  >
    Filter 1
  </button>
  <button
    class="e-radio-filter"
    (click)="selected = 'label2'"
    [ngClass]="{ 'e-radio-filter--selected': selected === 'label2' }"
  >
    Filter 2
  </button>
  <button class="e-radio-filter e-radio-filter---disabled">
    Filter 3
  </button>
</div>
`;
  RadioFilterTS = `selected = 'label1';
`;

}
