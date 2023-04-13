import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import '@elvia/elvis-box';
import { BoxCegComponent } from './box-ceg/box-ceg.component';
import { BoxDocComponent } from './box-doc.component';
import { CegModule } from 'src/app/shared/component-documentation/ceg/ceg.module';
import { ComponentChangelogModule } from 'src/app/shared/component-documentation/component-changelog/component-changelog.module';
import { ComponentHeaderModule } from 'src/app/shared/component-documentation/component-structure/component-header/component-header.module';
import { ComponentInstallationModule } from 'src/app/shared/component-documentation/component-installation/component-installation.module';
import { ComponentPropertiesTableModule } from 'src/app/shared/component-documentation/component-properties-table/component-properties-table.module';
import { ComponentSectionModule } from 'src/app/shared/component-documentation/component-structure/component-section/component-section.module';
import { ComponentSubsectionModule } from 'src/app/shared/component-documentation/component-structure/component-subsection/component-subsection.module';
import { ComponentSubsubsectionModule } from 'src/app/shared/component-documentation/component-structure/component-subsubsection/component-subsubsection.module';
import { WhenToUseModule } from 'src/app/shared/when-to-use/when-to-use.module';

@NgModule({
  imports: [
    CegModule,
    ComponentHeaderModule,
    ComponentChangelogModule,
    ComponentSectionModule,
    ComponentSubsectionModule,
    ComponentSubsubsectionModule,
    WhenToUseModule,
    ComponentPropertiesTableModule,
    ComponentInstallationModule,
  ],
  declarations: [BoxDocComponent, BoxCegComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class BoxDocModule {}
