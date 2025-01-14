import { NgClass } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, Component, input, signal } from '@angular/core';

import { CodeViewerComponent } from '../../ceg/code-generator/code-viewer/code-viewer.component';

@Component({
  selector: 'app-property-example-popover',
  templateUrl: './property-example-popover.component.html',
  styleUrls: ['./property-example-popover.component.scss'],
  imports: [NgClass, CodeViewerComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PropertyExamplePopoverComponent {
  readonly attribute = input.required<string>();
  readonly example = input.required<string>();

  isOpen = signal(false);
}
