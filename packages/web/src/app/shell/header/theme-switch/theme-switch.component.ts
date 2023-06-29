import { Component, Output, EventEmitter } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { PreferredTheme, Theme, ThemeService } from 'src/app/core/services/theme.service';

@Component({
  selector: 'app-theme-switch',
  templateUrl: './theme-switch.component.html',
  styleUrls: ['./theme-switch.component.scss'],
})
export class ThemeSwitchComponent {
  @Output() preferredThemeSwitched = new EventEmitter<void>();

  preferredTheme: PreferredTheme;
  theme: Theme;
  themes: PreferredTheme[] = ['system', 'light', 'dark'];

  constructor(private themeService: ThemeService) {
    this.themeService
      .listenPreferredTheme()
      .pipe(takeUntilDestroyed())
      .subscribe((preferredTheme) => {
        this.preferredTheme = preferredTheme;
      });

    this.themeService
      .listenTheme()
      .pipe(takeUntilDestroyed())
      .subscribe((theme) => {
        this.theme = theme;
      });
  }

  setPreferredTheme(theme: PreferredTheme): void {
    this.themeService.setPreferredTheme(theme);
    this.emitThemeSwitch();
  }

  private emitThemeSwitch(): void {
    this.preferredThemeSwitched.emit();
  }
}
