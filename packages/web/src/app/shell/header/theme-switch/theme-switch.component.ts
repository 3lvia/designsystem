import { Component, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { PreferredTheme, ThemeService } from 'src/app/core/services/theme.service';
import { NgFor, NgClass, AsyncPipe } from '@angular/common';

@Component({
    selector: 'app-theme-switch',
    templateUrl: './theme-switch.component.html',
    styleUrls: ['./theme-switch.component.scss'],
    standalone: true,
    imports: [
        NgFor,
        NgClass,
        AsyncPipe,
    ],
})
export class ThemeSwitchComponent {
  @Output() preferredThemeSwitched = new EventEmitter<void>();

  preferredTheme: Observable<PreferredTheme>;
  themes: PreferredTheme[] = ['system', 'light', 'dark'];

  constructor(private themeService: ThemeService) {
    this.preferredTheme = this.themeService.listenPreferredTheme();
  }

  setPreferredTheme(preferredTheme: PreferredTheme): void {
    this.themeService.setPreferredTheme(preferredTheme);
    this.preferredThemeSwitched.emit();
  }
}
