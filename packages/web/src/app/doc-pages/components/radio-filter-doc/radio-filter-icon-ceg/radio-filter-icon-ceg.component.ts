import { Component } from '@angular/core';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';
import { RadioFilterProps } from '@elvia/elvis-radio-filter/react';

import * as template from 'html-loader!./radio-filter-icon-ceg.component.html';

@Component({
  selector: 'app-radio-filter-icon-ceg',
  templateUrl: './radio-filter-icon-ceg.component.html',
  providers: [{ provide: StaticComponentExample, useExisting: RadioFilterIconCegComponent }],
})
export class RadioFilterIconCegComponent implements StaticComponentExample {
  html = template.default;

  radioFilterItems: RadioFilterProps['items'] = [
    { label: 'All', value: 'all' },
    { label: 'Read', value: 'read' },
    { label: 'Unread', value: 'unread' },
    { label: '<i class="e-icon e-icon--bookmark-filled e-icon--xs"></i>Flagged', value: 'flagged' },
  ];
}
