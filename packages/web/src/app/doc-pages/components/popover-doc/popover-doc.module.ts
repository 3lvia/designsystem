import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PopoverDocComponent } from './popover-doc.component';
import { CodeBlockModule } from 'src/app/shared/component-documentation/component-example/component-example-v1/component-example-v1.module';
import { ComponentHeaderModule } from 'src/app/shared/component-documentation/component-structure/component-header/component-header.module';
import { CodeHighlighterModule } from 'src/app/shared/component-documentation/component-example/component-example-code/component-example-code.module';
import { ComponentPropertiesModule } from 'src/app/shared/component-documentation/component-properties/component-properties.module';
import { WhenToUseModule } from 'src/app/shared/when-to-use/when-to-use.module';
import { ComponentSubsectionModule } from 'src/app/shared/component-documentation/component-structure/component-subsection/component-subsection.module';
import { ComponentSectionModule } from 'src/app/shared/component-documentation/component-structure/component-section/component-section.module';
import { ComponentPropertiesTableModule } from 'src/app/shared/component-documentation/component-properties-table/component-properties-table.module';
import '@elvia/elvis-popover';

@NgModule({
  imports: [
    CommonModule,
    ComponentHeaderModule,
    CodeBlockModule,
    CodeHighlighterModule,
    ComponentPropertiesModule,
    ComponentSectionModule,
    ComponentSubsectionModule,
    WhenToUseModule,
    ComponentPropertiesTableModule,
  ],
  declarations: [PopoverDocComponent],
})
export class PopoverDocModule {}
