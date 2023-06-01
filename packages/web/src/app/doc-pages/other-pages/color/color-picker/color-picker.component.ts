import { Component } from '@angular/core';
import { getThemeColor, getBaseColor, lightThemeColors, darkThemeColors } from '@elvia/elvis-colors';
import { primaryColors } from './color-util';

@Component({
  selector: 'app-color-picker',
  templateUrl: './color-picker.component.html',
  styleUrls: ['./color-picker.component.scss'],
})
export class ColorPickerComponent {
  toggleTheme = () => {
    document.getElementsByClassName('theme-container')[0].classList.toggle('e-theme-dark');
  };

  colorList = [
    getThemeColor('signal-success'),
    getBaseColor('grey-70'),
    lightThemeColors['data-colors']['violet-grape'].color,
    darkThemeColors['data-colors']['violet-grape'].color,
    primaryColors[1].contrastWhite,
  ];
}
