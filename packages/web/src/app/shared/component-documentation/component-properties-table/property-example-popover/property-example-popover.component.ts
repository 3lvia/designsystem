import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-property-example-popover',
  templateUrl: './property-example-popover.component.html',
  styleUrls: ['./property-example-popover.component.scss'],
})
export class PropertyExamplePopoverComponent {
  @Input({ required: true }) attribute: string;
  @Input({ required: true }) example: string;

  isOpen = false;
}
