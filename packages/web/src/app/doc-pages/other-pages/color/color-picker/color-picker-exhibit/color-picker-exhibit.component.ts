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
  @Input({ required: true }) currentColor: ColorElement;
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
    return this.colorExistsInTheme(this.currentColor.name, this.theme);
  }
}
