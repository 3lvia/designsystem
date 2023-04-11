import { Injectable, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { LOCALE_CODE } from 'contentful/types';
import { BehaviorSubject, Observable } from 'rxjs';

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

  constructor(private router: Router) {
    // Set localization to english on route change outside of brand
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const url = event.urlAfterRedirects;
        if (url.split('/')[1] !== 'brand') {
          this.setLocalization(Locale['en-GB']);
        } else {
          // On route change to brand, check if a preferred locale is set
          const preferredLocale = localStorage.getItem(LOCALIZATION_STORAGE_KEY);
          if (preferredLocale) {
            this.setLocalization(Locale[preferredLocale]);
          }
        }
      }
    });
  }

  listenLocalization(): Observable<Locale> {
    return this.localizationSubject.asObservable();
  }

  setLocalization(locale: Locale): void {
    this.localizationSubject.next(locale);
  }

  setPreferredLocalization(locale: Locale): void {
    localStorage.setItem(LOCALIZATION_STORAGE_KEY, Locale[locale]);
  }
}
