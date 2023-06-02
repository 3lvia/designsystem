import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CheckboxDocComponent } from './checkbox-doc.component';
import { ComponentChangelogModule } from 'src/app/shared/component-documentation/component-changelog/component-changelog.module';
import { ComponentHeaderModule } from 'src/app/shared/component-documentation/component-structure/component-header/component-header.module';
import { ComponentPropertiesModule } from 'src/app/shared/component-documentation/component-properties/component-properties.module';
import { ComponentSectionModule } from 'src/app/shared/component-documentation/component-structure/component-section/component-section.module';
import { ComponentSubsectionModule } from 'src/app/shared/component-documentation/component-structure/component-subsection/component-subsection.module';
import { ComponentSubsubsectionModule } from 'src/app/shared/component-documentation/component-structure/component-subsubsection/component-subsubsection.module';
import { WhenToUseModule } from 'src/app/shared/when-to-use/when-to-use.module';
import { CegModule } from 'src/app/shared/component-documentation/ceg/ceg.module';
import { CheckboxCegComponent } from './checkbox-ceg/checkbox-ceg.component';
import { CheckboxStandardCegComponent } from './checkbox-standard-ceg/checkbox-standard-ceg.component';
import { CheckboxNestedCegComponent } from './checkbox-nested-ceg/checkbox-nested-ceg.component';
import { CheckboxSizeCegComponent } from './checkbox-size-ceg/checkbox-size-ceg.component';
import { CheckboxStatesCegComponent } from './checkbox-states-ceg/checkbox-states-ceg.component';

@NgModule({
  declarations: [
    CheckboxDocComponent,
    CheckboxCegComponent,
    CheckboxStandardCegComponent,
    CheckboxNestedCegComponent,
    CheckboxSizeCegComponent,
    CheckboxStatesCegComponent,
  ],
  imports: [
    CommonModule,
    ComponentHeaderModule,
    ComponentPropertiesModule,
    ComponentSectionModule,
    ComponentSubsectionModule,
    ComponentSubsubsectionModule,
    WhenToUseModule,
    RouterModule,
    ComponentChangelogModule,
    CegModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CheckboxDocModule {}
