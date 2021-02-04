import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TypographyDocComponent } from './typography-doc.component';
import { ComponentHeaderModule } from 'src/app/shared/component-documentation/component-structure/component-header/component-header.module';
import { CodeBlockModule } from 'src/app/shared/component-documentation/component-example/code-block/code-block.module';
import { CopyModule } from 'src/app/shared/copy/copy.module';
import { IframeScreenModule } from 'src/app/shared/iframe-screen/iframe-screen.module';
import { ComponentSubsubsectionModule } from 'src/app/shared/component-documentation/component-structure/component-subsubsection/component-subsubsection.module';
import { ComponentSubsectionModule } from 'src/app/shared/component-documentation/component-structure/component-subsection/component-subsection.module';
import { ComponentSectionModule } from 'src/app/shared/component-documentation/component-structure/component-section/component-section.module';
import { CodeHighlighterModule } from 'src/app/shared/component-documentation/component-example/code-highlighter/code-highlighter.module';
import { FontWeightPipe } from './fontWeight.pipe';

@NgModule({
  imports: [
    CommonModule,
    ComponentHeaderModule,
    CodeBlockModule,
    CopyModule,
    IframeScreenModule,
    ComponentSectionModule,
    ComponentSubsectionModule,
    ComponentSubsubsectionModule,
    CodeHighlighterModule,
  ],
  declarations: [TypographyDocComponent, FontWeightPipe],
})
export class TypographyDocModule {}
