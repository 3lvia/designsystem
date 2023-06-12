import { Component } from '@angular/core';
import { lightColors } from './colors-light';
import { darkColors } from './colors-dark';

@Component({
  selector: 'app-color-picker',
  templateUrl: './color-picker.component.html',
  styleUrls: ['./color-picker.component.scss'],
})
export class ColorPickerComponent {
  isDarkTheme = false;
  toggleTheme = () => {
    document.getElementsByClassName('theme-container')[0].classList.toggle('e-theme-dark');
    this.isDarkTheme = !this.isDarkTheme;
  };

  colorList = this.isDarkTheme ? darkColors : lightColors;
}
