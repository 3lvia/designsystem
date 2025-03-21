import { CUSTOM_ELEMENTS_SCHEMA, Component, OnDestroy, OnInit, input, output } from '@angular/core';
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
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class TypeSwitcherComponent implements OnInit, OnDestroy {
  private unsubscriber = new Subject<void>();
  readonly controlManager = input.required<UnknownCegControlManager>();
  readonly typeChange = output<string>();
  dropdownOptions: DropdownOption[] = [];
  selectedOption = '';

  ngOnInit() {
    this.controlManager()
      .componentTypes.pipe(takeUntil(this.unsubscriber))
      .subscribe((componentTypes) => {
        this.dropdownOptions = componentTypes.map(
          (option) => ({ label: option.type, value: option.type }) as DropdownOption,
        );
      });

    this.controlManager()
      .currentComponentTypeName.pipe(takeUntil(this.unsubscriber))
      .subscribe((componentType) => {
        this.selectedOption = componentType || '';
      });
  }

  ngOnDestroy(): void {
    this.unsubscriber.next();
    this.unsubscriber.complete();
  }

  onSelect(configurationName: string): void {
    this.typeChange.emit(configurationName);
  }
}
