import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpacingDocComponent } from './spacing-doc.component';
import { ComponentExampleV1Module } from 'src/app/shared/component-documentation/component-example/component-example-v1/component-example-v1.module';
import { ComponentHeaderModule } from 'src/app/shared/component-documentation/component-structure/component-header/component-header.module';
import { DoDontModule } from 'src/app/shared/do-dont/do-dont.module';
import { CopyModule } from 'src/app/shared/copy/copy.module';
import { RouterModule } from '@angular/router';
import { ComponentSubsectionModule } from 'src/app/shared/component-documentation/component-structure/component-subsection/component-subsection.module';
import { ComponentSectionModule } from 'src/app/shared/component-documentation/component-structure/component-section/component-section.module';

@NgModule({
  imports: [
    CommonModule,
    ComponentExampleV1Module,
    ComponentHeaderModule,
    DoDontModule,
    CopyModule,
    RouterModule,
    ComponentSectionModule,
    ComponentSubsectionModule,
  ],
  declarations: [SpacingDocComponent],
})
export class SpacingDocModule {}
