import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

export enum Locale {
  'en-GB' = 0,
  'nb-NO' = 1,
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
  setLocalization(locale: Locale): void {
    this.localizationSubject.next(locale);
  }
}
