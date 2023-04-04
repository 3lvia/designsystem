import { Component } from '@angular/core';
import { BoxProps } from '@elvia/elvis-box/react';
import { CegControlManager, ComponentExample } from 'src/app/shared/component-documentation/ceg';
import { exampleContents } from 'src/app/shared/example-contents';

@Component({
  selector: 'app-box-ceg',
  templateUrl: './box-ceg.component.html',
  styleUrls: ['./box-ceg.component.scss'],
  providers: [{ provide: ComponentExample, useExisting: BoxCegComponent }],
})
export class BoxCegComponent implements ComponentExample {
  elementName = 'box';
  cegContent = new CegControlManager<BoxProps>([
    {
      controls: {
        isColored: {
          group: 'Options',
          type: 'switch',
          label: 'Colored',
        },
        title: {
          group: 'Title',
          type: 'text',
          label: 'Title',
          value: this.exampleTitle,
        },
      },
      groupOrder: ['Options', 'Title'],
    },
  ]);

  get exampleText() {
    return exampleContents.texts.sm['eng-GBR'].description;
  }

  get exampleTitle() {
    return exampleContents.texts.sm['eng-GBR'].title;
  }

  get tabsItems() {
    return exampleContents.words.categories['eng-GBR'];
  }
}
