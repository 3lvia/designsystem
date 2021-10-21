import { Component } from '@angular/core';
import { getComponent } from 'src/app/shared/doc-pages';
import { popoverData } from './popover-data';
@Component({
  selector: 'app-popover-doc',
  templateUrl: './popover-doc.component.html',
  styleUrls: ['./popover-doc.component.scss'],
})
export class PopoverDocComponent {
  componentData = popoverData;
  loadedPopoverStructure = false;
  figmaUrl = getComponent('popover').figmaUrl;
  description = getComponent('popover').description;
  // tslint:disable-next-line:max-line-length
  does = ['To provide additional information', 'Help user complete small actions'];
  donts = ['Do not have multiple popover open at the same time'];

  hideContentLoader(evt: Event): void {
    if (evt && evt.target) {
      this.loadedPopoverStructure = true;
    }
  }
}
