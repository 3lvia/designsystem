import { Component } from '@angular/core';
import { getThemeColor, getBaseColor, lightThemeColors, darkThemeColors } from '@elvia/elvis-colors';
import { lightColors } from './colors-light';

@Component({
  selector: 'app-color-picker',
  templateUrl: './color-picker.component.html',
  styleUrls: ['./color-picker.component.scss'],
})
export class ColorPickerComponent {
  toggleTheme = () => {
    document.getElementsByClassName('theme-container')[0].classList.toggle('e-theme-dark');
    const colorList = lightColors;
    console.log(colorList);
  };
}
