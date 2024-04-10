import { CUSTOM_ELEMENTS_SCHEMA, Component, output } from '@angular/core';
import { ThemeName } from '@elvia/elvis-colors';

import { LocalThemeSwitchComponent } from 'src/app/shared/local-theme-switch/local-theme-switch.component';

@Component({
  selector: 'app-color-picker-header',
  templateUrl: './color-picker-header.component.html',
  styleUrls: ['./color-picker-header.component.scss'],
  standalone: true,
  imports: [LocalThemeSwitchComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ColorPickerHeaderComponent {
  changeThemeEvent = output<ThemeName>();
}
