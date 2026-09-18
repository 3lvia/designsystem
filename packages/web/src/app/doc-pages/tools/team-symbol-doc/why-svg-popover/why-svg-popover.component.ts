import { CUSTOM_ELEMENTS_SCHEMA, ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-why-svg-popover',
  templateUrl: './why-svg-popover.component.html',
  styleUrl: './why-svg-popover.component.scss',
  changeDetection: ChangeDetectionStrategy.Eager,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class WhySvgPopoverComponent {
  isOpen = false;
}
