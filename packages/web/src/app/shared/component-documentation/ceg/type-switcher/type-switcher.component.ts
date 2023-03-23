import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CegControlManager } from '../cegControlManager';

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
  @Input() controlManager: CegControlManager;
  unsubscriber = new Subject();
  dropdownOptions: DropdownOption[] = [];
  selectedOption = '';

  ngOnInit() {
    this.controlManager.configurations.pipe(takeUntil(this.unsubscriber)).subscribe((configurations) => {
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

  onSelect(configurationName: string): void {
    this.controlManager.setActiveComponentTypeName(configurationName);
  }
}
