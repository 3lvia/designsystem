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
    <input placeholder="Placeholder text"></input>
  </div>`;

  example2 = `<div class="e-autocomplete">
  <input placeholder="Placeholder text" value="Aus"></input>

  <div class="e-autocomplete__content">
    <span class="e-autocomplete__content__item">Australia</span>
    <span class="e-autocomplete__content__item">Austria</span>
  </div>
</div>`;

example3 = `<div class="e-autocomplete e-mt-16">
<input placeholder="Normal state" value="Normal state"></input>
</div>
<div class="e-autocomplete e-autocomplete---active e-mt-16">
<input placeholder="Active/Focus state" value="Active/Focus state"></input>
</div>
<div class="e-autocomplete e-autocomplete---invalid e-mt-16">
<input placeholder="Invalid error state" value="Invalid error state"></input>
</div>
`;

  constructor() { }

  ngOnInit() {
  }

}
