import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RadioGroup } from '../../controlType';

let CEG_RADIO_GROUP_ID = 0;

@Component({
  selector: 'app-radio-group',
  templateUrl: './radio-group.component.html',
  styleUrls: ['./radio-group.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RadioGroupComponent implements OnInit {
  @Input() radioGroup: RadioGroup;
  @Output() toggle = new EventEmitter<string | number>();
  radioGroupId = '';

  ngOnInit(): void {
    this.radioGroupId = `ceg-checkbox-${CEG_RADIO_GROUP_ID++}`;
  }

  onChange(newValue: string | number): void {
    this.toggle.emit(newValue);
  }
}
