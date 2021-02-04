import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewProjectComponent } from './new-project.component';
import { ComponentHeaderModule } from 'src/app/shared/component-documentation/component-structure/component-header/component-header.module';
import { CopyModule } from 'src/app/shared/copy/copy.module';
import { CodeHighlighterModule } from 'src/app/shared/component-documentation/component-example/code-highlighter/code-highlighter.module';
import { ComponentSubsectionModule } from 'src/app/shared/component-documentation/component-structure/component-subsection/component-subsection.module';
import { ComponentSectionModule } from 'src/app/shared/component-documentation/component-structure/component-section/component-section.module';
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
  declarations: [NewProjectComponent],
})
export class NewProjectModule {}
