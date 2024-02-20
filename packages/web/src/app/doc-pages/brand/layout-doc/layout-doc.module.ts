import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutDocComponent } from './layout-doc.component';




import { RouterModule } from '@angular/router';
import { CegModule } from 'src/app/shared/component-documentation/ceg/ceg.module';
import { LayoutMarginsCegComponent } from './layout-margins-ceg/layout-margins-ceg.component';
import { LayoutBreakpointsCegComponent } from './layout-breakpoints-ceg/layout-breakpoints-ceg.component';
import { LayoutGuttersCegComponent } from './layout-gutters-ceg/layout-gutters-ceg.component';
import { LayoutGuttersNoCegComponent } from './layout-gutters-no-ceg/layout-gutters-no-ceg.component';
import { LayoutGuttersCustomCegComponent } from './layout-gutters-custom-ceg/layout-gutters-custom-ceg.component';
import { LayoutAlignmentCegComponent } from './layout-alignment-ceg/layout-alignment-ceg.component';
import { LayoutLevelsCegComponent } from './layout-levels-ceg/layout-levels-ceg.component';
import { LayoutOrderingCegComponent } from './layout-ordering-ceg/layout-ordering-ceg.component';

@NgModule({
    imports: [
    CommonModule,
    RouterModule,
    CegModule,
    LayoutDocComponent,
    LayoutBreakpointsCegComponent,
    LayoutMarginsCegComponent,
    LayoutGuttersCegComponent,
    LayoutGuttersNoCegComponent,
    LayoutGuttersCustomCegComponent,
    LayoutAlignmentCegComponent,
    LayoutLevelsCegComponent,
    LayoutOrderingCegComponent,
],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class LayoutDocModule {}
