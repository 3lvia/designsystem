import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Color2Component } from './color2.component';
import { ColorPickerComponent } from './color-picker/color-picker.component';
import { ColorTokenTableComponent } from './color-token-table/color-token-table.component';
import { ComponentHeaderModule } from 'src/app/shared/component-documentation/component-structure/component-header/component-header.module';
import { ComponentSectionModule } from 'src/app/shared/component-documentation/component-structure/component-section/component-section.module';
import { ComponentSubsectionModule } from 'src/app/shared/component-documentation/component-structure/component-subsection/component-subsection.module';
import { ComponentSubsubsectionModule } from 'src/app/shared/component-documentation/component-structure/component-subsubsection/component-subsubsection.module';

@NgModule({
  imports: [
    CommonModule,
    ComponentHeaderModule,
    ComponentSectionModule,
    ComponentSubsectionModule,
    ComponentSubsubsectionModule,
  ],
  declarations: [Color2Component, ColorPickerComponent, ColorTokenTableComponent],
})
export class Color2Module {}
