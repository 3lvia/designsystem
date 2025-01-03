import { NgClass } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Text } from '../../controlType';

let CEG_INPUT_ID = 0;

@Component({
  selector: 'app-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.scss'],
  imports: [NgClass],
})
export class TextComponent {
  @Input() input: Text;
  @Input() disabled: boolean;
  @Output() valueChange = new EventEmitter<Text['value']>();
  readonly inputId = `ceg-input-${CEG_INPUT_ID++}`;

  get textValue(): string | null {
    return this.input.value ?? null;
  }

  onChange(newValue: Text['value']): void {
    this.valueChange.emit(newValue);
  }
}
