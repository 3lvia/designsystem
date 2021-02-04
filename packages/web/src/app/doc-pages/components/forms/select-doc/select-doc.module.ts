import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectDocComponent } from './select-doc.component';
import { ComponentHeaderModule } from 'src/app/shared/component-documentation/component-structure/component-header/component-header.module';
import { ComponentExampleV1Module } from 'src/app/shared/component-documentation/component-example/component-example-v1/component-example-v1.module';
import { ComponentPropertiesModule } from 'src/app/shared/component-documentation/component-properties/component-properties.module';

@NgModule({
  imports: [CommonModule, ComponentHeaderModule, ComponentExampleV1Module, ComponentPropertiesModule],
  declarations: [SelectDocComponent],
})
export class SelectDocModule {}
