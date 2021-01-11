import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentLoaderDocComponent } from './content-loader-doc.component';
import { ComponentHeaderModule } from 'src/app/shared/component-structure/component-header/component-header.module';
import { CodeBlockModule } from 'src/app/shared/code-block/code-block.module';
import { RouterModule } from '@angular/router';
import { CodeHighlighterModule } from 'src/app/shared/code-highlighter/code-highlighter.module';
import { ComponentPropertiesModule } from 'src/app/shared/component-properties/component-properties.module';
import { ComponentSectionModule } from 'src/app/shared/component-structure/component-section/component-section.module';
import { ComponentSubsectionModule } from 'src/app/shared/component-structure/component-subsection/component-subsection.module';

@NgModule({
  imports: [
    CommonModule,
    ComponentHeaderModule,
    CodeBlockModule,
    RouterModule,
    CodeHighlighterModule,
    ComponentPropertiesModule,
    ComponentSectionModule,
    ComponentSubsectionModule,
  ],
  declarations: [ContentLoaderDocComponent],
})
export class ContentLoaderDocModule {}
