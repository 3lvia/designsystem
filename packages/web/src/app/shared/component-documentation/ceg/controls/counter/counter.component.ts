import { NgClass, NgStyle } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, Component, input, output } from '@angular/core';

import { Counter } from '../../controlType';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.scss'],
  imports: [NgClass, NgStyle],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CounterComponent {
  readonly counter = input.required<Counter>();
  readonly disabled = input(false);
  readonly valueChange = output<Counter['value']>();

  updateValue(delta: Counter['value']): void {
    const newValue = this.counter().value + delta;
    const lowSafeGuard = Math.max(this.counter().min, newValue);
    const highSafeGuard = Math.min(lowSafeGuard, this.counter().max);

    this.valueChange.emit(highSafeGuard);
  }
}
