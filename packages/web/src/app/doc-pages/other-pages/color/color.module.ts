import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ColorComponent } from './color.component';
import { ColorPickerComponent } from './color-picker/color-picker.component';
import { ColorTokenTableComponent } from './color-token-table/color-token-table.component';
import { ComponentHeaderModule } from 'src/app/shared/component-documentation/component-structure/component-header/component-header.module';
import { ComponentSectionModule } from 'src/app/shared/component-documentation/component-structure/component-section/component-section.module';
import { ComponentSubsectionModule } from 'src/app/shared/component-documentation/component-structure/component-subsection/component-subsection.module';
import { ComponentSubsubsectionModule } from 'src/app/shared/component-documentation/component-structure/component-subsubsection/component-subsubsection.module';
import { RouterModule } from '@angular/router';
import { ColorTokenSubtableComponent } from './color-token-table/color-token-subtable/color-token-subtable.component';
import { ColorTokenSubtableColorCircleComponent } from './color-token-table/color-token-subtable/color-token-subtable-color-circle/color-token-subtable-color-circle.component';
import { CopyModule } from 'src/app/shared/copy/copy.module';
import { PurposeTokenIllustrationComponent } from './illustrations/purpose-token-illustration/purpose-token-illustration.component';
import { ThemeTokenIllustrationComponent } from './illustrations/theme-token-illustration/theme-token-illustration.component';
import { IllustrationBaseDirective } from './illustrations/illustration-base.directive';
import { DoDontModule } from 'src/app/shared/do-dont/do-dont.module';
import { DoDontTextModule } from 'src/app/shared/do-dont-text/do-dont-text.module';

@NgModule({
  imports: [
    RouterModule,
    CommonModule,
    ComponentHeaderModule,
    ComponentSectionModule,
    ComponentSubsectionModule,
    ComponentSubsubsectionModule,
    CopyModule,
    DoDontModule,
    DoDontTextModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [
    ColorComponent,
    ColorPickerComponent,
    ColorTokenTableComponent,
    ColorTokenSubtableComponent,
    ColorTokenSubtableColorCircleComponent,
    PurposeTokenIllustrationComponent,
    ThemeTokenIllustrationComponent,
    IllustrationBaseDirective,
  ],
})
export class ColorModule {}
