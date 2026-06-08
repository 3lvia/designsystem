import { CUSTOM_ELEMENTS_SCHEMA, ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-svg-abbreviation-popover',
  templateUrl: './svg-abbreviation-popover.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SvgAbbreviationPopoverComponent {
  isOpen = false;
}
