import { Component, OnInit } from '@angular/core';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';
import * as template from 'raw-loader!./autocomplete-ceg.component.html';

import * as code from './public-api';
import * as codee from 'raw-loader!./public-api.ts';

@Component({
  selector: 'app-autocomplete-ceg',
  templateUrl: './autocomplete-ceg.component.html',
  providers: [{ provide: StaticComponentExample, useExisting: AutocompleteCegComponent }],
})
export class AutocompleteCegComponent implements StaticComponentExample, OnInit {
  html = template.default;
  chosenLand = code.chosenLand;
  showResults = code.showResults;
  results = code.results;

  ngOnInit(): void {
    console.log(codee.default);
  }

  onSearch(value: string): void {
    code.onSearch(value);
  }

  onInputClick(): void {
    code.onInputClick();
  }

  selectCountry(country: string): void {
    code.selectCountry(country);
  }
}
