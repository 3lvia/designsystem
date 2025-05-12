import { AsyncPipe, NgClass } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, Component, inject, output } from '@angular/core';
import { Observable } from 'rxjs';

import { PreferredTheme, ThemeService } from 'src/app/core/services/theme.service';

@Component({
  selector: 'app-theme-switch',
  templateUrl: './theme-switch.component.html',
  styleUrls: ['./theme-switch.component.scss'],
  imports: [NgClass, AsyncPipe],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ThemeSwitchComponent {
  private themeService = inject(ThemeService);

  readonly preferredThemeSwitched = output<void>();

  preferredTheme: Observable<PreferredTheme>;
  themes: PreferredTheme[] = ['system', 'light', 'dark'];

  constructor() {
    this.preferredTheme = this.themeService.listenPreferredTheme();
  }

  setPreferredTheme(preferredTheme: PreferredTheme): void {
    this.themeService.setPreferredTheme(preferredTheme);
    this.preferredThemeSwitched.emit();
  }
}
