import { Component, ViewChild, ElementRef } from '@angular/core';
import { getComponent } from 'src/app/shared/e-items';
import * as componentData from './popover-data.js';
@Component({
  selector: 'app-popover-doc',
  templateUrl: './popover-doc.component.html',
  styleUrls: ['./popover-doc.component.scss'],
})
export class PopoverDocComponent {
  @ViewChild('popover1') popover1: ElementRef;
  componentData = componentData;
  codeInstallation = componentData.codeInstallation;
  codeReact = componentData.codeReact;
  codeWebComponent = componentData.codeWebComponent;

  figmaUrl = getComponent('popover').figmaUrl;
  description = getComponent('popover').description;
  // tslint:disable-next-line:max-line-length
  does = [
    'When you want to give the user more information about something, and are typically paired with an information or question icon.',
  ];
  donts = [
    'Should not be used if the information in popover is necessary for the user to complete their task.',
  ];
}
