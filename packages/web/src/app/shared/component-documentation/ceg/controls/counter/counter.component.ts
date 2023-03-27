import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Counter } from '../../controlType';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.scss'],
})
export class CounterComponent {
  @Input() counter: Counter;
  @Output() valueChange = new EventEmitter<Counter['value']>();

  updateValue(delta: Counter['value']): void {
    const newValue = this.counter.value + delta;
    const lowSafeGuard = Math.max(this.counter.min, newValue);
    const highSafeGuard = Math.min(lowSafeGuard, this.counter.max);

    this.valueChange.emit(highSafeGuard);
  }
}
