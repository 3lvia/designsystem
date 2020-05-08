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

  example1 = `testing`;

  example2 = `testing 2`;

  constructor() { }

  ngOnInit() {
  }

}
