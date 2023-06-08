import { Component } from '@angular/core';
import { lightColors } from './colors-light';
import { darkColors } from './colors-dark';

@Component({
  selector: 'app-color-picker',
  templateUrl: './color-picker.component.html',
  styleUrls: ['./color-picker.component.scss'],
})
export class ColorPickerComponent {
  isLightTheme = true;
  toggleTheme = () => {
    document.getElementsByClassName('theme-container')[0].classList.toggle('e-theme-dark');
    this.isLightTheme = !this.isLightTheme;
  };

  colorList = this.isLightTheme ? lightColors : darkColors;
}
