import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';

import { LanguageType } from './types';

const LANGUAGE_STORAGE_KEY = 'preferredCegLanguage';

@Injectable({
  providedIn: 'root',
})
export class PreferredLanguageService {
  private preferredLanguageSource = new BehaviorSubject<LanguageType>(this.getPreferredLanguage());

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

  listenLanguage(acceptedLanguages: LanguageType[]) {
    return this.preferredLanguageSource.pipe(
      map((preferredLanguage) => {
        if (acceptedLanguages.includes(preferredLanguage)) {
          return preferredLanguage;
        }
        if (acceptedLanguages.length <= 0) {
          throw new Error('No accepted languages provided');
        }
        return acceptedLanguages[0];
      }),
    );
  }
}
