import { Component, Input } from '@angular/core';
import { ColorElement } from '../colors-types';
import { getColorElement } from '../colors-util';
import { DarkThemeColorName, LightThemeColorName, ThemeName } from '@elvia/elvis-colors';

@Component({
  selector: 'app-color-picker-exhibit',
  templateUrl: './color-picker-exhibit.component.html',
  styleUrls: ['./color-picker-exhibit.component.scss'],
})
export class ColorPickerExhibitComponent {
  @Input({ required: true })
  get currentColor(): ColorElement {
    return this._currentColor;
  }
  set currentColor(value: ColorElement | undefined) {
    if (value) {
      this._currentColor = value;
    } else {
      this._currentColor = {
        //empty
        contrast: { black: '', white: '' },
        hex: '',
        name: '' as any,
        rgb: [-1, -1, -1],
        tokens: [],
      };
    }
  }
  private _currentColor: ColorElement;

  @Input({ required: true }) theme: ThemeName;

  private colorExistsInTheme = (
    color: DarkThemeColorName | LightThemeColorName,
    theme: ThemeName,
  ): boolean => {
    try {
      getColorElement(color, theme);
      return true;
    } catch {
      return false;
    }
  };

  get currentColorExistsInCurrentTheme(): boolean {
    return !!(this.currentColor?.name && this.colorExistsInTheme(this.currentColor.name, this.theme));
  }
}
