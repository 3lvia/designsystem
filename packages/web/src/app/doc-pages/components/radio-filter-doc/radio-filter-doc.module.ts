import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RadioFilterDocComponent } from './radio-filter-doc.component';
import { ComponentHeaderModule } from 'src/app/shared/component-documentation/component-structure/component-header/component-header.module';
import { ComponentExampleV1Module } from 'src/app/shared/component-documentation/component-example/component-example-v1/component-example-v1.module';
import { ComponentPropertiesModule } from 'src/app/shared/component-documentation/component-properties/component-properties.module';
import { ComponentSectionModule } from 'src/app/shared/component-documentation/component-structure/component-section/component-section.module';
import { WhenToUseModule } from 'src/app/shared/when-to-use/when-to-use.module';
import { ComponentExampleGeneratorModule } from 'src/app/shared/component-documentation/component-example/component-example-generator/component-example-generator.module';
import { ComponentInstallationModule } from 'src/app/shared/component-documentation/component-installation/component-installation.module';
import { ComponentPropertiesTableModule } from 'src/app/shared/component-documentation/component-properties-table/component-properties-table.module';
import { ComponentSubsectionModule } from 'src/app/shared/component-documentation/component-structure/component-subsection/component-subsection.module';

@NgModule({
  imports: [
    CommonModule,
    ComponentHeaderModule,
    ComponentExampleV1Module,
    ComponentPropertiesModule,
    ComponentSectionModule,
    ComponentSubsectionModule,
    WhenToUseModule,
    ComponentExampleGeneratorModule,
    ComponentPropertiesTableModule,
    ComponentInstallationModule,
  ],
  declarations: [RadioFilterDocComponent],
})
export class RadioFilterDocModule {}
