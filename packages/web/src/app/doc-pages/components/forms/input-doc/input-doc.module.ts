import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ComponentChangelogModule } from 'src/app/shared/component-documentation/component-changelog/component-changelog.module';
import { ComponentHeaderModule } from 'src/app/shared/component-documentation/component-structure/component-header/component-header.module';
import { ComponentPropertiesModule } from 'src/app/shared/component-documentation/component-properties/component-properties.module';
import { ComponentSectionModule } from 'src/app/shared/component-documentation/component-structure/component-section/component-section.module';
import { ComponentSubsectionModule } from 'src/app/shared/component-documentation/component-structure/component-subsection/component-subsection.module';
import { ComponentSubsubsectionModule } from 'src/app/shared/component-documentation/component-structure/component-subsubsection/component-subsubsection.module';
import { InputDocComponent } from './input-doc.component';
import { WhenToUseModule } from 'src/app/shared/when-to-use/when-to-use.module';
import { CegModule } from 'src/app/shared/component-documentation/ceg/ceg.module';
import { InputCegComponent } from './input-ceg/input-ceg.component';
import { InputTypeNormalCegComponent } from './input-type-normal-ceg/input-type-normal-ceg.component';
import { InputTypeCombinedInlinedCegComponent } from './input-type-combined-inlined-ceg/input-type-combined-inlined-ceg.component';
import { InputTypeTextareaCegComponent } from './input-type-textarea-ceg/input-type-textarea-ceg.component';
import { InputOptionsButtonCegComponent } from './input-options-button-ceg/input-options-button-ceg.component';
import { InputOptionsNolabelCegComponent } from './input-options-nolabel-ceg/input-options-nolabel-ceg.component';
import { InputOptionsOptionalCegComponent } from './input-options-optional-ceg/input-options-optional-ceg.component';
import { InputOptionsFullWidthCegComponent } from './input-options-full-width-ceg/input-options-full-width-ceg.component';
import { InputOptionsReadonlyCegComponent } from './input-options-readonly-ceg/input-options-readonly-ceg.component';
import { InputOptionsLoadingCegComponent } from './input-options-loading-ceg/input-options-loading-ceg.component';
import { InputSizeNormalCegComponent } from './input-size-normal-ceg/input-size-normal-ceg.component';
import { InputSizeCompactCegComponent } from './input-size-compact-ceg/input-size-compact-ceg.component';
import { InputValidationCegComponent } from './input-validation-ceg/input-validation-ceg.component';
import { SharedDocumentationModule } from 'src/app/shared/component-documentation/shared-component-documentation.module';

@NgModule({
  declarations: [
    InputDocComponent,
    InputCegComponent,
    InputTypeNormalCegComponent,
    InputTypeCombinedInlinedCegComponent,
    InputTypeTextareaCegComponent,
    InputOptionsButtonCegComponent,
    InputOptionsNolabelCegComponent,
    InputOptionsOptionalCegComponent,
    InputOptionsFullWidthCegComponent,
    InputOptionsReadonlyCegComponent,
    InputOptionsLoadingCegComponent,
    InputSizeNormalCegComponent,
    InputSizeCompactCegComponent,
    InputValidationCegComponent,
  ],
  imports: [
    CommonModule,
    ComponentHeaderModule,
    CegModule,
    ComponentPropertiesModule,
    ComponentSectionModule,
    ComponentSubsectionModule,
    ComponentSubsubsectionModule,
    WhenToUseModule,
    RouterModule,
    ComponentChangelogModule,
    SharedDocumentationModule,
  ],
})
export class InputDocModule {}
