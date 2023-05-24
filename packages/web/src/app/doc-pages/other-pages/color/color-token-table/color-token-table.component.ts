import { Component } from '@angular/core';
import { textColorsDefault, textColorsState } from './colors';

@Component({
  selector: 'app-color-token-table',
  templateUrl: './color-token-table.component.html',
  styleUrls: ['./color-token-table.component.scss'],
})
export class ColorTokenTableComponent {
  defaultTextColors = textColorsDefault;
  stateTextColors = textColorsState;
}
