import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewProjectComponent } from './new-project.component';
import { ComponentHeaderModule } from 'src/app/shared/component-header/component-header.module';
import { CopyModule } from 'src/app/shared/copy/copy.module';
import { CodeHighlighterModule } from 'src/app/shared/code-highlighter/code-highlighter.module';

@NgModule({
  imports: [
    CommonModule,
    ComponentHeaderModule,
    CopyModule,
    CodeHighlighterModule
  ],
  declarations: [NewProjectComponent]
})
export class NewProjectModule { }
