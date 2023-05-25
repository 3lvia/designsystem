import { Component } from '@angular/core';
import {
  TableColorArray,
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

  /** Hack to fix type in ng-template context, don't do this in prod (zone re-renders) */
  asColorArray = (array: unknown): TableColorArray => {
    return array as any;
  };
}
