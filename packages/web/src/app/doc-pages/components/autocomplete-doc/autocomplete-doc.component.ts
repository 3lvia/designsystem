import { Component } from '@angular/core';
import { getComponent } from 'src/app/shared/doc-pages';
import { Title } from '@angular/platform-browser';
import { autocompleteData } from './autocomplete-data';

@Component({
  selector: 'app-autocomplete-doc',
  templateUrl: './autocomplete-doc.component.html',
})
export class AutocompleteDocComponent {
  figmaUrl = getComponent('autocomplete')?.figmaUrl;
  description = getComponent('autocomplete')?.description;
  title = getComponent('autocomplete')?.title;

  constructor(private titleService: Title) {
    this.titleService.setTitle(this.title + ' | Elvia design system');
  }

  componentData = autocompleteData;

  does = [
    'When you have a list with optional options, and the input is not restricted to selecting from a predefined list.',
  ];
  donts = ['When the user must select one or more options from a predefined list.'];
}
