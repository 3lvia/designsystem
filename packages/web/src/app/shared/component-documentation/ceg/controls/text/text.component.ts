import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Text } from '../../controlType';

let CEG_INPUT_ID = 0;

@Component({
  selector: 'app-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.scss'],
})
export class TextComponent implements OnInit {
  @Input() input: Text;
  @Output() valueChange = new EventEmitter<string>();
  inputId = '';

  ngOnInit(): void {
    this.inputId = `ceg-input-${CEG_INPUT_ID++}`;
  }

  onChange(newValue: string): void {
    this.valueChange.emit(newValue);
  }
}
