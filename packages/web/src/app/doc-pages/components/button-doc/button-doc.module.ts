import { NgModule } from '@angular/core';
import { ButtonDocComponent } from './button-doc.component';
import { DoDontTextModule } from 'src/app/shared/do-dont-text/do-dont-text.module';
import { ButtonCegComponent } from './button-ceg/button-ceg.component';
import { ButtonTypePrimaryCegComponent } from './button-type-primary-ceg/button-type-primary-ceg.component';
import { ButtonTypeSecondaryCegComponent } from './button-type-secondary-ceg/button-type-secondary-ceg.component';
import { ButtonTypeTertiaryCegComponent } from './button-type-tertiary-ceg/button-type-tertiary-ceg.component';
import { ButtonTypeDangerCegComponent } from './button-type-danger-ceg/button-type-danger-ceg.component';
import { ButtonTypeIconCegComponent } from './button-type-icon-ceg/button-type-icon-ceg.component';
import { ButtonTypeIconCircledCegComponent } from './button-type-icon-circled-ceg/button-type-icon-circled-ceg.component';
import { ButtonSizeCegComponent } from './button-size-ceg/button-size-ceg.component';
import { ButtonLinkCegComponent } from './button-link-ceg/button-link-ceg.component';
import { SharedDocumentationModule } from 'src/app/shared/component-documentation/shared-component-documentation.module';

@NgModule({
  imports: [DoDontTextModule, SharedDocumentationModule],
  declarations: [
    ButtonDocComponent,
    ButtonCegComponent,
    ButtonTypePrimaryCegComponent,
    ButtonTypeSecondaryCegComponent,
    ButtonTypeTertiaryCegComponent,
    ButtonTypeDangerCegComponent,
    ButtonTypeIconCegComponent,
    ButtonTypeIconCircledCegComponent,
    ButtonSizeCegComponent,
    ButtonLinkCegComponent,
  ],
})
export class ButtonDocModule {}
