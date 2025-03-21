import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';
import { RadioFilterProps } from '@elvia/elvis-radio-filter/react';

import * as template from './radio-filter-icon-ceg.component.html';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

@Component({
  selector: 'app-radio-filter-icon-ceg',
  templateUrl: './radio-filter-icon-ceg.component.html',
  providers: [{ provide: StaticComponentExample, useExisting: RadioFilterIconCegComponent }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class RadioFilterIconCegComponent implements StaticComponentExample {
  html = template.default;
  comment = `Define the items in Typescript:
  const radioFilterItems = [
    { label: 'Alle', value: 'all'},
    { label: 'Lest', value: 'read'},
    { label: 'Ulest', value: 'unread'},
    { label: '<e-icon name="bookmarkFilled" size="xs"></e-icon>Flagged', value: 'flagged' },
  ];`;

  radioFilterItems: RadioFilterProps['items'] = [
    { label: 'Alle', value: 'all' },
    { label: 'Lest', value: 'read' },
    { label: 'Ulest', value: 'unread' },
    { label: '<e-icon name="bookmarkFilled" size="xs"></e-icon>Flagget', value: 'flagged' },
  ];
}
