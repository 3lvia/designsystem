import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


export enum Locale {
  'en-GB' = 0,
  'nb-NO' = 1
}

@Injectable({
  providedIn: 'root',
})

export class LocalizationService {
  private defaultLocale = Locale['en-GB'];
  private localizationSubject = new BehaviorSubject<Locale>(this.defaultLocale);

  listenLocalization(): BehaviorSubject<Locale> {
    return this.localizationSubject;
  }
  setLocalization(locale: Locale): void {
    this.localizationSubject.next(locale);
  }
}
