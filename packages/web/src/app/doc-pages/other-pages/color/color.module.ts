import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ColorComponent } from './color.component';
import { ColorPickerComponent } from './color-picker/color-picker.component';
import { ColorTokenTableComponent } from './color-token-table/color-token-table.component';
import { ComponentHeaderModule } from 'src/app/shared/component-documentation/component-structure/component-header/component-header.module';
import { ComponentSectionModule } from 'src/app/shared/component-documentation/component-structure/component-section/component-section.module';
import { ComponentSubsectionModule } from 'src/app/shared/component-documentation/component-structure/component-subsection/component-subsection.module';
import { ComponentSubsubsectionModule } from 'src/app/shared/component-documentation/component-structure/component-subsubsection/component-subsubsection.module';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule,
    CommonModule,
    ComponentHeaderModule,
    ComponentSectionModule,
    ComponentSubsectionModule,
    ComponentSubsubsectionModule,
  ],
  declarations: [ColorComponent, ColorPickerComponent, ColorTokenTableComponent],
})
export class ColorModule {}
