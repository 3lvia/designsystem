import { CUSTOM_ELEMENTS_SCHEMA, ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ThemeName } from '@elvia/elvis-colors';

import { ColorPickerService } from '../color-picker.service';
import { LocalThemeSwitchComponent } from 'src/app/shared/local-theme-switch/local-theme-switch.component';

@Component({
  selector: 'app-color-picker-header',
  templateUrl: './color-picker-header.component.html',
  styleUrls: ['./color-picker-header.component.scss'],
  imports: [LocalThemeSwitchComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ColorPickerHeaderComponent {
  private colorPickerService = inject(ColorPickerService);

  theme = this.colorPickerService.theme;

  changeTheme(theme: ThemeName) {
    this.colorPickerService.setTheme(theme);
  }
}
