import { Component } from '@angular/core';
import { getComponent } from 'src/app/shared/e-items';
import { exampleContents } from 'src/app/shared/example-contents';

@Component({
  selector: 'app-radio-filter-doc',
  templateUrl: './radio-filter-doc.component.html',
  styleUrls: ['./radio-filter-doc.component.scss'],
})
export class RadioFilterDocComponent {
  examples = exampleContents;
  figmaUrl = getComponent('radio-filter').figmaUrl;
  description = getComponent('radio-filter').description;

  // tslint:disable-next-line: max-line-length
  whens = [
    'Filter/toggle between different views of same content',
    'When you want to have all options visible at all times and not hidden in a dropdown.',
  ];
  whenNots = ['Toggle between different content (then use tabs or segmented control instead)'];

  RadioFilter =
    `<div class="e-radio-filter">
  <input type="radio" id="radio-filter-1" name="radio-filter" checked />
  <label for="radio-filter-1" data-value="Filter 1">
    <span class="e-radio-filter__label">` +
    exampleContents.words.filters['eng-GBR'][0] +
    `</span>
  </label>

  <input type="radio" id="radio-filter-2" name="radio-filter" />
  <label for="radio-filter-2" data-value="Filter 2">
    <span class="e-radio-filter__label">` +
    exampleContents.words.filters['eng-GBR'][1] +
    `</span>
  </label>

  <input type="radio" id="radio-filter-3" name="radio-filter" />
  <label for="radio-filter-3" data-value="Filter 2">
    <span class="e-radio-filter__label">` +
    exampleContents.words.filters['eng-GBR'][2] +
    `</span>
  </label>
</div>
`;
}
