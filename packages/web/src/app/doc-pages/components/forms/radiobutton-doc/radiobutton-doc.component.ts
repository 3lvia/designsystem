import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { StaticCegComponent } from '../../../../shared/component-documentation/ceg/static-ceg/static-ceg.component';
import { ComponentDocumentationComponent } from '../../../../shared/component-documentation/component-documentation.component';
import { ComponentSectionComponent } from '../../../../shared/component-documentation/component-structure/component-section/component-section.component';
import { ComponentSubsectionComponent } from '../../../../shared/component-documentation/component-structure/component-subsection/component-subsection.component';
import { WhenToUseComponent } from '../../../../shared/when-to-use/when-to-use.component';
import { RadiobuttonCegComponent } from './radiobutton-ceg/radiobutton-ceg.component';
import { RadiobuttonMdCegComponent } from './radiobutton-md-ceg/radiobutton-md-ceg.component';
import { RadiobuttonSmCegComponent } from './radiobutton-sm-ceg/radiobutton-sm-ceg.component';
import { RadiobuttonStatesCegComponent } from './radiobutton-states-ceg/radiobutton-states-ceg.component';

@Component({
  selector: 'app-radiobutton-doc',
  templateUrl: './radiobutton-doc.component.html',
  styleUrls: ['./radiobutton-doc.component.scss'],
  imports: [
    ComponentDocumentationComponent,
    StaticCegComponent,
    RadiobuttonCegComponent,
    ComponentSectionComponent,
    ComponentSubsectionComponent,
    RadiobuttonMdCegComponent,
    RadiobuttonSmCegComponent,
    RadiobuttonStatesCegComponent,
    WhenToUseComponent,
    RouterLink,
  ],
})
export class RadiobuttonDocComponent {
  does = [
    'When you only can select one option.',
    'Want to visually expose all options instead of hiding them in a dropdown.',
  ];
  donts = [
    'If it is possible to select more than one option - use checkbox.',
    'If you have more than five options in total - use dropdown.',
  ];
}
