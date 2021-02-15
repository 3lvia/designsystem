import { Component } from '@angular/core';
import { getComponent } from 'src/app/shared/e-items';
import * as componentData from './popover-data.js';
@Component({
  selector: 'app-popover-doc',
  templateUrl: './popover-doc.component.html',
  styleUrls: ['./popover-doc.component.scss'],
})
export class PopoverDocComponent {
  componentData = componentData;
  loadedPopoverStructure = false;
  figmaUrl = getComponent('popover').figmaUrl;
  description = getComponent('popover').description;
  // tslint:disable-next-line:max-line-length
  does = [
    'When you want to give the user more information about something, and are typically paired with an information or question icon.',
  ];
  donts = [
    'Should not be used if the information in popover is necessary for the user to complete their task.',
  ];

  hideContentLoader(evt: any): void {
    if (evt && evt.target) {
      this.loadedPopoverStructure = true;
    }
  }
}
