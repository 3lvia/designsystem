import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Checkbox } from '../../controlType';

let CEG_CHECKBOX_ID = 0;

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
})
export class CheckboxComponent implements OnInit {
  @Input() checkbox: Checkbox;
  @Input() isChild = false;
  @Input() disabled = false;
  @Output() toggle = new EventEmitter<Checkbox['value']>();
  checkboxId = '';

  ngOnInit(): void {
    this.checkboxId = `ceg-checkbox-${CEG_CHECKBOX_ID++}`;
  }

  onChange(isChecked: Checkbox['value']): void {
    this.toggle.emit(isChecked);
  }
}
