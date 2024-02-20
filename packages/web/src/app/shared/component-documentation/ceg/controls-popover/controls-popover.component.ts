import { CUSTOM_ELEMENTS_SCHEMA, Component, EventEmitter, Input, Output } from '@angular/core';
import { UnknownCegControlManager } from '../cegControlManager';
import { ControlValue } from '../controlType';
import { NgClass } from '@angular/common';
import { ControlsComponent } from '../controls/controls.component';

@Component({
  selector: 'app-controls-popover',
  templateUrl: './controls-popover.component.html',
  standalone: true,
  imports: [ControlsComponent, NgClass],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ControlsPopoverComponent {
  @Input() controlManager: UnknownCegControlManager;
  @Output() propChange = new EventEmitter<{ propName: string; value: ControlValue }>();
  popoverIsOpen = false;

  onPropChange(propName: string, value: ControlValue): void {
    this.propChange.emit({ propName: propName, value: value });
  }
}
