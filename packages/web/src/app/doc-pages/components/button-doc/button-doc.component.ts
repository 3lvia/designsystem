import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { StaticCegComponent } from '../../../shared/component-documentation/ceg/static-ceg/static-ceg.component';
import { ComponentDocumentationComponent } from '../../../shared/component-documentation/component-documentation.component';
import { ComponentSectionComponent } from '../../../shared/component-documentation/component-structure/component-section/component-section.component';
import { ComponentSubsectionComponent } from '../../../shared/component-documentation/component-structure/component-subsection/component-subsection.component';
import { ComponentSubsubsectionComponent } from '../../../shared/component-documentation/component-structure/component-subsubsection/component-subsubsection.component';
import { DoDontTextComponent } from '../../../shared/do-dont-text/do-dont-text.component';
import { WhenToUseComponent } from '../../../shared/when-to-use/when-to-use.component';
import { ButtonCegComponent } from './button-ceg/button-ceg.component';
import { ButtonLinkCegComponent } from './button-link-ceg/button-link-ceg.component';
import { ButtonSizeCegComponent } from './button-size-ceg/button-size-ceg.component';
import { ButtonTypeDangerCegComponent } from './button-type-danger-ceg/button-type-danger-ceg.component';
import { ButtonTypeIconCegComponent } from './button-type-icon-ceg/button-type-icon-ceg.component';
import { ButtonTypeIconCircledCegComponent } from './button-type-icon-circled-ceg/button-type-icon-circled-ceg.component';
import { ButtonTypePrimaryCegComponent } from './button-type-primary-ceg/button-type-primary-ceg.component';
import { ButtonTypeSecondaryCegComponent } from './button-type-secondary-ceg/button-type-secondary-ceg.component';
import { ButtonTypeTertiaryCegComponent } from './button-type-tertiary-ceg/button-type-tertiary-ceg.component';

@Component({
  selector: 'app-button-doc',
  templateUrl: './button-doc.component.html',
  standalone: true,
  imports: [
    ComponentDocumentationComponent,
    StaticCegComponent,
    ButtonCegComponent,
    ComponentSectionComponent,
    ComponentSubsectionComponent,
    ButtonTypePrimaryCegComponent,
    ButtonTypeSecondaryCegComponent,
    ButtonTypeTertiaryCegComponent,
    ButtonTypeDangerCegComponent,
    ButtonTypeIconCegComponent,
    ComponentSubsubsectionComponent,
    ButtonTypeIconCircledCegComponent,
    WhenToUseComponent,
    ButtonSizeCegComponent,
    DoDontTextComponent,
    ButtonLinkCegComponent,
    RouterLink,
  ],
})
export class ButtonDocComponent {
  doesExample1 = [
    'Primary buttons are task oriented buttons, that normally is used for task like save, done, or next actions. It is often the primary positive action of a use case. Can be used alone, or combined with a secondary and link style button.',
  ];
  doesExample2 = [
    'Secondary buttons are similar to primary buttons but is used as a supportive action, or for less important actions. Can be used alone, or combined with a primary og link styled button.',
  ];
  dontsExampleIcon = [
    'Unknown icon that is not descriptive alone without text.',
    'Don’t use both transparent and circle icons next to each other in a group',
  ];
  doesExampleIcon = [
    'Known actions that do not attract much attention.',
    'Different actions grouped together (example: A table where you can delete, edit and move)',
  ];
  dontsExample7 = [
    'On actions that could have disabled state. Links do not have an disabled state, and the e-btn disabled style will not be applied on links with disabled html syntax.',
  ];
}
