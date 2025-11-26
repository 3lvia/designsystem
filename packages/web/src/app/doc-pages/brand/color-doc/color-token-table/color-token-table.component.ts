import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';

import { ColorTokenSubtableComponent } from './color-token-subtable/color-token-subtable.component';
import {
  assortedColors,
  backgroundColorsDefault,
  backgroundColorsElement,
  backgroundColorsOverlay,
  backgroundColorsStates,
  borderColors,
  borderColorsStates,
  dataColors,
  dataColors10,
  dataColors30,
  dataColors50,
  iconColors,
  illustrationColors,
  illustrationColorsBackground,
  illustrationColorsShade,
  signalColors,
  textColorsDefault,
  textColorsState,
} from './colors';

@Component({
  selector: 'app-color-token-table',
  templateUrl: './color-token-table.component.html',
  styleUrls: ['./color-token-table.component.scss'],
  imports: [ColorTokenSubtableComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
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
