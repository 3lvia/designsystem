import '@elvia/elvis-badge';
import { BadgeDocComponent } from './badge-doc.component';
import { CommonModule } from '@angular/common';
import { ComponentChangelogModule } from 'src/app/shared/component-documentation/component-changelog/component-changelog.module';
import { ComponentExampleGeneratorModule } from 'src/app/shared/component-documentation/component-example/component-example-generator/component-example-generator.module';
import { ComponentHeaderModule } from 'src/app/shared/component-documentation/component-structure/component-header/component-header.module';
import { ComponentInstallationModule } from 'src/app/shared/component-documentation/component-installation/component-installation.module';
import { ComponentPropertiesModule } from 'src/app/shared/component-documentation/component-properties/component-properties.module';
import { ComponentPropertiesTableModule } from 'src/app/shared/component-documentation/component-properties-table/component-properties-table.module';
import { ComponentSectionModule } from 'src/app/shared/component-documentation/component-structure/component-section/component-section.module';
import { ComponentSubsectionModule } from 'src/app/shared/component-documentation/component-structure/component-subsection/component-subsection.module';
import { ComponentSubsubsectionModule } from 'src/app/shared/component-documentation/component-structure/component-subsubsection/component-subsubsection.module';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { WhenToUseModule } from 'src/app/shared/when-to-use/when-to-use.module';

@NgModule({
  imports: [
    CommonModule,
    ComponentHeaderModule,
    ComponentPropertiesModule,
    ComponentSectionModule,
    ComponentSubsectionModule,
    ComponentSubsubsectionModule,
    WhenToUseModule,
    ComponentInstallationModule,
    ComponentExampleGeneratorModule,
    ComponentPropertiesTableModule,
    ComponentChangelogModule,
    RouterModule,
  ],
  declarations: [BadgeDocComponent],
})
export class BadgeDocModule {}
