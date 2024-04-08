import { CUSTOM_ELEMENTS_SCHEMA, Component, input, output } from '@angular/core';

import { Theme } from 'src/app/core/services/theme.service';

@Component({
  selector: 'app-local-theme-switch',
  standalone: true,
  imports: [],
  templateUrl: './local-theme-switch.component.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class LocalThemeSwitchComponent {
  themeChange = output<Theme>();
  theme = input<Theme>();

  protected handleThemeChange = (event: CustomEvent<{ value: number }>) => {
    const newTheme = event.detail.value;
    if (newTheme === 0) {
      this.themeChange.emit('light');
    }
    if (newTheme === 1) {
      this.themeChange.emit('dark');
    }
  };
}
