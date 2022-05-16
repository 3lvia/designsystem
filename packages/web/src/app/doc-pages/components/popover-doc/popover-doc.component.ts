import { Component } from '@angular/core';
import { getComponent } from 'src/app/shared/doc-pages';
import { popoverData } from './popover-data';
import { popoverInformativeCode } from './popover-informative-code';
import { popoverListCode } from './popover-list-code';
import { popoverListHeadingsCode } from './popover-list-headings';
import { popoverListIconsCode } from './popover-list-icons-code';
import { popoverListSelectableCode } from './popover-list-selectable-code';
@Component({
  selector: 'app-popover-doc',
  templateUrl: './popover-doc.component.html',
  styleUrls: ['./popover-doc.component.scss'],
})
export class PopoverDocComponent {
  componentData = popoverData;
  popoverListIconsCode = popoverListIconsCode;
  popoverListHeadingsCode = popoverListHeadingsCode;
  popoverListSelectableCode = popoverListSelectableCode;
  typesData = [popoverInformativeCode, popoverListCode];
  loadedPopoverStructure = false;
  figmaUrl = getComponent('popover').figmaUrl;
  description = getComponent('popover').description;
  // tslint:disable-next-line:max-line-length
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
