import { Component } from '@angular/core';
import { getComponent } from 'src/app/shared/doc-pages';
import { exampleContents } from 'src/app/shared/example-contents';
import { radioFilterData } from './radio-filter.data';

@Component({
  selector: 'app-radio-filter-doc',
  templateUrl: './radio-filter-doc.component.html',
  styleUrls: ['./radio-filter-doc.component.scss'],
})
export class RadioFilterDocComponent {
  componentData = radioFilterData;
  examples = exampleContents;
  figmaUrl = getComponent('radio-filter').figmaUrl;
  description = getComponent('radio-filter').description;

  // tslint:disable-next-line: max-line-length
  whens = [
    'Filter/toggle between different views of same content',
    'When you want to have all options visible at all times and not hidden in a dropdown.',
  ];
  whenNots = ['Toggle between different content (then use tabs or segmented control instead)'];
}
