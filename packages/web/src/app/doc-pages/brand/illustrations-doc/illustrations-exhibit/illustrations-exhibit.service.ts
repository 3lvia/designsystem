import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { IllustrationColor } from '../illustrations-data';

@Injectable({
  providedIn: 'root',
})
export class IllustrationsExhibitService {
  private _searchValue = new BehaviorSubject<string>('');
  private _colorValue = new BehaviorSubject<IllustrationColor>('grey');
  searchValue = this._searchValue.asObservable();
  colorValue = this._colorValue.asObservable();

  setSearchValue(value: string) {
    this._searchValue.next(value);
  }

  setColorValue(value: IllustrationColor) {
    this._colorValue.next(value);
  }
}
