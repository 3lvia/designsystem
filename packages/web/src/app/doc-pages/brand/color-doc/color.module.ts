import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ColorComponent } from './color.component';
import { ColorPickerComponent } from './color-picker/color-picker.component';
import { ColorTokenTableComponent } from './color-token-table/color-token-table.component';




import { RouterModule } from '@angular/router';
import { CegModule } from 'src/app/shared/component-documentation/ceg/ceg.module';
import { ColorTokenSubtableComponent } from './color-token-table/color-token-subtable/color-token-subtable.component';
import { ColorTokenSubtableColorCircleComponent } from './color-token-table/color-token-subtable/color-token-subtable-color-circle/color-token-subtable-color-circle.component';

import { ColorPickerColorListComponent } from './color-picker/color-picker-color-list/color-picker-color-list.component';
import { PurposeTokenIllustrationComponent } from './illustrations/purpose-token-illustration/purpose-token-illustration.component';
import { ThemeTokenIllustrationComponent } from './illustrations/theme-token-illustration/theme-token-illustration.component';
import { IllustrationBaseDirective } from './illustrations/illustration-base.directive';
import { ColorListBaseDirective } from './color-picker/color-list-base.directive';

import { ColorPickerExhibitComponent } from './color-picker/color-picker-exhibit/color-picker-exhibit.component';
import { ReplacePipe } from 'src/app/shared/pipes/replace.pipe';
import { NeedsBorderPipe } from './color-picker/needs-border.pipe';
import { ColorPickerHeaderComponent } from './color-picker/color-picker-header/color-picker-header.component';
import '@elvia/elvis-accordion';
import '@elvia/elvis-divider';
import '@elvia/elvis-tabs';
import '@elvia/elvis-segmented-control';

@NgModule({
    imports: [
    RouterModule,
    CommonModule,
    CegModule,
    ColorComponent,
    ColorPickerComponent,
    ColorPickerColorListComponent,
    ColorTokenTableComponent,
    ColorTokenSubtableComponent,
    ColorTokenSubtableColorCircleComponent,
    PurposeTokenIllustrationComponent,
    ThemeTokenIllustrationComponent,
    IllustrationBaseDirective,
    ColorListBaseDirective,
    ColorPickerExhibitComponent,
    ReplacePipe,
    NeedsBorderPipe,
    ColorPickerHeaderComponent,
],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ColorModule {}
