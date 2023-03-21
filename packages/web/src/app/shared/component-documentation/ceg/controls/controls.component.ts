import { KeyValue } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { isGroup as isCegGroup } from '../helpers';
import { CegControl, CegControlGroup, Controls, ControlValue } from '../controlType';

@Component({
  selector: 'app-controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.scss'],
})
export class ControlsComponent {
  @Input() controls: BehaviorSubject<Controls>;
  @Output() propChange = new EventEmitter<{ key: string; value: ControlValue }>();
  isGroup = isCegGroup;

  updateValue(key: string, value: ControlValue): void {
    this.propChange.emit({ key: key, value: value });
  }

  // Reset the default sorting provided by the 'keyvalue' pipe.
  noSort = (
    a: KeyValue<string, CegControl | CegControlGroup>,
    b: KeyValue<string, CegControl | CegControlGroup>,
  ) => 0;
}
