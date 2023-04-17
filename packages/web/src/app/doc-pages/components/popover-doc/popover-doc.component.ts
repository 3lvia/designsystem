import { Component } from '@angular/core';
import { getComponent } from 'src/app/shared/doc-pages';
import { popoverData } from './popover-data';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-popover-doc',
  templateUrl: './popover-doc.component.html',
  styleUrls: ['./popover-doc.component.scss'],
})
export class PopoverDocComponent {
  componentData = popoverData;
  loadedPopoverStructure = false;
  figmaUrl = getComponent('popover')?.figmaUrl;
  description = getComponent('popover')?.description;
  title = getComponent('popover')?.title;
  does = [
    'To provide additional information',
    'Secondary/tertiary information',
    'Help user complete small actions',
    'When space is limited',
  ];
  donts = ['Necessary information for the user to complete their task in a page'];

  constructor(private titleService: Title) {
    this.titleService.setTitle(this.title + ' | Elvia design system');
  }

  hideContentLoader(evt: Event): void {
    if (evt && evt.target) {
      this.loadedPopoverStructure = true;
    }
  }
}
