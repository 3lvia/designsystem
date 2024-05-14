import { CUSTOM_ELEMENTS_SCHEMA, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ThemeName } from '@elvia/elvis-colors';

import { ColorPickerService } from '../color-picker.service';
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
  private colorPickerService = inject(ColorPickerService);
  theme = toSignal(this.colorPickerService.theme$, {
    initialValue: 'light',
  });

  changeTheme(theme: ThemeName) {
    this.colorPickerService.setTheme(theme);
  }
}
