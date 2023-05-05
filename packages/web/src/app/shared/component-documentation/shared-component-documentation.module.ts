import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ComponentChangelogModule } from './component-changelog/component-changelog.module';
import { ComponentExampleCodeModule } from 'src/app/shared/component-documentation/component-example/component-example-code/component-example-code.module';
import { ComponentExampleV1Module } from 'src/app/shared/component-documentation/component-example/component-example-v1/component-example-v1.module';
import { ComponentHeaderModule } from './component-structure/component-header/component-header.module';
import { ComponentInstallationModule } from 'src/app/shared/component-documentation/component-installation/component-installation.module';
import { ComponentPropertiesModule } from 'src/app/shared/component-documentation/component-properties/component-properties.module';
import { ComponentPropertiesTableModule } from 'src/app/shared/component-documentation/component-properties-table/component-properties-table.module';
import { ComponentSectionModule } from 'src/app/shared/component-documentation/component-structure/component-section/component-section.module';
import { ComponentSubsectionModule } from 'src/app/shared/component-documentation/component-structure/component-subsection/component-subsection.module';
import { ComponentSubsubsectionModule } from 'src/app/shared/component-documentation/component-structure/component-subsubsection/component-subsubsection.module';
import { CopyModule } from 'src/app/shared/copy/copy.module';
import { WhenToUseModule } from 'src/app/shared/when-to-use/when-to-use.module';

/**
 * A shared module that includes CommonModule and all modules needed for a Elvis component documentation page.
 * @see {@link https://angular.io/guide/sharing-ngmodules}
 */
@NgModule({
  imports: [CommonModule],
  declarations: [],
  exports: [
    CommonModule,
    ComponentChangelogModule,
    ComponentExampleCodeModule,
    ComponentExampleV1Module,
    ComponentHeaderModule,
    ComponentInstallationModule,
    ComponentPropertiesModule,
    ComponentPropertiesTableModule,
    ComponentSectionModule,
    ComponentSubsectionModule,
    ComponentSubsubsectionModule,
    CopyModule,
    WhenToUseModule,
  ],
})
export class SharedDocumentationModule {}
