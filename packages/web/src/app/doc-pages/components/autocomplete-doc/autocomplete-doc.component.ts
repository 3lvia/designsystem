import { Component } from '@angular/core';
import { getComponent } from 'src/app/shared/doc-pages';
import { Title } from '@angular/platform-browser';
import { autocompleteData } from './autocomplete-data';
import { AutocompleteLabelCegComponent } from './autocomplete-label-ceg/autocomplete-label-ceg.component';
import { ComponentSubsectionComponent } from '../../../shared/component-documentation/component-structure/component-subsection/component-subsection.component';
import { AutocompleteFilterCegComponent } from './autocomplete-filter-ceg/autocomplete-filter-ceg.component';
import { StaticCegComponent } from '../../../shared/component-documentation/ceg/static-ceg/static-ceg.component';
import { WhenToUseComponent } from '../../../shared/when-to-use/when-to-use.component';
import { ComponentSectionComponent } from '../../../shared/component-documentation/component-structure/component-section/component-section.component';
import { AutocompleteCegComponent } from './autocomplete-ceg/autocomplete-ceg.component';
import { CegComponent } from '../../../shared/component-documentation/ceg/ceg.component';
import { ComponentDocumentationComponent } from '../../../shared/component-documentation/component-documentation.component';

@Component({
  selector: 'app-autocomplete-doc',
  templateUrl: './autocomplete-doc.component.html',
  standalone: true,
  imports: [
    ComponentDocumentationComponent,
    CegComponent,
    AutocompleteCegComponent,
    ComponentSectionComponent,
    WhenToUseComponent,
    StaticCegComponent,
    AutocompleteFilterCegComponent,
    ComponentSubsectionComponent,
    AutocompleteLabelCegComponent,
  ],
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
    'Users are familiar with the options.',
    'When you have a list with optional options, and the input is not restricted to selecting from a predefined list.',
  ];
  donts = [
    'The options are unfamiliar to users.',
    'When the user must select one or more options from a predefined list.',
  ];
}
