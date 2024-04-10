import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { StaticCegComponent } from '../../../../shared/component-documentation/ceg/static-ceg/static-ceg.component';
import { ComponentDocumentationComponent } from '../../../../shared/component-documentation/component-documentation.component';
import { ComponentSectionComponent } from '../../../../shared/component-documentation/component-structure/component-section/component-section.component';
import { ComponentSubsectionComponent } from '../../../../shared/component-documentation/component-structure/component-subsection/component-subsection.component';
import { ComponentSubsubsectionComponent } from '../../../../shared/component-documentation/component-structure/component-subsubsection/component-subsubsection.component';
import { WhenToUseComponent } from '../../../../shared/when-to-use/when-to-use.component';
import { CheckboxCegComponent } from './checkbox-ceg/checkbox-ceg.component';
import { CheckboxNestedCegComponent } from './checkbox-nested-ceg/checkbox-nested-ceg.component';
import { CheckboxSizeCegComponent } from './checkbox-size-ceg/checkbox-size-ceg.component';
import { CheckboxStandardCegComponent } from './checkbox-standard-ceg/checkbox-standard-ceg.component';
import { CheckboxStatesCegComponent } from './checkbox-states-ceg/checkbox-states-ceg.component';

@Component({
  selector: 'app-checkbox-doc',
  templateUrl: './checkbox-doc.component.html',
  styleUrls: ['./checkbox-doc.component.scss'],
  standalone: true,
  imports: [
    ComponentDocumentationComponent,
    StaticCegComponent,
    CheckboxCegComponent,
    ComponentSectionComponent,
    ComponentSubsectionComponent,
    CheckboxStandardCegComponent,
    CheckboxNestedCegComponent,
    ComponentSubsubsectionComponent,
    CheckboxSizeCegComponent,
    CheckboxStatesCegComponent,
    WhenToUseComponent,
    RouterLink,
  ],
})
export class CheckboxDocComponent {
  does = ['When user can select multiple options from a list.', 'Toggle a single option on or off.'];
  donts = ['If the user only can select one option from a list - use radio buttons.'];
}
