import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ControlConfiguration } from '../controlType';

interface DropdownOption {
  value: string;
  label: string;
}

@Component({
  selector: 'app-type-switcher',
  templateUrl: './type-switcher.component.html',
  styleUrls: ['./type-switcher.component.scss'],
})
export class TypeSwitcherComponent implements OnInit {
  @Input() controlOptions: ControlConfiguration[] = [];
  @Output() setControls = new EventEmitter<ControlConfiguration>();
  dropdownOptions: DropdownOption[] = [];
  selectedOption = '';

  ngOnInit() {
    this.dropdownOptions = this.controlOptions.map(
      (option) => ({ label: option.name, value: option.name } as DropdownOption),
    );
    this.selectedOption = this.dropdownOptions[0].value;
  }

  onSelect(presetName: string): void {
    const newControls = this.controlOptions.find((control) => control.name === presetName);
    this.setControls.emit(newControls);
  }
}
