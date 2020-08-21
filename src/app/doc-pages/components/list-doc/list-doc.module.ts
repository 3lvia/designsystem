import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListDocComponent } from './list-doc.component';
import { ComponentHeaderModule } from 'src/app/shared/component-header/component-header.module';
import { CodeBlockModule } from 'src/app/shared/code-block/code-block.module';
import { ComponentPropertiesModule } from 'src/app/shared/component-properties/component-properties.module';

@NgModule({
  imports: [
    CommonModule,
    ComponentHeaderModule,
    CodeBlockModule,
    ComponentPropertiesModule,
  ],
  declarations: [ListDocComponent],
})
export class ListDocModule { }
