import { Component } from '@angular/core';

@Component({
  selector: 'app-color-picker',
  templateUrl: './color-picker.component.html',
  styleUrls: ['./color-picker.component.scss'],
})
export class ColorPickerComponent {
  toggleTheme = () => {
    document.getElementsByClassName('theme-container')[0].classList.toggle('e-theme-dark');
  };
}
