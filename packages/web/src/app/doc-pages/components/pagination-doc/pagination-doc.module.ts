import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import '@elvia/elvis-pagination';
import { PaginationDocComponent } from './pagination-doc.component';
import { ComponentHeaderModule } from 'src/app/shared/component-documentation/component-structure/component-header/component-header.module';
import { ComponentSectionModule } from 'src/app/shared/component-documentation/component-structure/component-section/component-section.module';
import { ComponentSubsectionModule } from 'src/app/shared/component-documentation/component-structure/component-subsection/component-subsection.module';
import { ComponentPropertiesTableModule } from 'src/app/shared/component-documentation/component-properties-table/component-properties-table.module';
import { ComponentExampleGeneratorModule } from 'src/app/shared/component-documentation/component-example/component-example-generator/component-example-generator.module';
import { ComponentInstallationModule } from 'src/app/shared/component-documentation/component-installation/component-installation.module';
import { WhenToUseModule } from 'src/app/shared/when-to-use/when-to-use.module';

// old modules for v1
import { ComponentExampleV1Module } from 'src/app/shared/component-documentation/component-example/component-example-v1/component-example-v1.module';
import { ComponentExampleCodeModule } from 'src/app/shared/component-documentation/component-example/component-example-code/component-example-code.module';
import { ComponentPropertiesModule } from 'src/app/shared/component-documentation/component-properties/component-properties.module';

@NgModule({
  imports: [
    CommonModule,
    ComponentHeaderModule,
    ComponentSectionModule,
    ComponentSubsectionModule,
    ComponentPropertiesTableModule,
    ComponentExampleGeneratorModule,
    ComponentInstallationModule,
    WhenToUseModule,
    // old modules remove later
    ComponentExampleV1Module,
    ComponentExampleCodeModule,
    ComponentPropertiesModule,
  ],
  declarations: [PaginationDocComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PaginationDocModule {}
