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
  isDarkTheme = false;
  colorList = this.isDarkTheme ? darkColors : lightColors;
  currentColor: ColorElement | undefined = this.colorList.primary[0];
  categories = ['primary', 'signal', 'data', 'grey'] as const;

  toggleTheme = () => {
    this.isDarkTheme = !this.isDarkTheme;
    this.colorList = this.isDarkTheme ? darkColors : lightColors;
    this.currentColor = getColorElement(
      this.currentColor?.name ?? this.colorList.primary[0].name,
      this.isDarkTheme ? 'dark' : 'light',
    );
  };

  chooseColor = (color: ColorElement) => {
    this.currentColor = color;
  };
}
