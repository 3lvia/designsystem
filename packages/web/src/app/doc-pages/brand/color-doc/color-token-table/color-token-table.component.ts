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
  dataColors50,
  dataColors30,
  dataColors10,
  iconColors,
  assortedColors,
  illustrationColors,
  illustrationColorsShade,
  illustrationColorsBackground,
} from './colors';
import { ColorTokenSubtableComponent } from './color-token-subtable/color-token-subtable.component';
import { NgClass } from '@angular/common';

@Component({
    selector: 'app-color-token-table',
    templateUrl: './color-token-table.component.html',
    styleUrls: ['./color-token-table.component.scss'],
    standalone: true,
    imports: [NgClass, ColorTokenSubtableComponent],
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
  dataColors50 = dataColors50;
  dataColors30 = dataColors30;
  dataColors10 = dataColors10;
  assortedColors = assortedColors;
  iconColors = iconColors;
  illustrationColors = illustrationColors;
  illustrationColorsShade = illustrationColorsShade;
  illustrationColorsBackground = illustrationColorsBackground;
}
