import { Component, Input } from '@angular/core';
import { Counter } from '../../controlType';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.scss'],
})
export class CounterComponent {
  @Input() counter: Counter;
}
