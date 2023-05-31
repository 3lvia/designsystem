import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';
import { RouterService } from './router.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

export enum Locale {
  'en-GB' = 0,
  'nb-NO' = 1,
}

const LOCALIZATION_STORAGE_KEY = 'preferredDesignElviaIoLocale';
@Injectable({
  providedIn: 'root',
})
export class LocalizationService {
  readonly defaultLocale = Locale['en-GB'];
  private localizationSubject = new BehaviorSubject<Locale>(this.defaultLocale);

  constructor(private routerService: RouterService) {
    // Set localization to english on route change outside of brand
    this.routerService
      .urlPathChange()
      .pipe(takeUntilDestroyed())
      .subscribe((newPath) => {
        if (newPath.split('/')[1] !== 'brand') {
          this.setLocalization(Locale['en-GB']);
        } else {
          // On route change to brand, check if a preferred locale is set
          const preferredLocale = localStorage.getItem(LOCALIZATION_STORAGE_KEY);
          if (this.isKeyofLocale(preferredLocale)) {
            this.setLocalization(Locale[preferredLocale]);
          }
        }
      });
  }

  listenLocalization(): Observable<Locale> {
    return this.localizationSubject.asObservable().pipe(distinctUntilChanged());
  }

  setLocalization(locale: Locale): void {
    this.localizationSubject.next(locale);
  }

  setPreferredLocalization(locale: Locale): void {
    localStorage.setItem(LOCALIZATION_STORAGE_KEY, Locale[locale]);
  }

  private isKeyofLocale(key: unknown): key is keyof typeof Locale {
    return typeof key === 'string' && key in Locale;
  }
}
