import { Component, ViewChild, ElementRef } from '@angular/core';
import { ComponentProp } from 'src/app/shared/component-prop.interface';
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
  popoverProperties: ComponentProp[] = [
    { name: 'title', type: 'string', description: 'Title of content', default: '-' },
    {
      name: 'content',
      type: 'string | HTMLElement',
      description: 'Text, images, tables or any other content (use slot in angular if not just text)',
    },
    {
      name: 'trigger',
      type: 'HTMLElement',
      description: 'The element the user clicks to open the popover',
    },
    {
      name: 'posX',
      type: '“left” | “right” | “center”',
      description: 'Position horizontally',
      default: '“center”',
    },
    { name: 'posY', type: '“bottom” | “top”', description: 'Position vertically', default: '“top”' },
    {
      name: 'hasCloseBtn',
      type: 'boolean',
      description: 'Determines if the close button in the upper right corner should be visible',
      default: 'true',
    },
  ];

  figmaUrl = getComponent('popover').figmaUrl;
  description = getComponent('popover').description;
  // tslint:disable-next-line:max-line-length
  does = [
    'When you want to give the user more information about something, and are typically paired with an information or question icon.',
  ];
  donts = [
    'Should not be used if the information in popover is necessary for the user to complete their task.',
  ];

  codeInstallation = `//REACT
import { Popover } from '@elvia/elvis-popover/react';

// WEBCOMPONENT
import { Popover } from '@elvia/elvis-popover';
`;
  codeReact = `<Popover
  title="Title"
  content="Test av popover component."
  posY="top"
  trigger={
    <button class="e-btn e-btn--icon e-btn--circled">
      <span class="e-btn__icon">
        <i class="e-icon e-icon--information_circle"></i>
        <i class="e-icon e-icon e-icon--information_circle-filled-color"></i>
      </span>
    </button>
  }
></Popover>
`;
  codeWebComponent = `<elvia-popover 
  title="Title" 
  content="Test av popover component." 
  posY="top"
>
  <button slot="trigger" class="e-btn e-btn--icon e-btn--circled">
    <span class="e-btn__icon">
      <i class="e-icon e-icon--information_circle"></i>
      <i class="e-icon e-icon e-icon--information_circle-filled-color"></i>
    </span>
  </button>
</elvia-popover>
`;
}
