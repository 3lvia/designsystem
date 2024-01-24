import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IconDocComponent } from './icon-doc.component';
import { ComponentHeaderModule } from 'src/app/shared/component-documentation/component-structure/component-header/component-header.module';
import { CopyModule } from 'src/app/shared/copy/copy.module';
import { IconSearchPipe } from './icon-search.pipe';
import { ComponentPropertiesModule } from 'src/app/shared/component-documentation/component-properties/component-properties.module';
import { ComponentSubsubsectionModule } from 'src/app/shared/component-documentation/component-structure/component-subsubsection/component-subsubsection.module';
import { ComponentSubsectionModule } from 'src/app/shared/component-documentation/component-structure/component-subsection/component-subsection.module';
import { ComponentSectionModule } from 'src/app/shared/component-documentation/component-structure/component-section/component-section.module';
import { RouterModule } from '@angular/router';
import '@elvia/elvis-icon';
import { ComponentPropertiesTableModule } from 'src/app/shared/component-documentation/component-properties-table/component-properties-table.module';
import { ComponentInstallationModule } from 'src/app/shared/component-documentation/component-installation/component-installation.module';
import { ComponentChangelogComponent } from 'src/app/shared/component-documentation/component-changelog/component-changelog.component';
import '@elvia/elvis-radio-filter';
import { CegModule } from 'src/app/shared/component-documentation/ceg/ceg.module';
import { IconCegComponent } from './icon-ceg/icon-ceg.component';
import { IconSizesCegComponent } from './icon-sizes-ceg/icon-sizes-ceg.component';
import { IconColorsCegComponent } from './icon-colors-ceg/icon-colors-ceg.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ComponentHeaderModule,
    CopyModule,
    ComponentPropertiesModule,
    ComponentSectionModule,
    ComponentSubsectionModule,
    ComponentSubsubsectionModule,
    RouterModule,
    ComponentPropertiesTableModule,
    ComponentInstallationModule,
    ComponentChangelogComponent,
    CegModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [
    IconDocComponent,
    IconSearchPipe,
    IconCegComponent,
    IconSizesCegComponent,
    IconColorsCegComponent,
  ],
})
export class IconDocModule {}
