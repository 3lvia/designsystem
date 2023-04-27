import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { UnknownCegControlManager } from '../cegControlManager';

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
  private unsubscriber = new Subject();
  @Input() controlManager: UnknownCegControlManager;
  dropdownOptions: DropdownOption[] = [];
  selectedOption = '';

  ngOnInit() {
    this.controlManager.componentTypes.pipe(takeUntil(this.unsubscriber)).subscribe((componentTypes) => {
      this.dropdownOptions = componentTypes.map(
        (option) => ({ label: option.type, value: option.type } as DropdownOption),
      );
      this.selectedOption = this.dropdownOptions[0].value;
    });
  }

  ngOnDestroy(): void {
    this.unsubscriber.next();
    this.unsubscriber.complete();
  }

  onSelect(configurationName: string): void {
    this.controlManager.setActiveComponentTypeName(configurationName);
  }
}
