import { Component, OnInit } from '@angular/core';
import { getComponent } from 'src/app/shared/e-items';

@Component({
  selector: 'app-autocomplete-doc',
  templateUrl: './autocomplete-doc.component.html',
  styleUrls: ['./autocomplete-doc.component.scss']
})
export class AutocompleteDocComponent implements OnInit {

  externalUrl = getComponent('autocomplete-doc').externalUrl;
  componentStatus = getComponent('autocomplete-doc').status;

  example1 = `<div class="e-autocomplete">
    <input placeholder="Placeholder text"/>
  </div>`;

  example2 = `<div class="e-autocomplete">
  <input placeholder="Placeholder text" value="Aus"/>

  <div class="e-autocomplete__content">
    <span class="e-autocomplete__content__item">Australia</span>
    <span class="e-autocomplete__content__item">Austria</span>
  </div>
</div>`;

example3 = `<div class="e-autocomplete e-mt-16">
<input placeholder="Normal state" value="Normal state"/>
</div>
<div class="e-autocomplete e-autocomplete---active e-mt-16">
<input placeholder="Active/Focus state" value="Active/Focus state"/>
</div>
<div class="e-autocomplete e-autocomplete---invalid e-mt-16">
<input placeholder="Invalid error state" value="Invalid error state"/>
</div>
`;

match = false;

searchQueary = [];

OnSearch(event) {
  if(event.key === "Backspace") {
    this.searchQueary.slice(-1);
  }

  this.searchQueary.push(event.key);
  console.log(event);
  console.log(this.searchQueary)
}
  constructor() { }

  ngOnInit() {
  }

}
