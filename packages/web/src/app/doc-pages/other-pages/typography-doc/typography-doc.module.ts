import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TypographyDocComponent } from './typography-doc.component';
import { ComponentHeaderModule } from 'src/app/shared/component-documentation/component-structure/component-header/component-header.module';
import { ComponentExampleV1Module } from 'src/app/shared/component-documentation/component-example/component-example-v1/component-example-v1.module';
import { CopyModule } from 'src/app/shared/copy/copy.module';
import { IframeScreenModule } from 'src/app/shared/iframe-screen/iframe-screen.module';
import { ComponentSubsubsectionModule } from 'src/app/shared/component-documentation/component-structure/component-subsubsection/component-subsubsection.module';
import { ComponentSubsectionModule } from 'src/app/shared/component-documentation/component-structure/component-subsection/component-subsection.module';
import { ComponentSectionModule } from 'src/app/shared/component-documentation/component-structure/component-section/component-section.module';
import { ComponentExampleCodeModule } from 'src/app/shared/component-documentation/component-example/component-example-code/component-example-code.module';
import { FontWeightPipe } from './fontWeight.pipe';
import { DoDontModule } from 'src/app/shared/do-dont/do-dont.module';

@NgModule({
  imports: [
    CommonModule,
    ComponentHeaderModule,
    ComponentExampleV1Module,
    CopyModule,
    IframeScreenModule,
    ComponentSectionModule,
    ComponentSubsectionModule,
    ComponentSubsubsectionModule,
    ComponentExampleCodeModule,
    DoDontModule,
  ],
  declarations: [TypographyDocComponent, FontWeightPipe],
})
export class TypographyDocModule {}
