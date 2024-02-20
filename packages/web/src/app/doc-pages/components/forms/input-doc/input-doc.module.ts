import { NgModule } from '@angular/core';
import { InputDocComponent } from './input-doc.component';
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
import { InputSizeMediumCegComponent } from './input-size-medium-ceg/input-size-medium-ceg.component';
import { InputSizeSmallCegComponent } from './input-size-small-ceg/input-size-small-ceg.component';
import { InputValidationCegComponent } from './input-validation-ceg/input-validation-ceg.component';
import { SharedDocumentationModule } from 'src/app/shared/component-documentation/shared-component-documentation.module';

@NgModule({
    imports: [SharedDocumentationModule, InputDocComponent,
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
        InputSizeMediumCegComponent,
        InputSizeSmallCegComponent,
        InputValidationCegComponent],
})
export class InputDocModule {}
