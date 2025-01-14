import { NgClass } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, Component, input, output } from '@angular/core';

import { UnknownCegControlManager } from '../cegControlManager';
import { ControlValue } from '../controlType';
import { ControlsComponent } from '../controls/controls.component';

@Component({
  selector: 'app-controls-popover',
  templateUrl: './controls-popover.component.html',
  imports: [ControlsComponent, NgClass],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ControlsPopoverComponent {
  readonly controlManager = input.required<UnknownCegControlManager>();
  readonly propChange = output<{
    propName: string;
    value: ControlValue;
}>();
  readonly slotToggle = output<{
    slotName: string;
    isVisible: boolean;
}>();

  popoverIsOpen = false;

  onPropChange(propName: string, value: ControlValue): void {
    this.propChange.emit({ propName: propName, value: value });
  }

  onSlotToggle(slotName: string, isVisible: boolean): void {
    this.slotToggle.emit({ slotName: slotName, isVisible: isVisible });
  }
}
