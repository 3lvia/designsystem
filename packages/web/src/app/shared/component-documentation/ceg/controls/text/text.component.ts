import { NgClass } from '@angular/common';
import { Component, EventEmitter, Input, Output, input } from '@angular/core';

import { Text } from '../../controlType';

let CEG_INPUT_ID = 0;

@Component({
  selector: 'app-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.scss'],
  imports: [NgClass],
})
export class TextComponent {
  // TODO: Skipped for migration because:
  //  This input is used in a control flow expression (e.g. `@if` or `*ngIf`)
  //  and migrating would break narrowing currently.
  @Input() input: Text;
  readonly disabled = input(false);
  @Output() valueChange = new EventEmitter<Text['value']>();
  readonly inputId = `ceg-input-${CEG_INPUT_ID++}`;

  get textValue(): string | null {
    return this.input.value ?? null;
  }

  onChange(newValue: Text['value']): void {
    this.valueChange.emit(newValue);
  }
}
