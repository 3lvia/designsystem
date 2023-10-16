import { Component } from '@angular/core';
import { CegControlManager, ComponentExample } from 'src/app/shared/component-documentation/ceg';
import { BaseRadioFilterProps } from '@elvia/elvis-radio-filter/react';

@Component({
  selector: 'app-radio-filter-ceg',
  templateUrl: './radio-filter-ceg.component.html',
  providers: [{ provide: ComponentExample, useExisting: RadioFilterCegComponent }],
})
export class RadioFilterCegComponent implements ComponentExample {
  elementName = 'radio-filter';
  cegContent = new CegControlManager<BaseRadioFilterProps>([
    {
      controls: {},
      groupOrder: [],
      staticProps: {
        items: [
          { label: 'Alle', value: 'all' },
          { label: 'Lest', value: 'read' },
          { label: 'Ulest', value: 'unread' },
        ],
        value: 'read',
        name: 'radioFilterExample',
      },
    },
  ]);

  handleOnChange = (value: string) => {
    console.log('New radio filter value:', value);
  };
}
