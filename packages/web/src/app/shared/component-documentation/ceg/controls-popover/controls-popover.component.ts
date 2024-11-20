import { NgClass } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, Component, EventEmitter, Input, Output } from '@angular/core';

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
  @Input() controlManager: UnknownCegControlManager;
  @Output() propChange = new EventEmitter<{ propName: string; value: ControlValue }>();
  @Output() slotToggle = new EventEmitter<{ slotName: string; isVisible: boolean }>();

  popoverIsOpen = false;

  onPropChange(propName: string, value: ControlValue): void {
    this.propChange.emit({ propName: propName, value: value });
  }

  onSlotToggle(slotName: string, isVisible: boolean): void {
    this.slotToggle.emit({ slotName: slotName, isVisible: isVisible });
  }
}
