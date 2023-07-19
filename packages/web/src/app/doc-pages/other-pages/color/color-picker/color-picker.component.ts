import { Component } from '@angular/core';
import { lightColors } from './colors-light';
import { darkColors } from './colors-dark';
import { ColorElement } from './colors-types';
import { getColorElement } from './colors-util';
import { ThemeName } from '@elvia/elvis-colors';

@Component({
  selector: 'app-color-picker',
  templateUrl: './color-picker.component.html',
  styleUrls: ['./color-picker.component.scss'],
})
export class ColorPickerComponent {
  theme: ThemeName = 'light';
  colorList = this.theme === 'dark' ? darkColors : lightColors;
  currentColor: ColorElement | undefined = this.colorList.primary[0];
  previousColor: ColorElement | undefined;
  categories = ['primary', 'signal', 'data', 'grey'] as const;

  handleChangeThemeEvent = (newTheme: ThemeName) => {
    this.theme = newTheme;
    this.colorList = newTheme === 'dark' ? darkColors : lightColors;

    if (this.currentColor) {
      this.previousColor = this.currentColor;
    }

    this.currentColor = getColorElement(
      this.currentColor?.name ?? (this.previousColor as ColorElement).name,
      newTheme,
    );
  };

  chooseColor = (color: ColorElement) => {
    this.currentColor = color;
  };
}
