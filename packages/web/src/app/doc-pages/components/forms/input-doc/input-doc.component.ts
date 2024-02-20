import { Component, ElementRef, ViewChild } from '@angular/core';
import { InputValidationCegComponent } from './input-validation-ceg/input-validation-ceg.component';
import { CopyComponent } from '../../../../shared/copy/copy.component';
import { RouterLink } from '@angular/router';
import { WhenToUseComponent } from '../../../../shared/when-to-use/when-to-use.component';
import { InputSizeSmallCegComponent } from './input-size-small-ceg/input-size-small-ceg.component';
import { InputSizeMediumCegComponent } from './input-size-medium-ceg/input-size-medium-ceg.component';
import { InputOptionsLoadingCegComponent } from './input-options-loading-ceg/input-options-loading-ceg.component';
import { InputOptionsReadonlyCegComponent } from './input-options-readonly-ceg/input-options-readonly-ceg.component';
import { InputTypeCombinedInlinedCegComponent } from './input-type-combined-inlined-ceg/input-type-combined-inlined-ceg.component';
import { InputOptionsFullWidthCegComponent } from './input-options-full-width-ceg/input-options-full-width-ceg.component';
import { InputOptionsOptionalCegComponent } from './input-options-optional-ceg/input-options-optional-ceg.component';
import { InputOptionsNolabelCegComponent } from './input-options-nolabel-ceg/input-options-nolabel-ceg.component';
import { InputOptionsButtonCegComponent } from './input-options-button-ceg/input-options-button-ceg.component';
import { InputTypeTextareaCegComponent } from './input-type-textarea-ceg/input-type-textarea-ceg.component';
import { InputTypeNormalCegComponent } from './input-type-normal-ceg/input-type-normal-ceg.component';
import { ComponentSubsectionComponent } from '../../../../shared/component-documentation/component-structure/component-subsection/component-subsection.component';
import { ComponentSectionComponent } from '../../../../shared/component-documentation/component-structure/component-section/component-section.component';
import { InputCegComponent } from './input-ceg/input-ceg.component';
import { StaticCegComponent } from '../../../../shared/component-documentation/ceg/static-ceg/static-ceg.component';
import { ComponentDocumentationComponent } from '../../../../shared/component-documentation/component-documentation.component';

@Component({
  selector: 'app-input-doc',
  templateUrl: './input-doc.component.html',
  styleUrls: ['./input-doc.component.scss'],
  standalone: true,
  imports: [
    ComponentDocumentationComponent,
    StaticCegComponent,
    InputCegComponent,
    ComponentSectionComponent,
    ComponentSubsectionComponent,
    InputTypeNormalCegComponent,
    InputTypeTextareaCegComponent,
    InputOptionsButtonCegComponent,
    InputOptionsNolabelCegComponent,
    InputOptionsOptionalCegComponent,
    InputOptionsFullWidthCegComponent,
    InputTypeCombinedInlinedCegComponent,
    InputOptionsReadonlyCegComponent,
    InputOptionsLoadingCegComponent,
    InputSizeMediumCegComponent,
    InputSizeSmallCegComponent,
    WhenToUseComponent,
    RouterLink,
    CopyComponent,
    InputValidationCegComponent,
  ],
})
export class InputDocComponent {
  @ViewChild('validationExample') validationExample: ElementRef;

  showPassword = false;

  does = [
    'Text fields should be used in forms where the user has to fill in something that is not from a set of choices.',
  ];
  donts = [
    'If the user can choose from a set of options, use dropdown, radio buttons, checkboxes, or auto-complete fields instead.',
  ];
}
