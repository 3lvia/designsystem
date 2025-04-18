import { Injectable } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ThemeName as Theme } from '@elvia/elvis-colors';
import { BehaviorSubject, Observable, distinctUntilChanged, map } from 'rxjs';

export { ThemeName as Theme } from '@elvia/elvis-colors';

export type PreferredTheme = Theme | 'system';

const THEME_STORAGE_KEY = 'elviaHeaderPreferredTheme';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private preferredThemeSubject = new BehaviorSubject<PreferredTheme>('light');

  private themeObservable = this.preferredThemeSubject.pipe(
    map((theme) => {
      if (theme === 'system') {
        return this.getSystemTheme();
      } else {
        return theme;
      }
    }),
  );

  themeSignal = toSignal(this.themeObservable, { initialValue: 'light' });

  constructor() {
    const preferredTheme = localStorage.getItem(THEME_STORAGE_KEY) ?? 'light';

    this.setPreferredTheme(preferredTheme as PreferredTheme, false);

    const prefersColorScheme = window.matchMedia('(prefers-color-scheme: dark)');
    prefersColorScheme.addEventListener('change', () => {
      if (this.preferredThemeSubject.value === 'system') {
        this.preferredThemeSubject.next('system');
      }
    });
  }

  private getSystemTheme(): Theme {
    const prefersDarkTheme = window.matchMedia('(prefers-color-scheme: dark)');
    return prefersDarkTheme.matches ? 'dark' : 'light';
  }

  listenTheme(): Observable<Theme> {
    return this.themeObservable.pipe(distinctUntilChanged());
  }

  setPreferredTheme(theme: PreferredTheme, persist = true): void {
    this.preferredThemeSubject.next(theme);

    if (persist) {
      localStorage.setItem(THEME_STORAGE_KEY, theme);
    }
  }

  listenPreferredTheme(): Observable<PreferredTheme> {
    return this.preferredThemeSubject.asObservable().pipe(distinctUntilChanged());
  }
}
