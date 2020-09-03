import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TypographyDocComponent } from './typography-doc.component';
import { ComponentHeaderModule } from 'src/app/shared/component-structure/component-header/component-header.module';
import { CodeBlockModule } from 'src/app/shared/code-block/code-block.module';
import { CopyModule } from 'src/app/shared/copy/copy.module';
import { IframeScreenModule } from 'src/app/shared/iframe-screen/iframe-screen.module';
import { IframePreviewModule } from 'src/app/shared/iframe-preview/iframe-preview.module';
import { ComponentSubsubsectionModule } from 'src/app/shared/component-structure/component-subsubsection/component-subsubsection.module';
import { ComponentSubsectionModule } from 'src/app/shared/component-structure/component-subsection/component-subsection.module';
import { ComponentSectionModule } from 'src/app/shared/component-structure/component-section/component-section.module';

@NgModule({
  imports: [
    CommonModule,
    ComponentHeaderModule,
    CodeBlockModule,
    CopyModule,
    IframeScreenModule,
    IframePreviewModule,
    ComponentSectionModule,
    ComponentSubsectionModule,
    ComponentSubsubsectionModule,
  ],
  declarations: [TypographyDocComponent],
})
export class TypographyDocModule { }
