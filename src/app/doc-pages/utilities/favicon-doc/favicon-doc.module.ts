import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FaviconDocComponent } from './favicon-doc.component';
import { ComponentHeaderModule } from 'src/app/shared/component-header/component-header.module';
import { CodeHighlighterModule } from 'src/app/shared/code-highlighter/code-highlighter.module';

@NgModule({
  imports: [
    CommonModule,
    ComponentHeaderModule,
    CodeHighlighterModule
  ],
  declarations: [FaviconDocComponent]
})
export class FaviconDocModule { }
