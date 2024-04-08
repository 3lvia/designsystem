import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { IllustrationColor } from '../illustrations-data';
import { IllustrationName } from './illustrations-exhibit-data';
import { Theme } from 'src/app/core/services/theme.service';

@Injectable({
  providedIn: 'root',
})
export class IllustrationsExhibitService {
  private _searchValue = new BehaviorSubject<string>('');
  private _colorValue = new BehaviorSubject<IllustrationColor>('grey');
  private _selectedIllustration = new BehaviorSubject<IllustrationName | null>(null);
  private _theme = new BehaviorSubject<Theme>('light');
  searchValue = this._searchValue.asObservable();
  colorValue = this._colorValue.asObservable();
  selectedIllustration = this._selectedIllustration.asObservable();
  theme = this._theme.asObservable();

  setSearchValue(value: string) {
    this._searchValue.next(value);
  }

  setColorValue(value: IllustrationColor) {
    this._colorValue.next(value);
  }

  setSelectedIllustration(value: IllustrationName | null) {
    this._selectedIllustration.next(value);
  }

  setTheme(value: Theme) {
    this._theme.next(value);
  }
}
