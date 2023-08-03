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
}
