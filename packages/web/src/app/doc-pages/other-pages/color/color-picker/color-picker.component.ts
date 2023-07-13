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
  currentColor = this.colorList.primary[0];
  toggleTheme = () => {
    this.isDarkTheme = !this.isDarkTheme;
    this.colorList = this.isDarkTheme ? darkColors : lightColors;
    this.currentColor = getColorElement(this.currentColor.name, this.isDarkTheme ? 'dark' : 'light') ?? null;
  };

  handleChangeThemeEvent = (theme: ThemeName) => {
    this.isDarkTheme = theme === 'dark';
    this.colorList = theme === 'dark' ? darkColors : lightColors;
    this.currentColor = getColorElement(this.currentColor.name, theme) ?? null;
  };

  chooseColor = (color: ColorElement) => {
    this.currentColor = color;
  };
}
