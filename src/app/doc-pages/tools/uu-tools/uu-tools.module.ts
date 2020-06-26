import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UuToolsComponent } from './uu-tools.component';
import { ComponentHeaderModule } from 'src/app/shared/component-header/component-header.module';


@NgModule({
  imports: [
    CommonModule,
    ComponentHeaderModule
  ],
  declarations: [UuToolsComponent]
})
export class UuToolsModule { }
