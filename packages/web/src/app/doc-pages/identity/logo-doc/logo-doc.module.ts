import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogoDocComponent } from './logo-doc.component';
import { ComponentHeaderModule } from 'src/app/shared/component-structure/component-header/component-header.module';
import { CodeHighlighterModule } from 'src/app/shared/code-highlighter/code-highlighter.module';
import { ComponentSubsectionModule } from 'src/app/shared/component-structure/component-subsection/component-subsection.module';
import { ComponentSectionModule } from 'src/app/shared/component-structure/component-section/component-section.module';

@NgModule({
  imports: [
    CommonModule,
    ComponentHeaderModule,
    CodeHighlighterModule,
    ComponentSectionModule,
    ComponentSubsectionModule,
  ],
  declarations: [LogoDocComponent],
})
export class LogoDocModule { }
