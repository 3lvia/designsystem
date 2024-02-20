import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IconDocComponent } from './icon-doc.component';


import { IconSearchPipe } from './icon-search.pipe';




import { RouterModule } from '@angular/router';
import '@elvia/elvis-icon';
import { ComponentPropertiesTableModule } from 'src/app/shared/component-documentation/component-properties-table/component-properties-table.module';

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
    RouterModule,
    ComponentPropertiesTableModule,
    ComponentChangelogComponent,
    CegModule,
    IconDocComponent,
    IconSearchPipe,
    IconCegComponent,
    IconSizesCegComponent,
    IconColorsCegComponent,
],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class IconDocModule {}
