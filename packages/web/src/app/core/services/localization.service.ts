import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { LOCALE_CODE } from 'contentful/types';
import { BehaviorSubject } from 'rxjs';

export enum Locale {
  'en-GB' = 'en-GB',
  'nb-NO' = 'nb-NO',
}

@Injectable({
  providedIn: 'root',
})
export class LocalizationService {
  private defaultLocale = Locale['en-GB'];
  private localizationSubject = new BehaviorSubject<Locale>(this.defaultLocale);

  constructor(private router: Router) {
    // Set localization to english on route change outside of brand
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const url = event.urlAfterRedirects;
        if (url.split('/')[1] !== 'brand') {
          this.setLocalization(Locale['en-GB']);
        }
      }
    });
  }

  listenLocalization(): BehaviorSubject<Locale> {
    return this.localizationSubject;
  }

  setLocalization(locale: Locale | LOCALE_CODE): void {
    if (typeof locale === 'string') {
      this.localizationSubject.next(Locale[locale]);
    } else {
      this.localizationSubject.next(locale);
    }
  }
}
