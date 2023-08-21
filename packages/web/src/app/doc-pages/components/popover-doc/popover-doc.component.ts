import { Component } from '@angular/core';
import { popoverData } from './popover-data';

@Component({
  selector: 'app-popover-doc',
  templateUrl: './popover-doc.component.html',
  styleUrls: ['./popover-doc.component.scss'],
})
export class PopoverDocComponent {
  componentData = popoverData;
  loadedPopoverStructure = false;
  does = [
    'To provide additional information',
    'Secondary/tertiary information',
    'Help user complete small actions',
    'When space is limited',
  ];
  donts = ['Necessary information for the user to complete their task in a page'];

  hideContentLoader(evt: Event): void {
    if (evt && evt.target) {
      this.loadedPopoverStructure = true;
    }
  }
}
