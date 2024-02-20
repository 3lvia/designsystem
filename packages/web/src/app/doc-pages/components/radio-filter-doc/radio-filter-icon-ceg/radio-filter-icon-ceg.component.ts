import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';

import * as template from 'html-loader!./radio-filter-icon-ceg.component.html';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

import { RadioFilterProps } from '@elvia/elvis-radio-filter/react';

@Component({
  selector: 'app-radio-filter-icon-ceg',
  templateUrl: './radio-filter-icon-ceg.component.html',
  providers: [{ provide: StaticComponentExample, useExisting: RadioFilterIconCegComponent }],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class RadioFilterIconCegComponent implements StaticComponentExample {
  html = template.default;
  comment = `Define the items in Typescript:
  const radioFilterItems = [
    { label: 'Alle', value: 'all'},
    { label: 'Lest', value: 'read'},
    { label: 'Ulest', value: 'unread'},
    { label: '<i class="e-icon e-icon--bookmark-filled e-icon--xs"></i>Flagged', value: 'flagged' },
  ];`;

  radioFilterItems: RadioFilterProps['items'] = [
    { label: 'Alle', value: 'all' },
    { label: 'Lest', value: 'read' },
    { label: 'Ulest', value: 'unread' },
    { label: '<i class="e-icon e-icon--bookmark-filled e-icon--xs"></i>Flagget', value: 'flagged' },
  ];
}
