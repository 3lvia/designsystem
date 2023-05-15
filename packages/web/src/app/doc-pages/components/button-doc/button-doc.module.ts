import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonDocComponent } from './button-doc.component';
import { ComponentChangelogModule } from 'src/app/shared/component-documentation/component-changelog/component-changelog.module';
import { ComponentHeaderModule } from 'src/app/shared/component-documentation/component-structure/component-header/component-header.module';
import { ComponentPropertiesModule } from 'src/app/shared/component-documentation/component-properties/component-properties.module';
import { ComponentSectionModule } from 'src/app/shared/component-documentation/component-structure/component-section/component-section.module';
import { ComponentSubsectionModule } from 'src/app/shared/component-documentation/component-structure/component-subsection/component-subsection.module';
import { ComponentSubsubsectionModule } from 'src/app/shared/component-documentation/component-structure/component-subsubsection/component-subsubsection.module';
import { DoDontTextModule } from 'src/app/shared/do-dont-text/do-dont-text.module';
import { RouterModule } from '@angular/router';
import { WhenToUseModule } from 'src/app/shared/when-to-use/when-to-use.module';
import { CegModule } from 'src/app/shared/component-documentation/ceg/ceg.module';
import { ButtonCegComponent } from './button-ceg/button-ceg.component';
import { ButtonTypePrimaryCegComponent } from './button-type-primary-ceg/button-type-primary-ceg.component';
import { ButtonTypeSecondaryCegComponent } from './button-type-secondary-ceg/button-type-secondary-ceg.component';
import { ButtonTypeTertiaryCegComponent } from './button-type-tertiary-ceg/button-type-tertiary-ceg.component';
import { ButtonTypeDangerCegComponent } from './button-type-danger-ceg/button-type-danger-ceg.component';
import { ButtonTypeIconCegComponent } from './button-type-icon-ceg/button-type-icon-ceg.component';
import { ButtonTypeIconCircledCegComponent } from './button-type-icon-circled-ceg/button-type-icon-circled-ceg.component';
import { ButtonSizeCegComponent } from './button-size-ceg/button-size-ceg.component';
import { ButtonLinkCegComponent } from './button-link-ceg/button-link-ceg.component';

@NgModule({
  imports: [
    CommonModule,
    ComponentChangelogModule,
    CegModule,
    ComponentHeaderModule,
    ComponentPropertiesModule,
    ComponentSectionModule,
    ComponentSubsectionModule,
    ComponentSubsubsectionModule,
    DoDontTextModule,
    RouterModule,
    WhenToUseModule,
  ],
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
