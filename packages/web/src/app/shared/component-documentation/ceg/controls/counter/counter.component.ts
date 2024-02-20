import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Counter } from '../../controlType';
import { NgClass, NgStyle } from '@angular/common';

@Component({
    selector: 'app-counter',
    templateUrl: './counter.component.html',
    styleUrls: ['./counter.component.scss'],
    standalone: true,
    imports: [NgClass, NgStyle],
})
export class CounterComponent {
  @Input() counter: Counter;
  @Input() disabled: boolean;
  @Output() valueChange = new EventEmitter<Counter['value']>();

  updateValue(delta: Counter['value']): void {
    const newValue = this.counter.value + delta;
    const lowSafeGuard = Math.max(this.counter.min, newValue);
    const highSafeGuard = Math.min(lowSafeGuard, this.counter.max);

    this.valueChange.emit(highSafeGuard);
  }
}
