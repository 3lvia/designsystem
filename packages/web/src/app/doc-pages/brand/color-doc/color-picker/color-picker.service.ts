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
  private _currentColor = new BehaviorSubject<ColorElement | undefined>(getColorElement('white'));
  private _previousColor = new BehaviorSubject<ColorElement | undefined>(undefined);

  theme$ = this._theme.asObservable();
  currentColor$ = this._currentColor.asObservable();
  previousColor$ = this._previousColor.asObservable();

  setChosenColor(color: LightThemeColorName | DarkThemeColorName) {
    this._currentColor.next(getColorElement(color, this._theme.value));
  }

  setTheme(theme: ThemeName) {
    this._theme.next(theme);
    if (this._currentColor.value) {
      this._previousColor.next(this._currentColor.value);
      this._currentColor.next(getColorElement(this._currentColor.value?.name, theme));
      return;
    }
    this._currentColor.next(getColorElement(this._previousColor.value?.name, theme));
  }
}
