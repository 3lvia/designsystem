import { CUSTOM_ELEMENTS_SCHEMA, ChangeDetectionStrategy, Component, model } from '@angular/core';

import { Theme } from 'src/app/core/services/theme.service';

@Component({
  selector: 'app-local-theme-switch',
  imports: [],
  templateUrl: './local-theme-switch.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class LocalThemeSwitchComponent {
  theme = model<Theme>('light');

  protected handleThemeChange = (event: CustomEvent<{ value: number }>) => {
    const newTheme = event.detail.value;
    if (newTheme === 0) {
      this.theme.set('light');
    }
    if (newTheme === 1) {
      this.theme.set('dark');
    }
  };
}
