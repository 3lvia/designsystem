import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { LanguageType } from './types';

const LANGUAGE_STORAGE_KEY = 'preferredCegLanguage';

@Injectable({
  providedIn: 'root',
})
export class PreferredLanguageService {
  private preferredLanguageSource = new BehaviorSubject<LanguageType>(this.getPreferredLanguage());
  preferredLanguage$ = this.preferredLanguageSource.asObservable();

  setPreferredLanguage(value: LanguageType): void {
    localStorage.setItem(LANGUAGE_STORAGE_KEY, JSON.stringify(value));
    this.preferredLanguageSource.next(value);
  }

  getPreferredLanguage(): LanguageType {
    if (localStorage.getItem(LANGUAGE_STORAGE_KEY)) {
      return JSON.parse(localStorage.getItem(LANGUAGE_STORAGE_KEY)!) as LanguageType;
    }
    return 'angular';
  }
}
