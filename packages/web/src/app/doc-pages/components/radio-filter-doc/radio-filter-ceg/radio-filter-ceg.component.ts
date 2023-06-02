import { Component } from '@angular/core';
import { CegControlManager, ComponentExample } from 'src/app/shared/component-documentation/ceg';
import { RadioFilterProps } from '@elvia/elvis-radio-filter/react';

@Component({
  selector: 'app-radio-filter-ceg',
  templateUrl: './radio-filter-ceg.component.html',
  providers: [{ provide: ComponentExample, useExisting: RadioFilterCegComponent }],
})
export class RadioFilterCegComponent implements ComponentExample {
  elementName = 'radio-filter';
  cegContent = new CegControlManager<RadioFilterProps>([
    {
      controls: {},
      groupOrder: [],
      staticProps: {
        items: [
          { label: 'All', value: 'all' },
          { label: 'Read', value: 'read' },
          { label: 'Unread', value: 'unread' },
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
