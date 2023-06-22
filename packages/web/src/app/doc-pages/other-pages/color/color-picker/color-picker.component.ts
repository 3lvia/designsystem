import { Component } from '@angular/core';
import { lightColors } from './colors-light';
import { darkColors } from './colors-dark';
import { ColorElement } from './colors-types';
import { getColorElement } from './colors-util';
import { ColorListBaseDirective } from './color-list-base.directive';

@Component({
  selector: 'app-color-picker',
  templateUrl: './color-picker.component.html',
  styleUrls: ['./color-picker.component.scss'],
})
export class ColorPickerComponent extends ColorListBaseDirective {
  isDarkTheme = false;
  colorList = this.isDarkTheme ? darkColors : lightColors;
  currentColor = this.colorList.primary[0];
  toggleTheme = () => {
    this.isDarkTheme = !this.isDarkTheme;
    this.colorList = this.isDarkTheme ? darkColors : lightColors;
    this.currentColor = getColorElement(this.currentColor.name, this.isDarkTheme ? 'dark' : 'light') ?? null;
  };
  chooseColor = (color: ColorElement) => {
    this.currentColor = color;
  };
  getGradientColor = () => {
    console.log(
      `linear-gradient(to right, rgb(255 255 255 / 0), ${
        this.isDarkTheme ? getColorElement('black', 'dark') : getColorElement('white', 'light')
      }`,
    );
    return `linear-gradient(to right, rgb(255 255 255 / 0), ${
      this.isDarkTheme ? getColorElement('grey', 'dark').hex : getColorElement('white', 'light').hex
    }`;
  };
}
