import { NgClass } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, Component, Input } from '@angular/core';

import { CodeViewerComponent } from '../../ceg/code-generator/code-viewer/code-viewer.component';

@Component({
    selector: 'app-property-example-popover',
    templateUrl: './property-example-popover.component.html',
    styleUrls: ['./property-example-popover.component.scss'],
    imports: [NgClass, CodeViewerComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PropertyExamplePopoverComponent {
  @Input({ required: true }) attribute: string;
  @Input({ required: true }) example: string;

  isOpen = false;
}
