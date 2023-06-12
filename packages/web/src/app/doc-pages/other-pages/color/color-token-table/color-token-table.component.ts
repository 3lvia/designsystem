import { Component } from '@angular/core';
import {
  textColorsDefault,
  textColorsState,
  backgroundColorsDefault,
  backgroundColorsElement,
  backgroundColorsOverlay,
  backgroundColorsStates,
  borderColors,
  borderColorsStates,
  signalColors,
  dataColors,
  iconColors,
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
  borderColors = borderColors;
  borderColorsStates = borderColorsStates;
  signalColors = signalColors;
  dataColors = dataColors;
  iconColors = iconColors;
}
