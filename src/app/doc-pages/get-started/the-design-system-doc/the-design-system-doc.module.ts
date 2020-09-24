import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TheDesignSystemDocComponent } from './the-design-system-doc.component';
import { ComponentHeaderModule } from 'src/app/shared/component-structure/component-header/component-header.module';
import { CopyModule } from 'src/app/shared/copy/copy.module';
import { CodeHighlighterModule } from 'src/app/shared/code-highlighter/code-highlighter.module';
import { ComponentSectionModule } from 'src/app/shared/component-structure/component-section/component-section.module';
import { ComponentSubsectionModule } from 'src/app/shared/component-structure/component-subsection/component-subsection.module';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    ComponentHeaderModule,
    CopyModule,
    CodeHighlighterModule,
    ComponentSectionModule,
    ComponentSubsectionModule,
    RouterModule,
  ],
  declarations: [TheDesignSystemDocComponent]
})
export class TheDesignSystemDocModule { }
