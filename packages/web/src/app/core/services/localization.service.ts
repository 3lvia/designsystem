import { Injectable, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { BehaviorSubject, Observable } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';

import { RouterService } from './router.service';

export type Locale = 'en-GB' | 'nb-NO';

const LOCALIZATION_STORAGE_KEY = 'preferredDesignElviaIoLocale';
@Injectable({
  providedIn: 'root',
})
export class LocalizationService {
  private routerService = inject(RouterService);

  readonly defaultLocale: Locale = 'en-GB';
  private localizationSubject = new BehaviorSubject<Locale>(this.getInitialStreamValue());

  constructor() {
    // Set localization to english on route change outside of brand
    this.routerService
      .urlPathChange()
      .pipe(takeUntilDestroyed())
      .subscribe((newPath) => {
        if (newPath.split('/')[1] !== 'brand') {
          this.setLocalization('en-GB');
        } else {
          // On route change to brand, check if a preferred locale is set
          const preferredLocale = localStorage.getItem(LOCALIZATION_STORAGE_KEY);
          if (this.isLocale(preferredLocale)) {
            this.setLocalization(preferredLocale);
          }
        }
      });

    this.localizationSubject.subscribe((locale) => {
      document.documentElement.lang = locale;
    });
  }

  listenLocalization(): Observable<Locale> {
    return this.localizationSubject.asObservable().pipe(distinctUntilChanged());
  }

  getCurrentLocalization(): Locale {
    return this.localizationSubject.value;
  }

  setLocalization(locale: Locale): void {
    this.localizationSubject.next(locale);
  }

  setPreferredLocalization(locale: Locale): void {
    localStorage.setItem(LOCALIZATION_STORAGE_KEY, locale);
  }

  private getInitialStreamValue(): Locale {
    const preferredLocale = localStorage.getItem(LOCALIZATION_STORAGE_KEY);
    if (this.isLocale(preferredLocale)) {
      return preferredLocale;
    }

    return this.defaultLocale;
  }

  private isLocale(key: unknown): key is Locale {
    return typeof key === 'string' && ['en-GB', 'nb-NO'].includes(key);
  }
}
