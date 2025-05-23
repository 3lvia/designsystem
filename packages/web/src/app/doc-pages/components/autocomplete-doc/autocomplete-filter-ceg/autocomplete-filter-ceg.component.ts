import { HttpClient } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, Component, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AutocompleteItem } from '@elvia/elvis-autocomplete/react';
import { Observable, Subject, debounceTime, from, switchMap } from 'rxjs';

import * as template from './autocomplete-filter-ceg.component.html';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

interface Drink {
  strDrink: string;
}

const DEMO_API_URL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';

@Component({
  selector: 'app-autocomplete-filter-ceg',
  templateUrl: './autocomplete-filter-ceg.component.html',
  providers: [{ provide: StaticComponentExample, useExisting: AutocompleteFilterCegComponent }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AutocompleteFilterCegComponent implements StaticComponentExample {
  private http = inject(HttpClient);

  html = template.default;
  autocompleteItems: AutocompleteItem[] = [];

  private valueChangesSubject = new Subject<string>();

  constructor() {
    this.valueChangesSubject
      .pipe(
        takeUntilDestroyed(),
        debounceTime(150),
        switchMap((value) => this.fetchData(value)),
      )
      .subscribe({
        next: (data) => {
          this.autocompleteItems = data?.drinks
            ? data.drinks
                .map((drink) => ({
                  value: drink.strDrink,
                  label: drink.strDrink,
                }))
                .slice(0, 9)
            : [];
        },
        error: (error) => {
          console.error('Error in autocomplete demo:', error);
        },
      });
  }

  private fetchData(value: string): Observable<{ drinks: Drink[] }> {
    if (!value) {
      return from(Promise.resolve({ drinks: [] }));
    }

    return this.http.get<{ drinks: Drink[] }>(DEMO_API_URL + value);
  }

  handleValueOnChange(value: string): void {
    this.valueChangesSubject.next(value);
    console.log('Autocomplete value:', value);
  }

  handleOnSelectItem(value: string): void {
    console.log('Autocomplete selected drink:', value);
  }
}
