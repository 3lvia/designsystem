import { Component } from '@angular/core';
import { lightColors } from './colors-light';
import { darkColors } from './colors-dark';
import { ColorElement } from './colors-types';
import { getColorElement } from './colors-util';

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
    this.currentColor = getColorElement(this.currentColor.name, this.isDarkTheme ? 'dark' : 'light') ?? null;
  };
  chooseColor = (color: ColorElement) => {
    this.currentColor = color;
  };
}
