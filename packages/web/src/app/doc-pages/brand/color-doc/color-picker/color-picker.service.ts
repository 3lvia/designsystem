import { Injectable, signal } from '@angular/core';
import { DarkThemeColorName, LightThemeColorName, ThemeName } from '@elvia/elvis-colors';

import { ColorElement } from './colors-types';
import { getColorElement } from './colors-util';

@Injectable({
  providedIn: 'root',
})
export class ColorPickerService {
  private themeSignal = signal<ThemeName>('light');
  private currentColorSignal = signal<ColorElement | undefined>(getColorElement('white'));
  private previousColorSignal = signal<ColorElement | undefined>(undefined);

  theme = this.themeSignal.asReadonly();
  currentColor = this.currentColorSignal.asReadonly();
  previousColor = this.previousColorSignal.asReadonly();

  setCurrentColor(color: LightThemeColorName | DarkThemeColorName) {
    this.currentColorSignal.set(getColorElement(color, this.themeSignal()));
  }

  setTheme(theme: ThemeName) {
    this.themeSignal.set(theme);
    if (this.currentColorSignal()) {
      this.previousColorSignal.set(this.currentColorSignal());
      this.currentColorSignal.set(getColorElement(this.currentColorSignal()?.name, theme));
      return;
    }
    this.currentColorSignal.set(getColorElement(this.previousColorSignal()?.name, theme));
  }
}
