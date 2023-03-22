import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
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
export class TypeSwitcherComponent implements OnInit, OnDestroy {
  @Input() configurations: BehaviorSubject<ControlConfiguration[]>;
  @Output() setControls = new EventEmitter<ControlConfiguration>();
  unsubscriber = new Subject();
  dropdownOptions: DropdownOption[] = [];
  selectedOption = '';

  ngOnInit() {
    this.configurations.pipe(takeUntil(this.unsubscriber)).subscribe((configurations) => {
      this.dropdownOptions = configurations.map(
        (option) => ({ label: option.name, value: option.name } as DropdownOption),
      );
      this.selectedOption = this.dropdownOptions[0].value;
    });
  }

  ngOnDestroy(): void {
    this.unsubscriber.next();
    this.unsubscriber.complete();
  }

  onSelect(presetName: string): void {
    const newControls = this.configurations.value.find((control) => control.name === presetName);
    this.setControls.emit(newControls);
  }
}
