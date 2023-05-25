import { Component } from '@angular/core';
import {
  backgroundColorsDefault,
  backgroundColorsElement,
  backgroundColorsOverlay,
  backgroundColorsStates,
  textColorsDefault,
  textColorsState,
} from './colors';

@Component({
  selector: 'app-color-token-table',
  templateUrl: './color-token-table.component.html',
  styleUrls: ['./color-token-table.component.scss'],
})
export class ColorTokenTableComponent {
  textColorsDefault = textColorsDefault;
  textColorsState = textColorsState;
  backgroundColorsDefault = backgroundColorsDefault;
  backgroundColorsElement = backgroundColorsElement;
  backgroundColorsOverlay = backgroundColorsOverlay;
  backgroundColorsState = backgroundColorsStates;
}
