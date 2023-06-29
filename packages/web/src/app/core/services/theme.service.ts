import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, distinctUntilChanged } from 'rxjs';

export type PreferredTheme = 'light' | 'dark' | 'system';
export type Theme = Exclude<PreferredTheme, 'system'>;

const THEME_STORAGE_KEY = 'preferredDesignElviaIoTheme';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private preferredThemeSubject = new BehaviorSubject<PreferredTheme>('system');
  private themeSubject = new BehaviorSubject<Theme>('light');

  constructor() {
    const preferredTheme = localStorage.getItem(THEME_STORAGE_KEY) || 'system';
    this.setPreferredTheme(preferredTheme as PreferredTheme);

    const prefersColorScheme = window.matchMedia('(prefers-color-scheme: dark)');
    prefersColorScheme.addEventListener('change', () => {
      if (this.preferredThemeSubject.value === 'system') {
        this.setTheme(this.getSystemTheme());
      }
    });
  }

  private getSystemTheme(): Theme {
    const prefersDarkTheme = window.matchMedia('(prefers-color-scheme: dark)');
    return prefersDarkTheme.matches ? 'dark' : 'light';
  }

  private setTheme(theme: Theme): void {
    this.themeSubject.next(theme);
  }

  listenTheme(): Observable<Theme> {
    return this.themeSubject.asObservable().pipe(distinctUntilChanged());
  }

  setPreferredTheme(theme: PreferredTheme): void {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
    this.preferredThemeSubject.next(theme);

    if (theme === 'system') {
      this.setTheme(this.getSystemTheme());
    } else {
      this.setTheme(theme);
    }
  }

  listenPreferredTheme(): Observable<PreferredTheme> {
    return this.preferredThemeSubject.asObservable().pipe(distinctUntilChanged());
  }
}
