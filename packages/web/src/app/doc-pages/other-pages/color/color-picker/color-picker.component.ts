import { Component } from '@angular/core';
import { lightColors } from './colors-light';
import { darkColors } from './colors-dark';
import { ColorElement } from './colors-types';

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
    document.getElementsByClassName('theme-container')[0].classList.toggle('e-theme-dark');
    this.isDarkTheme = !this.isDarkTheme;
    this.colorList = this.isDarkTheme ? darkColors : lightColors;
  };

  getColorsFromCategory = (category: 'primary' | 'signal' | 'data' | 'grey') => {
    return this.colorList?.[category];
  };

  needsBorder = (color: ColorElement) => {
    return (
      !this.isDarkTheme && (color.name === 'white' || color.name === 'grey-02' || color.name === 'grey-05')
    );
  };

  chooseColor = (color: ColorElement) => {
    this.currentColor = color;
  };
}
