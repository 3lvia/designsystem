import { Component } from '@angular/core';

import { CegComponent } from '../../../shared/component-documentation/ceg/ceg.component';
import { ComponentDocumentationComponent } from '../../../shared/component-documentation/component-documentation.component';
import { ComponentSectionComponent } from '../../../shared/component-documentation/component-structure/component-section/component-section.component';
import { ComponentSubsectionComponent } from '../../../shared/component-documentation/component-structure/component-subsection/component-subsection.component';
import { ComponentSubsubsectionComponent } from '../../../shared/component-documentation/component-structure/component-subsubsection/component-subsubsection.component';
import { WhenToUseComponent } from '../../../shared/when-to-use/when-to-use.component';
import { PopoverCegComponent } from './popover-ceg/popover-ceg.component';
import { popoverData } from './popover-data';

@Component({
  selector: 'app-popover-doc',
  templateUrl: './popover-doc.component.html',
  styleUrls: ['./popover-doc.component.scss'],
  imports: [
    ComponentDocumentationComponent,
    CegComponent,
    PopoverCegComponent,
    ComponentSectionComponent,
    ComponentSubsubsectionComponent,
    WhenToUseComponent,
    ComponentSubsectionComponent,
  ],
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
