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
  @Output() toggle = new EventEmitter<boolean>();
  checkboxId = '';

  ngOnInit(): void {
    this.checkboxId = `ceg-checkbox-${CEG_CHECKBOX_ID++}`;
  }

  onChange(isChecked: boolean): void {
    this.toggle.emit(isChecked);
  }
}
