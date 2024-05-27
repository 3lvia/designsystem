import { NgClass } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';

@Component({
  selector: 'app-svg-abbreviation-popover',
  standalone: true,
  imports: [NgClass],
  templateUrl: './svg-abbreviation-popover.component.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SvgAbbreviationPopoverComponent {
  isOpen = false;
}
