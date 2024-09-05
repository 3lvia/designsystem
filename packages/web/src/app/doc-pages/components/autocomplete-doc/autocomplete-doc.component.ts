import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { CegComponent } from '../../../shared/component-documentation/ceg/ceg.component';
import { StaticCegComponent } from '../../../shared/component-documentation/ceg/static-ceg/static-ceg.component';
import { ComponentDocumentationComponent } from '../../../shared/component-documentation/component-documentation.component';
import { ComponentSectionComponent } from '../../../shared/component-documentation/component-structure/component-section/component-section.component';
import { ComponentSubsectionComponent } from '../../../shared/component-documentation/component-structure/component-subsection/component-subsection.component';
import { WhenToUseComponent } from '../../../shared/when-to-use/when-to-use.component';
import { AutocompleteCegComponent } from './autocomplete-ceg/autocomplete-ceg.component';
import { autocompleteData } from './autocomplete-data';
import { AutocompleteFilterCegComponent } from './autocomplete-filter-ceg/autocomplete-filter-ceg.component';
import { AutocompleteLabelCegComponent } from './autocomplete-label-ceg/autocomplete-label-ceg.component';
import { getComponent } from 'src/app/shared/doc-pages';

const docPage = getComponent('autocomplete');
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
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AutocompleteDocComponent {
  figmaUrl = docPage.figmaUrl;
  description = docPage.description;
  title = docPage.title;

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
