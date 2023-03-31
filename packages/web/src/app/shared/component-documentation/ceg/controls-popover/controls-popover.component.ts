import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UnknownCegControlManager } from '../cegControlManager';
import { ControlValue } from '../controlType';

@Component({
  selector: 'app-controls-popover',
  templateUrl: './controls-popover.component.html',
})
export class ControlsPopoverComponent {
  @Input() controlManager: UnknownCegControlManager;
  @Output() propChange = new EventEmitter<{ propName: string; value: ControlValue }>();
  popoverIsOpen = false;

  onPropChange(propName: string, value: ControlValue): void {
    this.propChange.emit({ propName: propName, value: value });
  }
}
