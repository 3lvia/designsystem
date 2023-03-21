import { KeyValue } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ComponentExample } from '../componentExample';
import { CegControl, CegControlGroup, ControlValue } from '../controlType';

@Component({
  selector: 'app-controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.scss'],
})
export class ControlsComponent {
  @Input() cegContent: ComponentExample;
  @Output() propChange = new EventEmitter<{ key: string; value: ControlValue }>();

  isGroup(control: CegControlGroup | CegControl): control is CegControlGroup {
    return 'title' in control;
  }

  updateValue(key: string, value: ControlValue): void {
    this.propChange.emit({ key: key, value: value });
  }

  // Reset the default sorting provided by the 'keyvalue' pipe.
  noSort = (
    a: KeyValue<string, CegControl | CegControlGroup>,
    b: KeyValue<string, CegControl | CegControlGroup>,
  ) => 0;
}
