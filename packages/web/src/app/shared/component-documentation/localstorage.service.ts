import { EventEmitter, Injectable } from '@angular/core';

const LANGUAGE_STORAGE_KEY = 'preferredCegLanguage';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  storageChanged: EventEmitter<number> = new EventEmitter<number>();

  setItem(value: number): void {
    localStorage.setItem(LANGUAGE_STORAGE_KEY, JSON.stringify(value));
    this.storageChanged.emit(value);
  }

  getItem(): number {
    return localStorage.getItem(LANGUAGE_STORAGE_KEY)
      ? parseInt(localStorage.getItem(LANGUAGE_STORAGE_KEY)!)
      : 0;
  }
}
