import { NgClass } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';

@Component({
  selector: 'app-why-svg-popover',
  standalone: true,
  imports: [NgClass],
  templateUrl: './why-svg-popover.component.html',
  styleUrl: './why-svg-popover.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class WhySvgPopoverComponent {
  isOpen = false;
}
