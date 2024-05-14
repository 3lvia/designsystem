import { Injectable } from '@angular/core';
import { DarkThemeColorName, LightThemeColorName, ThemeName } from '@elvia/elvis-colors';
import { BehaviorSubject } from 'rxjs';

import { ColorElement } from './colors-types';
import { getColorElement } from './colors-util';

@Injectable({
  providedIn: 'root',
})
export class ColorPickerService {
  private _theme = new BehaviorSubject<ThemeName>('light');
  private _chosenColor = new BehaviorSubject<ColorElement | undefined>(getColorElement('white'));

  previousColor: ColorElement | undefined;

  chosenColor$ = this._chosenColor.asObservable();
  theme$ = this._theme.asObservable();

  setChosenColor(color: LightThemeColorName | DarkThemeColorName) {
    this._chosenColor.next(getColorElement(color, this._theme.value));
  }

  setTheme(theme: ThemeName) {
    this._theme.next(theme);
    if (this._chosenColor.value) {
      this.previousColor = this._chosenColor.value;
      this._chosenColor.next(getColorElement(this._chosenColor.value?.name, theme));
      return;
    }
    this._chosenColor.next(getColorElement(this.previousColor?.name, theme));
  }
}
